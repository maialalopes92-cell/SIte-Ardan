alter table public.budget_requests disable row level security;

revoke all on public.budget_requests from anon, authenticated, public;

grant usage on schema public to anon, authenticated, public;
grant insert on public.budget_requests to anon, authenticated, public;

revoke select on public.budget_requests from anon, authenticated, public;
revoke update on public.budget_requests from anon, authenticated, public;
revoke delete on public.budget_requests from anon, authenticated, public;
