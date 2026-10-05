create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text not null,
  donor_email text not null,
  phone_number text,
  amount numeric(10, 2) not null check (amount > 0 and amount <= 50000),
  organization text not null default 'Flamingo Plumbing and Roofing',
  payment_reference text,
  receipt_path text not null,
  receipt_name text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.donations
  drop constraint if exists donations_amount_check;

alter table public.donations
  drop constraint if exists donations_amount_limit_check;

alter table public.donations
  add constraint donations_amount_limit_check
  check (amount > 0 and amount <= 50000) not valid;

alter table public.donations
  add column if not exists show_publicly boolean not null default false;

alter table public.donations
  add column if not exists phone_number text;

alter table public.donations enable row level security;
revoke all on public.donations from anon, authenticated;
grant all on public.donations to service_role;

create or replace function public.get_donation_totals()
returns jsonb
language sql
security definer
set search_path = ''
as $$
  select pg_catalog.jsonb_build_object(
    'donationCount', count(*),
    'submittedTotal', coalesce(sum(amount), 0)
  )
  from public.donations;
$$;

revoke all on function public.get_donation_totals() from public, anon, authenticated;
grant execute on function public.get_donation_totals() to anon, authenticated, service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'donation-receipts',
  'donation-receipts',
  false,
  10485760,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

notify pgrst, 'reload schema';