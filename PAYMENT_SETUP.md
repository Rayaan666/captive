# Payment production setup

The site uses a Netlify Function for N-Genius checkout, Supabase for durable booking records, and an optional Resend notification after a payment is independently verified.

## 1. Create the Supabase tables

1. Open the Supabase project.
2. Open **SQL Editor** and create a new query.
3. Paste and run `supabase/payment_schema.sql` from this repository.
4. In **Settings > API Keys**, create/copy a server-side secret key (`sb_secret_...`). The legacy `service_role` key is also supported if the project has not migrated yet.

Never expose the service-role key in React, a `VITE_` variable, source control, or chat.

## 2. Add Netlify environment variables

In Netlify, open **Project configuration > Environment variables** and add:

```text
NGENIUS_API_KEY=<sandbox service-account API key>
NGENIUS_OUTLET_ID=<sandbox outlet reference>
NGENIUS_TOKEN_URL=https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token
NGENIUS_API_BASE_URL=https://api-gateway.sandbox.ngenius-payments.com
NGENIUS_REALM=ni
NGENIUS_WEBHOOK_HEADER=x-ngenius-webhook-token
NGENIUS_WEBHOOK_SECRET=<a random secret of at least 32 characters>
CLIENT_URL=https://captiveevents.com
PAYMENT_REDIRECT_URL=https://captiveevents.com
PAYMENT_CURRENCY=AED
SUPABASE_URL=<Supabase project URL>
SUPABASE_SECRET_KEY=<Supabase sb_secret server key>
PAYMENT_NOTIFICATION_EMAIL=talhaomar1997@gmail.com
```

Generate `NGENIUS_WEBHOOK_SECRET` with a password manager. Do not reuse a password or N-Genius credential. If the project only has legacy keys, use `SUPABASE_SERVICE_ROLE_KEY` instead of `SUPABASE_SECRET_KEY`.

## 3. Configure the N-Genius webhook

In the N-Genius merchant portal, create a webhook with:

```text
URL: https://captiveevents.com/api/payments/webhook
Header key: x-ngenius-webhook-token
Header value: <the exact NGENIUS_WEBHOOK_SECRET from Netlify>
```

Subscribe to at least `PURCHASED`, `PURCHASE_DECLINED`, `PURCHASE_FAILED`, and `PURCHASE_REVERSED`. The function verifies every webhook by retrieving the order from N-Genius before updating Supabase.

## 4. Enable email notifications

Create a Resend account, verify `captiveevents.com`, and add:

```text
RESEND_API_KEY=<Resend API key>
PAYMENT_FROM_EMAIL=payments@captiveevents.com
```

Email delivery is optional for payment confirmation: a missing or temporarily unavailable email provider never changes a verified payment back to unpaid. Supabase remains the source of record.

## 5. Deploy and test sandbox

Trigger a fresh Netlify deploy after adding the variables. Test the complete flow at:

```text
https://captiveevents.com/booking
```

Verify successful, declined, cancelled, and 3-D Secure transactions using an agreed custom amount. Confirm the booking row, payment event, return page, and notification email for each applicable case.

## 6. Switch to live only after approval

Replace the sandbox credentials and configure:

```text
NGENIUS_TOKEN_URL=https://api-gateway.ngenius-payments.com/identity/auth/access-token
NGENIUS_API_BASE_URL=https://api-gateway.ngenius-payments.com
NGENIUS_REALM=networkinternational
```

Redeploy, make one controlled live transaction, and reconcile it against the N-Genius portal and Supabase before opening checkout publicly.
