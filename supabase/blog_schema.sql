-- Schema migration for Blogs table in Supabase
-- Run this script in the Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image text,
  category text not null default 'Event Trends',
  author text not null default 'Captive Events Editorial',
  author_role text default 'Event Specialist',
  read_time text default '5 min read',
  tags jsonb default '[]'::jsonb,
  is_published boolean not null default true,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for fast queries
create index if not exists blogs_slug_idx on public.blogs (slug);
create index if not exists blogs_published_idx on public.blogs (is_published, created_at desc);
create index if not exists blogs_category_idx on public.blogs (category);

-- Enable Row Level Security
alter table public.blogs enable row level security;

-- Public can read all published blogs
drop policy if exists "Public can read published blogs" on public.blogs;
create policy "Public can read published blogs"
  on public.blogs for select
  using (is_published = true);

-- Service-role has full access (used by server repository)
drop policy if exists "Service role full access on blogs" on public.blogs;
create policy "Service role full access on blogs"
  on public.blogs for all
  using (true)
  with check (true);
