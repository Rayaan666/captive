# Captive Events — N-Genius Hosted Checkout

The existing React + Vite website is integrated with Network International N-Genius Online through a separate Express API. The browser never receives the API key, outlet ID, or access token.

## Run locally

1. Open `server/.env` and enter only your merchant credentials:

   ```env
   NGENIUS_API_KEY=your_service_account_api_key
   NGENIUS_OUTLET_ID=your_outlet_reference
   ```

   The sandbox URLs, local client URL, port, and AED currency are already configured.

2. Install and run both applications:

   ```bash
   npm install
   npm run dev
   ```

3. Open `http://localhost:5173/booking`, fill the booking form, and select **Pay Now**.

Vite proxies `/api` to `http://localhost:3001` during development. For a split production deployment, set `VITE_API_BASE_URL` to the public API prefix at frontend build time and set `CLIENT_URL` in `server/.env` to the exact frontend origin. Multiple allowed frontend origins can be comma-separated.

## Commands

```bash
npm run dev          # React and Express together
npm run dev:client   # Vite only
npm run dev:server   # Express only, with watch mode
npm run build        # production frontend build
npm run lint         # frontend and backend linting
npm start            # production-style Express start
```

## Payment flow

1. React submits the complete booking to `POST /api/payments/create-order`.
2. Express validates it, creates a pending booking, obtains a short-lived N-Genius token, and creates a `PURCHASE` order in minor currency units.
3. React stores only the opaque order reference and redirects to the hosted URL from `_links.payment.href`.
4. N-Genius redirects to `/payment/success?ref=...` or `/payment/cancelled`.
5. The success page calls `GET /api/payments/status/:orderReference`.
6. Express retrieves the order directly from N-Genius and confirms the booking only when the state is `PURCHASED` or `CAPTURED` and the gateway currency and amount exactly match the pending booking.

## Project layout

The pre-existing Vite app remains the client at the repository root.

```text
src/
  components/PayNowButton.jsx
  pages/Contact.jsx
  pages/Booking.jsx
  pages/PaymentSuccess.jsx
  pages/PaymentCancelled.jsx
  services/paymentApi.js
server/
  config/env.js
  controllers/paymentController.js
  middleware/errorHandler.js
  repositories/bookingRepository.js
  routes/paymentRoutes.js
  services/ngeniusService.js
  validators/paymentValidation.js
  server.js
  .env
```

Pending/confirmed bookings are durably stored in the ignored `server/data/bookings.json` file. The repository module isolates persistence so a managed database can replace the local JSON store for horizontally scaled or serverless production hosting without changing the controller or payment flow.

## Security notes

- `server/.env` and booking data are git-ignored.
- Helmet, strict CORS, JSON body limits, rate limiting, request timeouts, and server-side validation are enabled.
- N-Genius responses are verified server-to-server; redirect query parameters are never treated as proof of payment.
- Only opaque references and non-sensitive status information are returned to the browser.
- The submitted amount is validated and frozen into the pending booking before checkout. If pricing is generated from a merchant quote or catalogue, resolve that authoritative amount on the server instead of accepting an editable amount field.
- For multi-instance production deployment, replace the local booking repository with a transactional database and configure N-Genius webhooks as an additional reconciliation path.
