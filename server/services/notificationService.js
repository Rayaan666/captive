import axios from 'axios';
import { env } from '../config/env.js';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export const sendPaidBookingNotification = async (booking) => {
  if (!env.resendApiKey || !env.paymentFromEmail) {
    console.warn('[Payment notification] RESEND_API_KEY/PAYMENT_FROM_EMAIL not configured; email skipped.');
    return false;
  }

  try {
    await axios.post('https://api.resend.com/emails', {
      from: env.paymentFromEmail,
      to: [env.notificationEmail],
      subject: `Paid booking ${booking.bookingReference} — ${booking.fullName}`,
      html: `
        <h1>New paid event booking</h1>
        <p><strong>Booking:</strong> ${escapeHtml(booking.bookingReference)}</p>
        <p><strong>Customer:</strong> ${escapeHtml(booking.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
        <p><strong>Company:</strong> ${escapeHtml(booking.companyName || 'Not provided')}</p>
        <p><strong>Event:</strong> ${escapeHtml(booking.eventType)}</p>
        <p><strong>Date:</strong> ${escapeHtml(booking.eventDate)}</p>
        <p><strong>Location:</strong> ${escapeHtml(booking.eventLocation)}</p>
        <p><strong>Guests:</strong> ${escapeHtml(booking.guestCount)}</p>
        <p><strong>Deposit paid:</strong> ${escapeHtml(booking.currency)} ${escapeHtml((booking.amountMinor / 100).toFixed(2))}</p>
        <p><strong>Project brief:</strong><br>${escapeHtml(booking.message).replaceAll('\n', '<br>')}</p>
      `,
    }, {
      timeout: env.requestTimeoutMs,
      headers: {
        Authorization: `Bearer ${env.resendApiKey}`,
        'Content-Type': 'application/json',
      },
    });
    return true;
  } catch (error) {
    console.error('[Payment notification] Failed to send paid booking email', {
      status: error.response?.status,
      message: error.response?.data?.message ?? error.message,
    });
    return false;
  }
};
