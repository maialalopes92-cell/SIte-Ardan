select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname in ('public', 'storage')
  and (
    tablename in ('budget_requests', 'budget_request_files', 'contact_messages')
    or (schemaname = 'storage' and tablename = 'objects')
  )
order by schemaname, tablename, policyname;
