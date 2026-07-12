# Supabase - Grupo Ardan

Esta pasta contém as migrations SQL para preparar o banco do site no Supabase.

## Tabelas criadas

- `budget_requests`: solicitações de orçamento enviadas pelo formulário do site.
- `budget_request_files`: metadados dos anexos enviados junto com uma solicitação.
- `contact_messages`: mensagens gerais de contato, pronta para quando o site tiver um formulário de contato completo.

## Storage

A migration também cria o bucket privado `budget-attachments`, limitado a arquivos de até 10 MB nos formatos:

- JPG
- PNG
- WebP
- PDF

## Segurança

As tabelas usam RLS. Visitantes do site podem apenas inserir novos registros. Leitura, edição e exclusão ficam bloqueadas para o público e devem ser feitas pelo painel do Supabase ou por uma chave de serviço no backend.

## Como aplicar

No Supabase Dashboard:

1. Abra o projeto no Supabase.
2. Vá em `SQL Editor`.
3. Para criar tudo do zero, cole o conteúdo de `supabase/migrations/20260711211500_create_leads_and_budget_tables.sql`.
4. Execute o SQL.

Se as tabelas já existem, mas o site mostra erro de RLS, execute apenas:

`supabase/migrations/20260712120000_fix_public_insert_policies.sql`

Pela CLI do Supabase:

```bash
supabase db push
```
