import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import axios from 'axios';
import { env } from '../config/env.js';

const dataDirectory = fileURLToPath(new URL('../data', import.meta.url));
const dataFile = fileURLToPath(new URL('../data/bookings.json', import.meta.url));
const temporaryFile = `${dataFile}.tmp`;
const useSupabase = Boolean(env.supabaseUrl && env.supabaseServerKey);
const isModernSecretKey = env.supabaseServerKey?.startsWith('sb_secret_');

const supabaseClient = useSupabase
  ? axios.create({
      baseURL: `${env.supabaseUrl}/rest/v1`,
      timeout: env.requestTimeoutMs,
      headers: {
        apikey: env.supabaseServerKey,
        ...(!isModernSecretKey ? { Authorization: `Bearer ${env.supabaseServerKey}` } : {}),
        'Content-Type': 'application/json',
      },
    })
  : null;

const normalizeRow = (row) => ({
  ...row.details,
  bookingReference: row.booking_reference,
  orderReference: row.order_reference,
  status: row.status,
  amountMinor: row.amount_minor,
  currency: row.currency,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  confirmedAt: row.confirmed_at,
  gatewayState: row.gateway_state,
  notificationSentAt: row.notification_sent_at,
});

const toDatabaseUpdates = (updates) => {
  const mapped = { updated_at: new Date().toISOString() };
  if ('orderReference' in updates) mapped.order_reference = updates.orderReference;
  if ('status' in updates) mapped.status = updates.status;
  if ('confirmedAt' in updates) mapped.confirmed_at = updates.confirmedAt;
  if ('gatewayState' in updates) mapped.gateway_state = updates.gatewayState;
  if ('notificationSentAt' in updates) mapped.notification_sent_at = updates.notificationSentAt;
  return mapped;
};

// Serialize local-file mutations so simultaneous development requests cannot overwrite each other.
let operationQueue = Promise.resolve();
const withWriteLock = (operation) => {
  const result = operationQueue.then(operation, operation);
  operationQueue = result.then(() => undefined, () => undefined);
  return result;
};

const readBookings = async () => {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeBookings = async (bookings) => {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(temporaryFile, JSON.stringify(bookings, null, 2), 'utf8');
  await rename(temporaryFile, dataFile);
};

export const createPendingBooking = async (booking) => {
  const now = new Date().toISOString();
  const record = {
    bookingReference: `BKG-${randomUUID()}`,
    orderReference: null,
    status: 'PENDING_PAYMENT',
    createdAt: now,
    updatedAt: now,
    ...booking,
  };

  if (useSupabase) {
    const { data } = await supabaseClient.post('/bookings', {
      booking_reference: record.bookingReference,
      order_reference: null,
      status: record.status,
      amount_minor: record.amountMinor,
      currency: record.currency,
      details: booking,
      created_at: now,
      updated_at: now,
    }, { headers: { Prefer: 'return=representation' } });
    return normalizeRow(data[0]);
  }

  return withWriteLock(async () => {
    const bookings = await readBookings();
    bookings.push(record);
    await writeBookings(bookings);
    return record;
  });
};

export const updateBooking = async (bookingReference, updates) => {
  if (useSupabase) {
    const { data } = await supabaseClient.patch(
      `/bookings?booking_reference=eq.${encodeURIComponent(bookingReference)}`,
      toDatabaseUpdates(updates),
      { headers: { Prefer: 'return=representation' } },
    );
    return data[0] ? normalizeRow(data[0]) : null;
  }

  return withWriteLock(async () => {
    const bookings = await readBookings();
    const index = bookings.findIndex((booking) => booking.bookingReference === bookingReference);
    if (index === -1) return null;

    bookings[index] = {
      ...bookings[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await writeBookings(bookings);
    return bookings[index];
  });
};

export const findBookingByOrderReference = async (orderReference) => {
  if (useSupabase) {
    const { data } = await supabaseClient.get(
      `/bookings?order_reference=eq.${encodeURIComponent(orderReference)}&select=*&limit=1`,
    );
    return data[0] ? normalizeRow(data[0]) : null;
  }

  const bookings = await readBookings();
  return bookings.find((booking) => booking.orderReference === orderReference) ?? null;
};

export const claimPaymentEvent = async ({ eventId, eventName, orderReference, payload }) => {
  if (!useSupabase) return true;

  try {
    const { data } = await supabaseClient.post(
      '/payment_events?on_conflict=event_id',
      {
        event_id: eventId,
        event_name: eventName,
        order_reference: orderReference,
        payload,
      },
      { headers: { Prefer: 'resolution=ignore-duplicates,return=representation' } },
    );
    return data.length > 0;
  } catch (error) {
    if (error.response?.status === 409) return false;
    throw error;
  }
};

export const completePaymentEvent = async (eventId) => {
  if (!useSupabase) return;
  await supabaseClient.patch(
    `/payment_events?event_id=eq.${encodeURIComponent(eventId)}`,
    { processed_at: new Date().toISOString() },
  );
};

export const releasePaymentEvent = async (eventId) => {
  if (!useSupabase) return;
  await supabaseClient.delete(`/payment_events?event_id=eq.${encodeURIComponent(eventId)}`);
};
