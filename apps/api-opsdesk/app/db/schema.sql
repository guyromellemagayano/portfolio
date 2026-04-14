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

create table if not exists opsdesk_metrics (
  id text primary key,
  label text not null,
  value text not null,
  delta text not null,
  detail text not null,
  tone text not null,
  sort_order integer not null default 0
);

create table if not exists opsdesk_approvals (
  id text primary key,
  request_id uuid references opsdesk_requests (id) on delete set null,
  subject text not null,
  stage text not null,
  requested_by text not null,
  owner text not null,
  due_by text not null,
  risk text not null,
  summary text not null,
  status text not null default 'Pending',
  decision_note text,
  version integer not null default 1,
  sort_order integer not null default 0
);

alter table opsdesk_approvals
  add column if not exists request_id uuid references opsdesk_requests (id) on delete set null;

alter table opsdesk_approvals
  add column if not exists status text not null default 'Pending';

alter table opsdesk_approvals
  add column if not exists decision_note text;

alter table opsdesk_approvals
  add column if not exists version integer not null default 1;

create table if not exists opsdesk_teams (
  id text primary key,
  name text not null,
  lead text not null,
  focus text not null,
  queue_health text not null,
  active_work text not null,
  automation_coverage text not null,
  sort_order integer not null default 0
);

create table if not exists opsdesk_incidents (
  id text primary key,
  name text not null,
  status text not null,
  service text not null,
  owner text not null,
  next_checkpoint text not null,
  sort_order integer not null default 0
);

