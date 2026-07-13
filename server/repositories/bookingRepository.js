import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dataDirectory = fileURLToPath(new URL('../data', import.meta.url));
const dataFile = fileURLToPath(new URL('../data/bookings.json', import.meta.url));
const temporaryFile = `${dataFile}.tmp`;

// Serialize local-file mutations so simultaneous payment requests cannot overwrite each other.
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

export const createPendingBooking = (booking) => withWriteLock(async () => {
  const bookings = await readBookings();
  const record = {
    bookingReference: `BKG-${randomUUID()}`,
    orderReference: null,
    status: 'PENDING_PAYMENT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...booking,
  };

  bookings.push(record);
  await writeBookings(bookings);
  return record;
});

export const updateBooking = (bookingReference, updates) => withWriteLock(async () => {
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

export const findBookingByOrderReference = async (orderReference) => {
  const bookings = await readBookings();
  return bookings.find((booking) => booking.orderReference === orderReference) ?? null;
};
