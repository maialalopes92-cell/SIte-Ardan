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
