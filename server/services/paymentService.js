import { env } from '../config/env.js';
import {
  claimPaymentEvent,
  completePaymentEvent,
  createPendingBooking,
  findBookingByOrderReference,
  releasePaymentEvent,
  updateBooking,
} from '../repositories/bookingRepository.js';
import {
  createHostedPaymentOrder,
  retrieveHostedPaymentOrder,
} from './ngeniusService.js';
import { sendPaidBookingNotification } from './notificationService.js';
import { ApiError } from '../utils/ApiError.js';
import {
  amountToMinorUnits,
  bookingPaymentSchema,
  orderReferenceSchema,
} from '../validators/paymentValidation.js';

const settledStates = new Set(['PURCHASED', 'CAPTURED']);
const failedStates = new Set(['FAILED', 'DECLINED', 'PURCHASE_DECLINED', 'PURCHASE_FAILED']);
const cancelledStates = new Set(['CANCELLED', 'CANCELED', 'REVERSED', 'PURCHASE_REVERSED']);

const extractOrderReference = (order) =>
  order?.orderReference ?? order?.reference ?? order?._id?.split(':').at(-1);

const extractGatewayStates = (order) => [
  order.state,
  ...(order._embedded?.payment ?? []).map((payment) => payment.state),
].filter(Boolean).map((state) => String(state).toUpperCase());

const paymentResponse = (booking, paymentStatus, message) => ({
  orderReference: booking.orderReference,
  bookingReference: booking.bookingReference,
  paymentStatus,
  bookingStatus: booking.status,
  isPaid: paymentStatus === 'PAID',
  message,
  amount: {
    currency: booking.currency,
    value: (booking.amountMinor / 100).toFixed(2),
  },
});

export const getPublicPaymentConfig = () => ({
  currency: env.currency,
  minimumAmount: '1.00',
  maximumAmount: '9999999.99',
});

export const createPaymentOrder = async (payload) => {
  const validation = bookingPaymentSchema.safeParse(payload);
  if (!validation.success) {
    throw new ApiError(400, 'Please correct the highlighted booking details.', validation.error.flatten().fieldErrors);
  }

  const { totalAmount, ...bookingDetails } = validation.data;
  const amountMinor = amountToMinorUnits(totalAmount);
  const booking = await createPendingBooking({
    ...bookingDetails,
    amountMinor,
    currency: env.currency,
  });

  try {
    const order = await createHostedPaymentOrder({
      amountMinor,
      emailAddress: bookingDetails.email,
    });
    const orderReference = extractOrderReference(order);
    const paymentUrl = order._links?.payment?.href;

    if (!orderReference || !paymentUrl) {
      throw new ApiError(502, 'The payment gateway returned an incomplete checkout response.');
    }

    await updateBooking(booking.bookingReference, { orderReference });
    return {
      paymentUrl,
      orderReference,
      bookingReference: booking.bookingReference,
    };
  } catch (error) {
    await updateBooking(booking.bookingReference, { status: 'PAYMENT_INITIALIZATION_FAILED' });
    throw error;
  }
};

export const verifyPaymentOrder = async (rawOrderReference) => {
  const referenceValidation = orderReferenceSchema.safeParse(rawOrderReference);
  if (!referenceValidation.success) throw new ApiError(400, 'Invalid order reference.');

  const orderReference = referenceValidation.data;
  let booking = await findBookingByOrderReference(orderReference);
  if (!booking) throw new ApiError(404, 'No booking was found for this payment.');

  const order = await retrieveHostedPaymentOrder(orderReference);
  const states = extractGatewayStates(order);
  const gatewayAmount = order.amount;
  const amountMatches =
    Number(gatewayAmount?.value) === booking.amountMinor &&
    gatewayAmount?.currencyCode === booking.currency;
  const isSettled = states.some((state) => settledStates.has(state));

  let paymentStatus = 'PENDING';
  let message = 'Your payment is still being processed.';

  if (isSettled && amountMatches) {
    paymentStatus = 'PAID';
    message = 'Payment verified and booking confirmed.';
    if (booking.status !== 'CONFIRMED') {
      booking = await updateBooking(booking.bookingReference, {
        status: 'CONFIRMED',
        confirmedAt: new Date().toISOString(),
        gatewayState: states.find((state) => settledStates.has(state)),
      });
    }

    if (!booking.notificationSentAt && await sendPaidBookingNotification(booking)) {
      booking = await updateBooking(booking.bookingReference, {
        notificationSentAt: new Date().toISOString(),
      });
    }
  } else if (isSettled && !amountMatches) {
    paymentStatus = 'REVIEW_REQUIRED';
    message = 'The gateway payment details did not match the booking. Please contact support.';
    booking = await updateBooking(booking.bookingReference, { status: 'PAYMENT_REVIEW_REQUIRED' });
  } else if (states.some((state) => failedStates.has(state))) {
    paymentStatus = 'FAILED';
    message = 'The payment was not successful. Your booking is not confirmed.';
    booking = await updateBooking(booking.bookingReference, { status: 'PAYMENT_FAILED' });
  } else if (states.some((state) => cancelledStates.has(state))) {
    paymentStatus = 'CANCELLED';
    message = 'The payment was cancelled. Your booking is not confirmed.';
    booking = await updateBooking(booking.bookingReference, { status: 'PAYMENT_CANCELLED' });
  }

  return paymentResponse(booking, paymentStatus, message);
};

export const processPaymentWebhook = async (payload) => {
  const eventId = String(payload?.eventId ?? '').trim();
  const eventName = String(payload?.eventName ?? '').trim().toUpperCase();
  const orderReference = extractOrderReference(payload?.order);

  if (!eventId || !eventName || !orderReference) {
    throw new ApiError(400, 'Invalid payment webhook payload.');
  }

  const claimed = await claimPaymentEvent({ eventId, eventName, orderReference, payload });
  if (!claimed) return { duplicate: true, processed: true };

  try {
    const payment = await verifyPaymentOrder(orderReference);
    await completePaymentEvent(eventId);
    return { duplicate: false, processed: true, paymentStatus: payment.paymentStatus };
  } catch (error) {
    await releasePaymentEvent(eventId);
    throw error;
  }
};
