alter table public.budget_requests enable row level security;
alter table public.budget_request_files enable row level security;
alter table public.contact_messages enable row level security;

grant usage on schema public to public;
grant insert on public.budget_requests to public;
grant insert on public.budget_request_files to public;
grant insert on public.contact_messages to public;

drop policy if exists "Anyone can create budget requests" on public.budget_requests;
drop policy if exists "Public insert budget requests" on public.budget_requests;
create policy "Public insert budget requests"
on public.budget_requests
as permissive
for insert
to public
with check (true);

drop policy if exists "Anyone can create budget request files" on public.budget_request_files;
drop policy if exists "Public insert budget request files" on public.budget_request_files;
create policy "Public insert budget request files"
on public.budget_request_files
as permissive
for insert
to public
with check (true);

drop policy if exists "Anyone can create contact messages" on public.contact_messages;
drop policy if exists "Public insert contact messages" on public.contact_messages;
create policy "Public insert contact messages"
on public.contact_messages
as permissive
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
drop policy if exists "Public upload budget attachments" on storage.objects;
create policy "Public upload budget attachments"
on storage.objects
as permissive
for insert
to public
with check (bucket_id = 'budget-attachments');
