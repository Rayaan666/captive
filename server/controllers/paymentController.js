import { env } from '../config/env.js';
import {
  createPendingBooking,
  findBookingByOrderReference,
  updateBooking,
} from '../repositories/bookingRepository.js';
import {
  createHostedPaymentOrder,
  retrieveHostedPaymentOrder,
} from '../services/ngeniusService.js';
import { ApiError } from '../utils/ApiError.js';
import {
  amountToMinorUnits,
  bookingPaymentSchema,
  orderReferenceSchema,
} from '../validators/paymentValidation.js';

const settledStates = new Set(['PURCHASED', 'CAPTURED']);
const failedStates = new Set(['FAILED', 'DECLINED']);
const cancelledStates = new Set(['CANCELLED', 'CANCELED', 'REVERSED']);

const extractOrderReference = (order) =>
  order.orderReference ?? order.reference ?? order._id?.split(':').at(-1);

const extractGatewayStates = (order) => [
  order.state,
  ...(order._embedded?.payment ?? []).map((payment) => payment.state),
].filter(Boolean).map((state) => String(state).toUpperCase());

export const createOrder = async (req, res) => {
  const validation = bookingPaymentSchema.safeParse(req.body);

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

    res.status(201).json({
      paymentUrl,
      orderReference,
      bookingReference: booking.bookingReference,
    });
  } catch (error) {
    await updateBooking(booking.bookingReference, { status: 'PAYMENT_INITIALIZATION_FAILED' });
    throw error;
  }
};

export const getPaymentStatus = async (req, res) => {
  const referenceValidation = orderReferenceSchema.safeParse(req.params.orderReference);
  if (!referenceValidation.success) {
    throw new ApiError(400, 'Invalid order reference.');
  }

  const orderReference = referenceValidation.data;
  const booking = await findBookingByOrderReference(orderReference);
  if (!booking) {
    throw new ApiError(404, 'No booking was found for this payment.');
  }

  const order = await retrieveHostedPaymentOrder(orderReference);
  const states = extractGatewayStates(order);
  const gatewayAmount = order.amount;
  const amountMatches =
    Number(gatewayAmount?.value) === booking.amountMinor &&
    gatewayAmount?.currencyCode === booking.currency;
  const isSettled = states.some((state) => settledStates.has(state));

  let bookingStatus = booking.status;
  let paymentStatus = 'PENDING';
  let message = 'Your payment is still being processed.';

  if (isSettled && amountMatches) {
    bookingStatus = 'CONFIRMED';
    paymentStatus = 'PAID';
    message = 'Payment verified and booking confirmed.';
    if (booking.status !== bookingStatus) {
      await updateBooking(booking.bookingReference, {
        status: bookingStatus,
        confirmedAt: new Date().toISOString(),
        gatewayState: states.find((state) => settledStates.has(state)),
      });
    }
  } else if (isSettled && !amountMatches) {
    bookingStatus = 'PAYMENT_REVIEW_REQUIRED';
    paymentStatus = 'REVIEW_REQUIRED';
    message = 'The gateway payment details did not match the booking. Please contact support.';
    await updateBooking(booking.bookingReference, { status: bookingStatus });
  } else if (states.some((state) => failedStates.has(state))) {
    bookingStatus = 'PAYMENT_FAILED';
    paymentStatus = 'FAILED';
    message = 'The payment was not successful. Your booking is not confirmed.';
    await updateBooking(booking.bookingReference, { status: bookingStatus });
  } else if (states.some((state) => cancelledStates.has(state))) {
    bookingStatus = 'PAYMENT_CANCELLED';
    paymentStatus = 'CANCELLED';
    message = 'The payment was cancelled. Your booking is not confirmed.';
    await updateBooking(booking.bookingReference, { status: bookingStatus });
  }

  res.json({
    orderReference,
    bookingReference: booking.bookingReference,
    paymentStatus,
    bookingStatus,
    isPaid: paymentStatus === 'PAID',
    message,
    amount: {
      currency: booking.currency,
      value: (booking.amountMinor / 100).toFixed(2),
    },
  });
};