create table if not exists opsdesk_request_audit_events (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references opsdesk_requests (id) on delete cascade,
  event_key text unique,
  actor text not null,
  action text not null,
  correlation_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table opsdesk_request_audit_events
  add column if not exists event_key text;

alter table opsdesk_request_audit_events
  alter column request_id drop not null;

create unique index if not exists opsdesk_request_audit_events_event_key_idx
  on opsdesk_request_audit_events (event_key)
  where event_key is not null;

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

insert into opsdesk_metrics (
  id,
  label,
  value,
  delta,
  detail,
  tone,
  sort_order
)
values
  (
    'open-requests',
    'Open Requests',
    '18',
    '+4 today',
    'Most load is clustering around permissions and fulfillment changes.',
    'warning',
    1
  ),
  (
    'approval-queue',
    'Approval Queue',
    '6',
    '2 overdue',
    'Security review and data retention approvals are holding releases.',
    'critical',
    2
  ),
  (
    'automation-coverage',
    'Automation Coverage',
    '79%',
    '+7% MoM',
    'Recent workflow automation reduced manual incident triage steps.',
    'positive',
    3
  ),
  (
    'sla-health',
    'SLA Health',
    '94.2%',
    '-1.3%',
    'Two cross-team requests are close to breach and need reassignment.',
    'warning',
    4
  )
on conflict (id) do update
set label = excluded.label,
    value = excluded.value,
    delta = excluded.delta,
    detail = excluded.detail,
    tone = excluded.tone,
    sort_order = excluded.sort_order;

insert into opsdesk_approvals (
  id,
  request_id,
  subject,
  stage,
  requested_by,
  owner,
  due_by,
  risk,
  summary,
  status,
  version,
  sort_order
)
values
  (
    'APR-901',
    (select id from opsdesk_requests where request_number = 'REQ-2481'),
    'Queue retry policy override',
    'Security Review',
    'Platform Reliability',
    'C. Villanueva',
    'Today, 16:00',
    'High',
    'Overrides the default retry ceiling for fulfillment webhooks while incident tooling is stabilized.',
    'Pending',
    1,
    1
  ),
  (
    'APR-897',
    (select id from opsdesk_requests where request_number = 'REQ-2478'),
    'Content freeze exception for launch page',
    'Editorial Approval',
    'Growth',
    'M. Evangelista',
    'Tomorrow, 09:30',
    'Medium',
    'Requests a controlled update window for pricing content during the current freeze period.',
    'Pending',
    1,
    2
  ),
  (
    'APR-894',
    (select id from opsdesk_requests where request_number = 'REQ-2466'),
    'Retention policy update for order logs',
    'Compliance Review',
    'Data Platform',
    'L. Bautista',
    'Tomorrow, 15:00',
    'High',
    'Reduces long-tail log retention after incident exports are copied into the warehouse.',
    'Pending',
    1,
    3
  )
on conflict (id) do update
set request_id = excluded.request_id,
    subject = excluded.subject,
    stage = excluded.stage,
    requested_by = excluded.requested_by,
    owner = excluded.owner,
    due_by = excluded.due_by,
    risk = excluded.risk,
    summary = excluded.summary,
    status = excluded.status,
    version = excluded.version,
    sort_order = excluded.sort_order;

insert into opsdesk_teams (
  id,
  name,
  lead,
  focus,
  queue_health,
  active_work,
  automation_coverage,
  sort_order
)
values
  (
    'team-platform',
    'Platform',
    'Kai Ramos',
    'Permissions, release controls, and internal tooling foundations.',
    'Busy',
    '7 active requests',
    '82%',
    1
  ),
  (
    'team-content',
    'Content Systems',
    'Jules Tan',
    'Publishing workflow, editorial governance, and preview reliability.',
    'Stable',
    '4 active requests',
    '76%',
    2
  ),
  (
    'team-ops',
    'Operations',
    'Ina Reyes',
    'Queue monitoring, incident routing, and manual intervention tools.',
    'Overloaded',
    '5 active incidents',
    '63%',
    3
  ),
  (
    'team-security',
    'Security',
    'Miko Valdez',
    'Access boundaries, approval guardrails, and audit trace coverage.',
    'Busy',
    '3 active reviews',
    '91%',
    4
  )
on conflict (id) do update
set name = excluded.name,
    lead = excluded.lead,
    focus = excluded.focus,
    queue_health = excluded.queue_health,
    active_work = excluded.active_work,
    automation_coverage = excluded.automation_coverage,
    sort_order = excluded.sort_order;

insert into opsdesk_incidents (
  id,
  name,
  status,
  service,
  owner,
  next_checkpoint,
  sort_order
)
values
  (
    'INC-144',
    'Fulfillment retry queue spike',
    'Needs Attention',
    'Orders API',
    'Ina Reyes',
    '11:30',
    1
  ),
  (
    'INC-141',
    'Approval webhook latency regression',
    'Monitoring',
    'Workflow Service',
    'Kai Ramos',
    '12:00',
    2
  ),
  (
    'INC-139',
    'Editorial preview token drift',
    'Resolved',
    'Portfolio API',
    'Jules Tan',
    'Postmortem queued',
    3
  )
on conflict (id) do update
set name = excluded.name,
    status = excluded.status,
    service = excluded.service,
    owner = excluded.owner,
    next_checkpoint = excluded.next_checkpoint,
    sort_order = excluded.sort_order;

insert into opsdesk_request_audit_events (
  request_id,
  event_key,
  actor,
  action,
  correlation_id,
  payload,
  created_at
)
values
  (
    (select id from opsdesk_requests where request_number = 'REQ-2481'),
    'AUD-3201',
    'Kai Ramos',
    'approved a production role change for',
    'corr-seed-opsdesk-audit-3201',
    jsonb_build_object('target', 'REQ-2481', 'channel', 'Security Review'),
    now() - interval '2 hours'
  ),
  (
    (select id from opsdesk_requests where request_number = 'REQ-2472'),
    'AUD-3198',
    'Ina Reyes',
    'escalated incident ownership for',
    'corr-seed-opsdesk-audit-3198',
    jsonb_build_object('target', 'INC-144', 'channel', 'Operations'),
    now() - interval '3 hours'
  ),
  (
    (select id from opsdesk_requests where request_number = 'REQ-2478'),
    'AUD-3194',
    'Jules Tan',
    'released editorial preview fixes for',
    'corr-seed-opsdesk-audit-3194',
    jsonb_build_object('target', 'APR-897', 'channel', 'Content Systems'),
    now() - interval '4 hours'
  ),
  (
    (select id from opsdesk_requests where request_number = 'REQ-2466'),
    'AUD-3189',
    'Miko Valdez',
    'requested compliance follow-up on',
    'corr-seed-opsdesk-audit-3189',
    jsonb_build_object('target', 'APR-894', 'channel', 'Compliance'),
    now() - interval '1 day'
  )
on conflict (event_key) do nothing;
