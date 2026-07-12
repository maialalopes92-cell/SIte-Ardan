create extension if not exists pgcrypto;

create table if not exists public.budget_requests (
  id uuid primary key default gen_random_uuid(),
  service_type text not null,
  estimated_area_m2 integer not null check (estimated_area_m2 > 0),
  location text,
  client_name text not null,
  client_email text,
  client_phone text not null,
  description text,
  status text not null default 'new' check (
    status in ('new', 'contacted', 'scheduled', 'quoted', 'won', 'lost', 'archived')
  ),
  source text not null default 'website',
  whatsapp_message text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.budget_request_files (
  id uuid primary key default gen_random_uuid(),
  budget_request_id uuid not null references public.budget_requests(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  storage_bucket text not null default 'budget-attachments',
  mime_type text,
  file_size_bytes bigint check (file_size_bytes is null or file_size_bytes > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new' check (
    status in ('new', 'read', 'replied', 'archived')
  ),
  source text not null default 'website',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists budget_requests_created_at_idx
  on public.budget_requests(created_at desc);

create index if not exists budget_requests_status_idx
  on public.budget_requests(status);

create index if not exists budget_requests_client_phone_idx
  on public.budget_requests(client_phone);

create index if not exists budget_request_files_request_id_idx
  on public.budget_request_files(budget_request_id);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages(created_at desc);

create index if not exists contact_messages_status_idx
  on public.contact_messages(status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists budget_requests_set_updated_at on public.budget_requests;
create trigger budget_requests_set_updated_at
before update on public.budget_requests
for each row
execute function public.set_updated_at();

drop trigger if exists contact_messages_set_updated_at on public.contact_messages;
create trigger contact_messages_set_updated_at
before update on public.contact_messages
for each row
execute function public.set_updated_at();

alter table public.budget_requests enable row level security;
alter table public.budget_request_files enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can create budget requests" on public.budget_requests;
create policy "Anyone can create budget requests"
on public.budget_requests
for insert
to public
with check (true);

drop policy if exists "Anyone can create budget request files" on public.budget_request_files;
create policy "Anyone can create budget request files"
on public.budget_request_files
for insert
to public
with check (true);

drop policy if exists "Anyone can create contact messages" on public.contact_messages;
create policy "Anyone can create contact messages"
on public.contact_messages
for insert
to public
with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'budget-attachments',
  'budget-attachments',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can upload budget attachments" on storage.objects;
create policy "Anyone can upload budget attachments"
on storage.objects
for insert
to public
with check (bucket_id = 'budget-attachments');
