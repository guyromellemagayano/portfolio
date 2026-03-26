create extension if not exists pgcrypto;

create or replace function set_updated_at_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists opsdesk_requests (
  id uuid primary key default gen_random_uuid(),
  request_number text not null unique,
  title text not null,
  requester text not null,
  owning_team text not null,
  priority text not null,
  status text not null,
  sla_state text not null,
  owner text,
  notes text,
  version integer not null default 1,
  idempotency_key text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint opsdesk_requests_version_positive check (version > 0)
);

create index if not exists opsdesk_requests_status_priority_idx
  on opsdesk_requests (status, priority, created_at desc);

drop trigger if exists opsdesk_requests_set_updated_at on opsdesk_requests;
create trigger opsdesk_requests_set_updated_at
before update on opsdesk_requests
for each row
execute function set_updated_at_timestamp();

create table if not exists opsdesk_request_audit_events (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references opsdesk_requests (id) on delete cascade,
  actor text not null,
  action text not null,
  correlation_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists opsdesk_request_audit_events_request_id_idx
  on opsdesk_request_audit_events (request_id, created_at desc);

create table if not exists opsdesk_idempotency_keys (
  id uuid primary key default gen_random_uuid(),
  scope text not null,
  key text not null,
  request_hash text not null,
  response_status integer,
  response_body jsonb,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  unique (scope, key)
);

-- Queue-claim workflows should use:
-- select ... for update skip locked
-- plus a version check on update to prevent double-processing races.

insert into opsdesk_requests (
  request_number,
  title,
  requester,
  owning_team,
  priority,
  status,
  sla_state,
  owner,
  notes,
  created_at
)
values
  (
    'REQ-2481',
    'Split admin roles for fulfillment escalations',
    'Nina Ortega',
    'Platform',
    'Critical',
    'Blocked',
    'Breached',
    'Kai Ramos',
    'Permissions model update is waiting on a release-control exception.',
    now() - interval '3 days'
  ),
  (
    'REQ-2478',
    'Add release visibility to the marketing content queue',
    'Mira Santos',
    'Content',
    'High',
    'In Progress',
    'Watch',
    'Jules Tan',
    'Editorial queue needs release-state awareness before Friday handoff.',
    now() - interval '1 day'
  ),
  (
    'REQ-2472',
    'Consolidate merchant health alerts into one operating view',
    'David Cruz',
    'Operations',
    'High',
    'Queued',
    'Healthy',
    'Ina Reyes',
    'Incident review wants one destination instead of scattered vendor alerts.',
    now() - interval '9 hours'
  ),
  (
    'REQ-2466',
    'Expose audit snapshots for bulk approval actions',
    'Sami Navarro',
    'Security',
    'Medium',
    'Ready for Release',
    'Healthy',
    'Miko Valdez',
    'Needs auditable evidence before wider operator rollout.',
    now() - interval '4 days'
  ),
  (
    'REQ-2459',
    'Backfill missing warehouse retry reasons',
    'Aria Lim',
    'Logistics',
    'Low',
    'In Progress',
    'Healthy',
    'Paolo Dizon',
    'Retry reason taxonomy is incomplete for downstream support reporting.',
    now() - interval '2 days'
  )
on conflict (request_number) do nothing;
