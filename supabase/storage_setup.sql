-- Supabase Storage Setup for Blog Images
-- Run this script in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- 1. Create a public storage bucket for blog images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  10485760, -- 10MB limit
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set public = true;

-- 2. Allow public access to view images
drop policy if exists "Public Access for Blog Images" on storage.objects;
create policy "Public Access for Blog Images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- 3. Allow uploads to blog-images bucket
drop policy if exists "Allow Uploads to Blog Images" on storage.objects;
create policy "Allow Uploads to Blog Images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images');

-- 4. Allow updates and deletes on blog-images bucket
drop policy if exists "Allow Updates to Blog Images" on storage.objects;
create policy "Allow Updates to Blog Images"
  on storage.objects for update
  using (bucket_id = 'blog-images');

drop policy if exists "Allow Deletes to Blog Images" on storage.objects;
create policy "Allow Deletes to Blog Images"
  on storage.objects for delete
  using (bucket_id = 'blog-images');
