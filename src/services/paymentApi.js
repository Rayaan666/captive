import axios from 'axios';

const paymentClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20_000,
});

const getErrorMessage = (error) => {
  if (error.code === 'ECONNABORTED') {
    return 'The payment service took too long to respond. Please try again.';
  }
  return error.response?.data?.message ?? 'The payment service is unavailable. Please try again.';
};

export const createPaymentOrder = async (booking) => {
  try {
    const response = await paymentClient.post('/payments/create-order', booking);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};

export const getPaymentStatus = async (orderReference) => {
  try {
    const response = await paymentClient.get(`/payments/status/${encodeURIComponent(orderReference)}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error });
  }
};
