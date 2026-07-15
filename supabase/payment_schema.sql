create table if not exists public.bookings (
  booking_reference text primary key,
  order_reference text unique,
  status text not null,
  amount_minor integer not null check (amount_minor > 0),
  currency char(3) not null,
  details jsonb not null default '{}'::jsonb,
  gateway_state text,
  confirmed_at timestamptz,
  notification_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

create table if not exists public.payment_events (
  event_id text primary key,
  event_name text not null,
  order_reference text,
  payload jsonb not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

alter table public.bookings enable row level security;
alter table public.payment_events enable row level security;

-- No browser-facing policies are created. These tables are accessed only with
-- the Supabase service-role key from the payment function.
