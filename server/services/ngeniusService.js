import axios from 'axios';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

const identityMediaType = 'application/vnd.ni-identity.v1+json';
const paymentMediaType = 'application/vnd.ni-payment.v2+json';

let tokenCache = null;

const toGatewayError = (error, operation) => {
  const gatewayStatus = error.response?.status;
  const gatewayMessage =
    error.response?.data?.message ??
    error.response?.data?.errors?.[0]?.message ??
    error.message;

  // Detailed gateway failures are logged server-side; credentials and token data never reach React.
  console.error(`[N-Genius] ${operation} failed`, {
    status: gatewayStatus,
    message: gatewayMessage,
  });

  return new ApiError(502, `Unable to ${operation}. Please try again shortly.`);
};

export const getAccessToken = async () => {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 30_000) {
    return tokenCache.value;
  }

  try {
    const response = await axios.post(
      env.tokenUrl,
      { realmName: env.realm },
      {
        timeout: env.requestTimeoutMs,
        headers: {
          Accept: identityMediaType,
          Authorization: `Basic ${env.apiKey}`,
          'Content-Type': identityMediaType,
        },
      },
    );

    if (!response.data?.access_token) {
      throw new Error('The identity API returned no access token.');
    }

    tokenCache = {
      value: response.data.access_token,
      expiresAt: Date.now() + Number(response.data.expires_in ?? 300) * 1000,
    };

    return tokenCache.value;
  } catch (error) {
    tokenCache = null;
    throw toGatewayError(error, 'authenticate with the payment gateway');
  }
};

export const createHostedPaymentOrder = async ({ amountMinor, emailAddress }) => {
  const accessToken = await getAccessToken();
  const redirectOrigin = env.paymentRedirectOrigin ?? env.clientOrigins[0];
  const orderUrl = `${env.apiBaseUrl}/transactions/outlets/${encodeURIComponent(env.outletId)}/orders`;

  try {
    const response = await axios.post(
      orderUrl,
      {
        action: 'PURCHASE',
        amount: {
          currencyCode: env.currency,
          value: amountMinor,
        },
        emailAddress,
        merchantAttributes: {
          redirectUrl: `${redirectOrigin}/payment/success`,
          cancelUrl: `${redirectOrigin}/payment/cancelled`,
        },
      },
      {
        timeout: env.requestTimeoutMs,
        headers: {
          Accept: paymentMediaType,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': paymentMediaType,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw toGatewayError(error, 'create the payment order');
  }
};

export const retrieveHostedPaymentOrder = async (orderReference) => {
  const accessToken = await getAccessToken();
  const orderUrl = `${env.apiBaseUrl}/transactions/outlets/${encodeURIComponent(env.outletId)}/orders/${encodeURIComponent(orderReference)}`;

  try {
    const response = await axios.get(orderUrl, {
      timeout: env.requestTimeoutMs,
      headers: {
        Accept: paymentMediaType,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw toGatewayError(error, 'verify the payment status');
  }
};
