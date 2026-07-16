import axios from 'axios';
import { env } from '../config/env.js';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const bookingDetailsHtml = (booking) => `
  <p><strong>Booking:</strong> ${escapeHtml(booking.bookingReference)}</p>
  <p><strong>Customer:</strong> ${escapeHtml(booking.fullName)}</p>
  <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
  <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
  <p><strong>PO number:</strong> ${escapeHtml(booking.poNumber)}</p>
  <p><strong>Company:</strong> ${escapeHtml(booking.companyName || 'Not provided')}</p>
  <p><strong>Event:</strong> ${escapeHtml(booking.eventType || 'Not provided')}</p>
  <p><strong>Date:</strong> ${escapeHtml(booking.eventDate || 'Not provided')}</p>
  <p><strong>Location:</strong> ${escapeHtml(booking.eventLocation || 'Not provided')}</p>
  <p><strong>Guests:</strong> ${escapeHtml(booking.guestCount || 'Not provided')}</p>
  <p><strong>Amount paid:</strong> ${escapeHtml(booking.currency)} ${escapeHtml((booking.amountMinor / 100).toFixed(2))}</p>
  <p><strong>Project brief:</strong><br>${escapeHtml(booking.message || 'Not provided').replaceAll('\n', '<br>')}</p>
`;

const sendEmail = ({ to, subject, html, idempotencyKey, replyTo }) => axios.post(
  'https://api.resend.com/emails',
  {
    from: env.paymentFromEmail,
    to: [to],
    subject,
    html,
    ...(replyTo ? { reply_to: replyTo } : {}),
  },
  {
    timeout: env.requestTimeoutMs,
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
  },
);

export const sendPaidBookingNotification = async (booking) => {
  if (!env.resendApiKey || !env.paymentFromEmail) {
    console.warn('[Payment notification] RESEND_API_KEY/PAYMENT_FROM_EMAIL not configured; emails skipped.');
    return false;
  }

  const details = bookingDetailsHtml(booking);
  const messages = [
    {
      recipient: 'receiver',
      request: sendEmail({
        to: env.notificationEmail,
        replyTo: booking.email,
        subject: `Paid booking ${booking.bookingReference} — ${booking.fullName}`,
        html: `<h1>New paid event booking</h1>${details}`,
        idempotencyKey: `paid-booking-receiver/${booking.bookingReference}`,
      }),
    },
    {
      recipient: 'customer',
      request: sendEmail({
        to: booking.email,
        replyTo: env.notificationEmail,
        subject: `Your Captive Events payment confirmation — ${booking.bookingReference}`,
        html: `
          <h1>Payment received</h1>
          <p>Dear ${escapeHtml(booking.fullName)},</p>
          <p>Thank you. Your payment has been verified and your booking form has been received.</p>
          ${details}
          <p>Captive Events will contact you regarding the next steps.</p>
        `,
        idempotencyKey: `paid-booking-customer/${booking.bookingReference}`,
      }),
    },
  ];

  const results = await Promise.allSettled(messages.map(({ request }) => request));
  let allSent = true;

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') return;
    allSent = false;
    const error = result.reason;
    console.error(`[Payment notification] Failed to send ${messages[index].recipient} email`, {
      status: error.response?.status,
      message: error.response?.data?.message ?? error.message,
    });
  });

  return allSent;
};
