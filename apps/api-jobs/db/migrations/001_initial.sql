create extension if not exists pg_trgm;

create table if not exists job_sources (
  id text primary key,
  ats text not null,
  company_name text not null,
  board_url text not null unique,
  verification_status text not null default 'pending',
  verification_error text,
  last_verified_at timestamptz,
  is_seed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists job_sources_ats_idx on job_sources (ats);
create index if not exists job_sources_verification_status_idx on job_sources (verification_status);

create table if not exists raw_job_snapshots (
  id text primary key,
  source_id text not null references job_sources(id) on delete cascade,
  external_job_id text not null,
  canonical_url text not null,
  payload jsonb not null,
  payload_hash text not null,
  synced_at timestamptz not null default now()
);

create index if not exists raw_job_snapshots_source_id_idx on raw_job_snapshots (source_id, synced_at desc);
create index if not exists raw_job_snapshots_external_job_id_idx on raw_job_snapshots (external_job_id);

create table if not exists normalized_jobs (
  id text primary key,
  source_id text not null references job_sources(id) on delete cascade,
  external_job_id text not null,
  canonical_url text not null,
  company text not null,
  title text not null,
  location text not null default '',
  remote_mode text not null default 'unknown',
  employment_type text not null default 'unknown',
  posted_at timestamptz,
  first_seen_at timestamptz not null,
  last_seen_at timestamptz not null,
  lifecycle_state text not null default 'active',
  fingerprint text not null,
  search_text text not null,
  latest_snapshot_id text references raw_job_snapshots(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_id, external_job_id)
);

create index if not exists normalized_jobs_source_id_idx on normalized_jobs (source_id, lifecycle_state);
create index if not exists normalized_jobs_last_seen_idx on normalized_jobs (last_seen_at desc);
create index if not exists normalized_jobs_posted_at_idx on normalized_jobs (posted_at desc nulls last);
create index if not exists normalized_jobs_search_text_trgm_idx on normalized_jobs using gin (search_text gin_trgm_ops);
create index if not exists normalized_jobs_search_vector_idx on normalized_jobs using gin (to_tsvector('simple', search_text));

create table if not exists job_lifecycle_events (
  id text primary key,
  job_id text not null references normalized_jobs(id) on delete cascade,
  source_id text not null references job_sources(id) on delete cascade,
  event_type text not null,
  previous_state text,
  next_state text,
  details jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists job_lifecycle_events_job_id_idx on job_lifecycle_events (job_id, occurred_at desc);

create table if not exists user_job_states (
  job_id text primary key references normalized_jobs(id) on delete cascade,
  ignored boolean not null default false,
  saved boolean not null default false,
  applied boolean not null default false,
  application_status text not null default 'not_started',
  notes text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists job_sync_runs (
  id text primary key,
  status text not null,
  triggered_by text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  summary jsonb not null default '{}'::jsonb,
  error_message text
);

create index if not exists job_sync_runs_started_at_idx on job_sync_runs (started_at desc);

create table if not exists job_user_preferences (
  id text primary key,
  keywords text[] not null default '{}'::text[],
  preferred_locations text[] not null default '{}'::text[],
  remote_modes text[] not null default '{}'::text[],
  employment_types text[] not null default '{}'::text[],
  updated_at timestamptz not null default now()
);
