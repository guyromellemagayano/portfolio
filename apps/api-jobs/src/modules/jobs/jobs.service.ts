/**
 * @file apps/api-jobs/src/modules/jobs/jobs.service.ts
 * @author Guy Romelle Magayano
 * @description Persistence and orchestration for jobs search, tracker state, and sync lifecycle.
 */

import { randomUUID } from "node:crypto";
import { acquireJobSyncLock, releaseJobSyncLock } from "@api-jobs/db/locks";
import type { Row, Sql } from "postgres";

import type {
  JobApplicationStatus,
  JobDetail,
  JobLifecycleEvent,
  JobSearchFilters,
  JobSearchResponseData,
  JobSource,
  JobSyncRunSummary,
  JobUserPreferences,
  NormalizedJob,
  RawJobSnapshot,
  SourceVerificationSummary,
  UpdateUserJobStateInput,
  UserJobState,
} from "@portfolio/api-contracts";
import {
  API_ERROR_CODES,
  type ApiErrorCode,
} from "@portfolio/api-contracts/http";
import {
  curatedSeedSources,
  syncSource,
  verifySource,
} from "@portfolio/jobs-connectors";
import {
  type AtsVendor,
  type ConnectorJobRecord,
  createNormalizedJobRecord,
  type JobLifecycleState,
  type JobSourceRecord,
  type JobSourceVerificationStatus,
  resolveLifecycleTransition,
} from "@portfolio/jobs-domain";

type JobSourceRow = Row & {
  id: string;
  ats: AtsVendor;
  company_name: string;
  board_url: string;
  verification_status: JobSourceVerificationStatus;
  verification_error: string | null;
  last_verified_at: Date | null;
  is_seed: boolean;
  created_at: Date;
  updated_at: Date;
};

type RawJobSnapshotRow = Row & {
  id: string;
  source_id: string;
  external_job_id: string;
  canonical_url: string;
  payload: Record<string, unknown>;
  payload_hash: string;
  synced_at: Date;
};

type NormalizedJobRow = Row & {
  id: string;
  source_id: string;
  external_job_id: string;
  canonical_url: string;
  company: string;
  title: string;
  location: string;
  remote_mode: string;
  employment_type: string;
  posted_at: Date | null;
  first_seen_at: Date;
  last_seen_at: Date;
  lifecycle_state: JobLifecycleState;
  fingerprint: string;
  search_text: string;
  latest_snapshot_id: string | null;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
};

type UserJobStateRow = Row & {
  job_id: string;
  ignored: boolean;
  saved: boolean;
  applied: boolean;
  application_status: JobApplicationStatus;
  notes: string;
  updated_at: Date;
};

type JobLifecycleEventRow = Row & {
  id: string;
  job_id: string;
  source_id: string;
  event_type: string;
  previous_state: string | null;
  next_state: string | null;
  details: Record<string, unknown>;
  occurred_at: Date;
};

type JobSyncRunRow = Row & {
  id: string;
  status: string;
  triggered_by: string;
  started_at: Date;
  finished_at: Date | null;
  summary: Record<string, unknown>;
  error_message: string | null;
};

type UserPreferencesRow = Row & {
  id: string;
  keywords: string[];
  preferred_locations: string[];
  remote_modes: string[];
  employment_types: string[];
  updated_at: Date;
};

type SearchQueryParts = {
  whereClause: string;
  params: Array<string | number | string[]>;
};

type ServiceError = {
  statusCode: number;
  code: ApiErrorCode;
  message: string;
  details?: unknown;
};

const DEFAULT_USER_PREFERENCES_ID = "local-user";
const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 100;

/** Error type for predictable API responses. */
export class JobsServiceError extends Error {
  statusCode: number;
  code: ApiErrorCode;
  details?: unknown;

  constructor(error: ServiceError) {
    super(error.message);
    this.name = "JobsServiceError";
    this.statusCode = error.statusCode;
    this.code = error.code;
    this.details = error.details;
  }
}

/** Normalizes query-string list values to a clean string array. */
function normalizeListInput(value?: string | string[]): string[] {
  const rawValues = Array.isArray(value) ? value : value ? [value] : [];

  return rawValues
    .flatMap((entry) => entry.split(","))
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

/** Parses a positive integer from query input. */
function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

/** Maps a source database row into the public contract shape. */
function mapJobSource(row: JobSourceRow): JobSource {
  return {
    id: row.id,
    ats: row.ats,
    companyName: row.company_name,
    boardUrl: row.board_url,
    verificationStatus: row.verification_status,
    verificationError: row.verification_error ?? undefined,
    lastVerifiedAt: row.last_verified_at?.toISOString() ?? null,
    isSeed: row.is_seed,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

/** Maps a user-state row into the public contract shape. */
function mapUserJobState(row?: UserJobStateRow | null): UserJobState {
  return {
    ignored: row?.ignored ?? false,
    saved: row?.saved ?? false,
    applied: row?.applied ?? false,
    applicationStatus: row?.application_status ?? "not_started",
    notes: row?.notes ?? "",
    updatedAt: row?.updated_at?.toISOString() ?? new Date(0).toISOString(),
  };
}

/** Maps a normalized job row into the public contract shape. */
function mapNormalizedJob(
  row: NormalizedJobRow,
  userState?: UserJobStateRow | null
): NormalizedJob {
  return {
    id: row.id,
    sourceId: row.source_id,
    canonicalUrl: row.canonical_url,
    company: row.company,
    title: row.title,
    location: row.location,
    remoteMode: row.remote_mode as NormalizedJob["remoteMode"],
    employmentType: row.employment_type as NormalizedJob["employmentType"],
    postedAt: row.posted_at?.toISOString() ?? null,
    firstSeenAt: row.first_seen_at.toISOString(),
    lastSeenAt: row.last_seen_at.toISOString(),
    lifecycleState: row.lifecycle_state,
    metadata: row.metadata ?? {},
    userState: mapUserJobState(userState),
  };
}

/** Maps a lifecycle event row into the public contract shape. */
function mapLifecycleEvent(row: JobLifecycleEventRow): JobLifecycleEvent {
  return {
    id: row.id,
    jobId: row.job_id,
    sourceId: row.source_id,
    eventType: row.event_type,
    previousState:
      (row.previous_state as JobLifecycleEvent["previousState"]) ?? null,
    nextState: (row.next_state as JobLifecycleEvent["nextState"]) ?? null,
    occurredAt: row.occurred_at.toISOString(),
    details: row.details ?? {},
  };
}

/** Maps a raw snapshot row into the public contract shape. */
function mapRawJobSnapshot(row: RawJobSnapshotRow): RawJobSnapshot {
  return {
    id: row.id,
    sourceId: row.source_id,
    externalJobId: row.external_job_id,
    canonicalUrl: row.canonical_url,
    payload: row.payload,
    payloadHash: row.payload_hash,
    syncedAt: row.synced_at.toISOString(),
  };
}

/** Maps a preferences row into the public contract shape. */
function mapPreferences(row?: UserPreferencesRow | null): JobUserPreferences {
  return {
    keywords: row?.keywords ?? [],
    preferredLocations: row?.preferred_locations ?? [],
    remoteModes: (row?.remote_modes as JobUserPreferences["remoteModes"]) ?? [],
    employmentTypes:
      (row?.employment_types as JobUserPreferences["employmentTypes"]) ?? [],
    updatedAt: row?.updated_at?.toISOString() ?? new Date(0).toISOString(),
  };
}

/** Converts a source row into the domain source record expected by connectors. */
function toJobSourceRecord(row: JobSourceRow): JobSourceRecord {
  return {
    id: row.id,
    ats: row.ats,
    companyName: row.company_name,
    boardUrl: row.board_url,
    verificationStatus: row.verification_status,
    verificationError: row.verification_error ?? undefined,
    lastVerifiedAt: row.last_verified_at?.toISOString() ?? null,
    isSeed: row.is_seed,
  };
}

/** Creates a public facing service error. */
function createServiceError(error: ServiceError): JobsServiceError {
  return new JobsServiceError(error);
}

/** Builds a safe SQL `where` clause for job search. */
function buildSearchQuery(filters: JobSearchFilters): SearchQueryParts {
  const conditions: string[] = [
    "j.lifecycle_state in ('active', 'stale', 'verification_failed', 'closed')",
  ];
  const params: Array<string | number | string[]> = [];
  let index = 1;

  if (filters.keyword?.trim()) {
    const keyword = filters.keyword.trim();
    params.push(keyword, keyword);
    conditions.push(
      `(to_tsvector('simple', j.search_text) @@ websearch_to_tsquery('simple', $${index}) or similarity(j.search_text, $${index + 1}) > 0.1)`
    );
    index += 2;
  }

  if (filters.ats?.length) {
    params.push(filters.ats);
    conditions.push(`s.ats = any($${index}::text[])`);
    index += 1;
  }

  if (filters.company?.trim()) {
    params.push(`%${filters.company.trim()}%`);
    conditions.push(`j.company ilike $${index}`);
    index += 1;
  }

  if (filters.location?.trim()) {
    params.push(`%${filters.location.trim()}%`);
    conditions.push(`j.location ilike $${index}`);
    index += 1;
  }

  if (filters.remoteModes?.length) {
    params.push(filters.remoteModes);
    conditions.push(`j.remote_mode = any($${index}::text[])`);
    index += 1;
  }

  if (filters.employmentTypes?.length) {
    params.push(filters.employmentTypes);
    conditions.push(`j.employment_type = any($${index}::text[])`);
    index += 1;
  }

  if (!filters.includeIgnored) {
    conditions.push("coalesce(u.ignored, false) = false");
  }

  if (filters.onlyApplied) {
    conditions.push("coalesce(u.applied, false) = true");
  }

  if (filters.onlySaved) {
    conditions.push("coalesce(u.saved, false) = true");
  }

  if (filters.freshWithinHours && filters.freshWithinHours > 0) {
    params.push(filters.freshWithinHours);
    conditions.push(
      `j.last_seen_at >= now() - (($${index}::int || ' hours')::interval)`
    );
    index += 1;
  }

  return {
    whereClause:
      conditions.length > 0 ? `where ${conditions.join(" and ")}` : "",
    params,
  };
}

/** Creates a sync summary shape with all counters initialized. */
function createEmptySyncSummary(triggeredBy: string): JobSyncRunSummary {
  return {
    id: randomUUID(),
    status: "running",
    triggeredBy,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    sourcesDiscovered: 0,
    sourcesVerified: 0,
    sourcesFailedVerification: 0,
    jobsSeen: 0,
    jobsInserted: 0,
    jobsUpdated: 0,
    jobsMarkedStale: 0,
    jobsMarkedClosed: 0,
    jobsMarkedVerificationFailed: 0,
    connectorHealth: {},
    errors: [],
  };
}

/** Writes lifecycle event history for significant job transitions. */
async function insertLifecycleEvent(
  sql: Sql,
  event: {
    jobId: string;
    sourceId: string;
    eventType: string;
    previousState?: string | null;
    nextState?: string | null;
    details?: Record<string, unknown>;
  }
): Promise<void> {
  await sql`
    insert into job_lifecycle_events (
      id,
      job_id,
      source_id,
      event_type,
      previous_state,
      next_state,
      details
    )
    values (
      ${randomUUID()},
      ${event.jobId},
      ${event.sourceId},
      ${event.eventType},
      ${event.previousState ?? null},
      ${event.nextState ?? null},
      ${sql.json((event.details ?? {}) as never)}
    )
  `;
}

/** Ensures the curated seed registry exists in the local store. */
async function ensureSeedSources(sql: Sql): Promise<void> {
  for (const seedSource of curatedSeedSources) {
    await sql`
      insert into job_sources (
        id,
        ats,
        company_name,
        board_url,
        verification_status,
        is_seed
      )
      values (
        ${seedSource.id},
        ${seedSource.ats},
        ${seedSource.companyName},
        ${seedSource.boardUrl},
          ${seedSource.verificationStatus ?? "pending"},
        true
      )
      on conflict (board_url) do update
      set
        ats = excluded.ats,
        company_name = excluded.company_name,
        is_seed = true,
        updated_at = now()
    `;
  }
}

/** Creates the jobs service against a configured Postgres connection. */
export function createJobsService(sql: Sql) {
  return {
    /** Boots the data store and seed registry. */
    async initialize(): Promise<void> {
      await ensureSeedSources(sql);
      await sql`
        insert into job_user_preferences (id)
        values (${DEFAULT_USER_PREFERENCES_ID})
        on conflict (id) do nothing
      `;
    },

    /** Lists the source registry ordered by ATS and company. */
    async listSources(): Promise<JobSource[]> {
      await ensureSeedSources(sql);

      const rows = await sql<JobSourceRow[]>`
        select *
        from job_sources
        order by ats asc, company_name asc
      `;

      return rows.map(mapJobSource);
    },

    /** Returns the latest sync run summary when present. */
    async getLatestSyncStatus(): Promise<JobSyncRunSummary | null> {
      const rows = await sql<JobSyncRunRow[]>`
        select *
        from job_sync_runs
        order by started_at desc
        limit 1
      `;

      const row = rows[0];

      if (!row) {
        return null;
      }

      return {
        id: row.id,
        status: row.status as JobSyncRunSummary["status"],
        triggeredBy: row.triggered_by,
        startedAt: row.started_at.toISOString(),
        finishedAt: row.finished_at?.toISOString() ?? null,
        sourcesDiscovered: Number(row.summary.sourcesDiscovered ?? 0),
        sourcesVerified: Number(row.summary.sourcesVerified ?? 0),
        sourcesFailedVerification: Number(
          row.summary.sourcesFailedVerification ?? 0
        ),
        jobsSeen: Number(row.summary.jobsSeen ?? 0),
        jobsInserted: Number(row.summary.jobsInserted ?? 0),
        jobsUpdated: Number(row.summary.jobsUpdated ?? 0),
        jobsMarkedStale: Number(row.summary.jobsMarkedStale ?? 0),
        jobsMarkedClosed: Number(row.summary.jobsMarkedClosed ?? 0),
        jobsMarkedVerificationFailed: Number(
          row.summary.jobsMarkedVerificationFailed ?? 0
        ),
        connectorHealth:
          (row.summary.connectorHealth as Record<string, number>) ?? {},
        errors: (row.summary.errors as string[]) ?? [],
      };
    },

    /** Verifies configured sources and updates verification state. */
    async verifySources(
      sourceIds?: string[]
    ): Promise<SourceVerificationSummary> {
      await ensureSeedSources(sql);

      const rows = sourceIds?.length
        ? await sql<JobSourceRow[]>`
            select *
            from job_sources
            where id = any(${sourceIds}::text[])
            order by ats asc, company_name asc
          `
        : await sql<JobSourceRow[]>`
            select *
            from job_sources
            order by ats asc, company_name asc
          `;

      let verified = 0;
      let failed = 0;
      const errors: string[] = [];
      const updatedSources: JobSource[] = [];

      for (const row of rows) {
        const result = await verifySource(toJobSourceRecord(row));

        await sql`
          update job_sources
          set
            verification_status = ${result.verificationStatus ?? "verification_failed"},
            verification_error = ${result.verificationError ?? null},
            last_verified_at = now(),
            updated_at = now()
          where id = ${row.id}
        `;

        const refreshedRows = await sql<JobSourceRow[]>`
          select *
          from job_sources
          where id = ${row.id}
          limit 1
        `;

        if (result.verificationStatus === "verified") {
          verified += 1;
        } else {
          failed += 1;
          if (result.verificationError) {
            errors.push(`${row.company_name}: ${result.verificationError}`);
          }
        }

        if (refreshedRows[0]) {
          updatedSources.push(mapJobSource(refreshedRows[0]));
        }
      }

      return {
        verifiedCount: verified,
        failedCount: failed,
        errors,
        sources: updatedSources,
      };
    },

    /** Runs connector sync, dedupe, and lifecycle transitions under a global advisory lock. */
    async runSync(triggeredBy = "manual"): Promise<JobSyncRunSummary> {
      await ensureSeedSources(sql);

      const lockAcquired = await acquireJobSyncLock(sql);

      if (!lockAcquired) {
        throw createServiceError({
          statusCode: 409,
          code: API_ERROR_CODES.INTERNAL_SERVER_ERROR,
          message: "A job sync run is already in progress.",
        });
      }

      const summary = createEmptySyncSummary(triggeredBy);

      await sql`
        insert into job_sync_runs (
          id,
          status,
          triggered_by,
          started_at,
          summary
        )
        values (
          ${summary.id},
          ${summary.status},
          ${summary.triggeredBy},
          ${summary.startedAt},
          ${sql.json(summary as never)}
        )
      `;

      try {
        const sources = await sql<JobSourceRow[]>`
          select *
          from job_sources
          order by ats asc, company_name asc
        `;

        summary.sourcesDiscovered = sources.length;

        for (const sourceRow of sources) {
          const verification = await verifySource(toJobSourceRecord(sourceRow));

          await sql`
            update job_sources
            set
              verification_status = ${verification.verificationStatus ?? "verification_failed"},
              verification_error = ${verification.verificationError ?? null},
              last_verified_at = now(),
              updated_at = now()
            where id = ${sourceRow.id}
          `;

          if (verification.verificationStatus !== "verified") {
            summary.sourcesFailedVerification += 1;
            summary.jobsMarkedVerificationFailed += 1;
            summary.connectorHealth[sourceRow.ats] =
              (summary.connectorHealth[sourceRow.ats] ?? 0) + 0;

            const verificationFailedRows = await sql<NormalizedJobRow[]>`
              update normalized_jobs
              set
                lifecycle_state = 'verification_failed',
                updated_at = now()
              where source_id = ${sourceRow.id}
                and lifecycle_state <> 'verification_failed'
              returning *
            `;

            for (const failedRow of verificationFailedRows) {
              await insertLifecycleEvent(sql, {
                jobId: failedRow.id,
                sourceId: sourceRow.id,
                eventType: "verification_failed",
                previousState: failedRow.lifecycle_state,
                nextState: "verification_failed",
                details: {
                  verificationError:
                    verification.verificationError ??
                    "Source verification failed.",
                },
              });
            }

            if (verification.verificationError) {
              summary.errors.push(
                `${sourceRow.company_name}: ${verification.verificationError}`
              );
            }

            continue;
          }

          summary.sourcesVerified += 1;

          const jobs = await syncSource(toJobSourceRecord(sourceRow));
          summary.connectorHealth[sourceRow.ats] =
            (summary.connectorHealth[sourceRow.ats] ?? 0) + jobs.length;
          summary.jobsSeen += jobs.length;

          const seenExternalIds = new Set<string>();

          for (const connectorJob of jobs) {
            seenExternalIds.add(connectorJob.externalJobId);

            const snapshotId = randomUUID();
            const payloadHash = JSON.stringify(connectorJob.rawPayload);
            const rawSnapshotRows = await sql<RawJobSnapshotRow[]>`
              insert into raw_job_snapshots (
                id,
                source_id,
                external_job_id,
                canonical_url,
                payload,
                payload_hash,
                synced_at
              )
              values (
                ${snapshotId},
                ${sourceRow.id},
                ${connectorJob.externalJobId},
                ${connectorJob.canonicalUrl},
                ${sql.json(connectorJob.rawPayload as never)},
                ${payloadHash},
                now()
              )
              returning *
            `;
            const rawSnapshotRow = rawSnapshotRows[0];

            if (!rawSnapshotRow) {
              throw new Error("Failed to persist raw job snapshot.");
            }

            const existingRows = await sql<NormalizedJobRow[]>`
              select *
              from normalized_jobs
              where source_id = ${sourceRow.id}
                and external_job_id = ${connectorJob.externalJobId}
              limit 1
            `;
            const existingRow = existingRows[0];

            const normalizedRecord = createNormalizedJobRecord(
              toJobSourceRecord(sourceRow),
              connectorJob,
              existingRow
                ? {
                    id: existingRow.id,
                    sourceId: existingRow.source_id,
                    externalJobId: existingRow.external_job_id,
                    canonicalUrl: existingRow.canonical_url,
                    company: existingRow.company,
                    title: existingRow.title,
                    location: existingRow.location,
                    remoteMode:
                      existingRow.remote_mode as ConnectorJobRecord["remoteMode"],
                    employmentType:
                      existingRow.employment_type as ConnectorJobRecord["employmentType"],
                    postedAt: existingRow.posted_at?.toISOString() ?? null,
                    firstSeenAt: existingRow.first_seen_at.toISOString(),
                    lastSeenAt: existingRow.last_seen_at.toISOString(),
                    lifecycleState: existingRow.lifecycle_state,
                    searchText: existingRow.search_text,
                    metadata: existingRow.metadata,
                    latestSnapshotId: existingRow.latest_snapshot_id,
                  }
                : null
            );

            const transition = resolveLifecycleTransition(
              existingRow
                ? {
                    lifecycleState: existingRow.lifecycle_state,
                    fingerprint: existingRow.fingerprint,
                    canonicalUrl: existingRow.canonical_url,
                    title: existingRow.title,
                    location: existingRow.location,
                    remoteMode:
                      existingRow.remote_mode as ConnectorJobRecord["remoteMode"],
                    employmentType:
                      existingRow.employment_type as ConnectorJobRecord["employmentType"],
                  }
                : null,
              connectorJob
            );

            const metadata = {
              ...normalizedRecord.metadata,
              rawSnapshotId: rawSnapshotRow.id,
            };

            if (!existingRow) {
              summary.jobsInserted += 1;

              const insertedRows = await sql<NormalizedJobRow[]>`
                insert into normalized_jobs (
                  id,
                  source_id,
                  external_job_id,
                  canonical_url,
                  company,
                  title,
                  location,
                  remote_mode,
                  employment_type,
                  posted_at,
                  first_seen_at,
                  last_seen_at,
                  lifecycle_state,
                  fingerprint,
                  search_text,
                  latest_snapshot_id,
                  metadata,
                  created_at,
                  updated_at
                )
                values (
                  ${normalizedRecord.id},
                  ${sourceRow.id},
                  ${connectorJob.externalJobId},
                  ${normalizedRecord.canonicalUrl},
                  ${normalizedRecord.company},
                  ${normalizedRecord.title},
                  ${normalizedRecord.location},
                  ${normalizedRecord.remoteMode},
                  ${normalizedRecord.employmentType},
                  ${normalizedRecord.postedAt},
                  ${normalizedRecord.firstSeenAt},
                  ${normalizedRecord.lastSeenAt},
                  ${normalizedRecord.lifecycleState},
                  ${normalizedRecord.dedupeKey},
                  ${normalizedRecord.searchText},
                  ${rawSnapshotRow.id},
                  ${sql.json(metadata as never)},
                  now(),
                  now()
                )
                returning *
              `;

              if (insertedRows[0]) {
                await insertLifecycleEvent(sql, {
                  jobId: insertedRows[0].id,
                  sourceId: sourceRow.id,
                  eventType: "discovered",
                  nextState: insertedRows[0].lifecycle_state,
                  details: {
                    canonicalUrl: insertedRows[0].canonical_url,
                  },
                });
              }
            } else {
              summary.jobsUpdated += transition.wasUpdated ? 1 : 0;

              const updatedRows = await sql<NormalizedJobRow[]>`
                update normalized_jobs
                set
                  canonical_url = ${normalizedRecord.canonicalUrl},
                  company = ${normalizedRecord.company},
                  title = ${normalizedRecord.title},
                  location = ${normalizedRecord.location},
                  remote_mode = ${normalizedRecord.remoteMode},
                  employment_type = ${normalizedRecord.employmentType},
                  posted_at = ${normalizedRecord.postedAt},
                  last_seen_at = ${normalizedRecord.lastSeenAt},
                  lifecycle_state = ${transition.nextState},
                  fingerprint = ${normalizedRecord.dedupeKey},
                  search_text = ${normalizedRecord.searchText},
                  latest_snapshot_id = ${rawSnapshotRow.id},
                  metadata = ${sql.json(metadata as never)},
                  updated_at = now()
                where id = ${existingRow.id}
                returning *
              `;

              if (
                updatedRows[0] &&
                (transition.wasUpdated ||
                  transition.previousState !== transition.nextState)
              ) {
                await insertLifecycleEvent(sql, {
                  jobId: updatedRows[0].id,
                  sourceId: sourceRow.id,
                  eventType:
                    transition.previousState !== transition.nextState
                      ? "state_changed"
                      : "refreshed",
                  previousState: transition.previousState,
                  nextState: transition.nextState,
                  details: {
                    canonicalUrl: updatedRows[0].canonical_url,
                    wasUpdated: transition.wasUpdated,
                  },
                });
              }
            }
          }

          const seenIds = Array.from(seenExternalIds);

          if (seenIds.length > 0) {
            const staleRows = await sql<NormalizedJobRow[]>`
              update normalized_jobs
              set
                lifecycle_state = 'stale',
                updated_at = now()
              where source_id = ${sourceRow.id}
                and external_job_id <> all(${seenIds}::text[])
                and lifecycle_state = 'active'
              returning *
            `;

            summary.jobsMarkedStale += staleRows.length;

            for (const staleRow of staleRows) {
              await insertLifecycleEvent(sql, {
                jobId: staleRow.id,
                sourceId: sourceRow.id,
                eventType: "stale",
                previousState: "active",
                nextState: "stale",
                details: {
                  sourceId: sourceRow.id,
                },
              });
            }

            const closedRows = await sql<NormalizedJobRow[]>`
              update normalized_jobs
              set
                lifecycle_state = 'closed',
                updated_at = now()
              where source_id = ${sourceRow.id}
                and lifecycle_state = 'stale'
                and last_seen_at < now() - interval '7 days'
              returning *
            `;

            summary.jobsMarkedClosed += closedRows.length;

            for (const closedRow of closedRows) {
              await insertLifecycleEvent(sql, {
                jobId: closedRow.id,
                sourceId: sourceRow.id,
                eventType: "closed",
                previousState: "stale",
                nextState: "closed",
              });
            }
          }
        }

        summary.status = "completed";
        summary.finishedAt = new Date().toISOString();

        await sql`
          update job_sync_runs
          set
            status = ${summary.status},
            finished_at = ${summary.finishedAt},
            summary = ${sql.json(summary as never)}
          where id = ${summary.id}
        `;

        return summary;
      } catch (error) {
        summary.status = "failed";
        summary.finishedAt = new Date().toISOString();
        summary.errors.push(
          error instanceof Error ? error.message : "Unknown sync failure."
        );

        await sql`
          update job_sync_runs
          set
            status = ${summary.status},
            finished_at = ${summary.finishedAt},
            summary = ${sql.json(summary as never)},
            error_message = ${summary.errors.join("\n")}
          where id = ${summary.id}
        `;

        throw error;
      } finally {
        await releaseJobSyncLock(sql);
      }
    },

    /** Searches normalized jobs using Postgres full-text and trigram matching. */
    async searchJobs(
      filters: JobSearchFilters
    ): Promise<JobSearchResponseData> {
      await ensureSeedSources(sql);

      const page = parsePositiveInt(filters.page?.toString(), 1);
      const pageSize = Math.min(
        parsePositiveInt(filters.pageSize?.toString(), DEFAULT_PAGE_SIZE),
        MAX_PAGE_SIZE
      );
      const offset = (page - 1) * pageSize;
      const normalizedFilters: JobSearchFilters = {
        ...filters,
        ats: normalizeListInput(filters.ats) as AtsVendor[],
        remoteModes: normalizeListInput(
          filters.remoteModes
        ) as JobSearchFilters["remoteModes"],
        employmentTypes: normalizeListInput(
          filters.employmentTypes
        ) as JobSearchFilters["employmentTypes"],
        page,
        pageSize,
      };
      const { whereClause, params } = buildSearchQuery(normalizedFilters);
      const countQuery = `
        select count(*)::int as total
        from normalized_jobs j
        join job_sources s on s.id = j.source_id
        left join user_job_states u on u.job_id = j.id
        ${whereClause}
      `;
      const listQuery = `
        select
          j.*,
          u.job_id as user_job_id,
          u.ignored,
          u.saved,
          u.applied,
          u.application_status,
          u.notes,
          u.updated_at as user_updated_at
        from normalized_jobs j
        join job_sources s on s.id = j.source_id
        left join user_job_states u on u.job_id = j.id
        ${whereClause}
        order by
          case
            when j.lifecycle_state = 'active' then 0
            when j.lifecycle_state = 'stale' then 1
            when j.lifecycle_state = 'verification_failed' then 2
            else 3
          end asc,
          coalesce(j.posted_at, j.last_seen_at) desc,
          j.company asc,
          j.title asc
        limit $${params.length + 1}
        offset $${params.length + 2}
      `;

      const countRows = await sql.unsafe<{ total: number }[]>(
        countQuery,
        params
      );
      const dataRows = await sql.unsafe<
        Array<
          NormalizedJobRow & {
            user_job_id: string | null;
            ignored: boolean | null;
            saved: boolean | null;
            applied: boolean | null;
            application_status: JobApplicationStatus | null;
            notes: string | null;
            user_updated_at: Date | null;
          }
        >
      >(listQuery, [...params, pageSize, offset]);

      const items = dataRows.map((row) =>
        mapNormalizedJob(
          row,
          row.user_job_id
            ? {
                job_id: row.user_job_id,
                ignored: row.ignored ?? false,
                saved: row.saved ?? false,
                applied: row.applied ?? false,
                application_status: row.application_status ?? "not_started",
                notes: row.notes ?? "",
                updated_at: row.user_updated_at ?? new Date(0),
              }
            : null
        )
      );

      return {
        items,
        total: countRows[0]?.total ?? 0,
        page,
        pageSize,
      };
    },

    /** Fetches a full job detail record including source, history, and latest snapshot. */
    async getJobDetail(jobId: string): Promise<JobDetail> {
      const jobRows = await sql<NormalizedJobRow[]>`
        select *
        from normalized_jobs
        where id = ${jobId}
        limit 1
      `;
      const jobRow = jobRows[0];

      if (!jobRow) {
        throw createServiceError({
          statusCode: 404,
          code: API_ERROR_CODES.ROUTE_NOT_FOUND,
          message: "Job not found.",
        });
      }

      const [sourceRows, userStateRows, snapshotRows, lifecycleRows] =
        await Promise.all([
          sql<JobSourceRow[]>`
            select *
            from job_sources
            where id = ${jobRow.source_id}
            limit 1
          `,
          sql<UserJobStateRow[]>`
            select *
            from user_job_states
            where job_id = ${jobId}
            limit 1
          `,
          sql<RawJobSnapshotRow[]>`
            select *
            from raw_job_snapshots
            where id = ${jobRow.latest_snapshot_id}
            limit 1
          `,
          sql<JobLifecycleEventRow[]>`
            select *
            from job_lifecycle_events
            where job_id = ${jobId}
            order by occurred_at desc
          `,
        ]);

      return {
        job: mapNormalizedJob(jobRow, userStateRows[0]),
        source: sourceRows[0] ? mapJobSource(sourceRows[0]) : null,
        latestSnapshot: snapshotRows[0]
          ? mapRawJobSnapshot(snapshotRows[0])
          : null,
        lifecycleEvents: lifecycleRows.map(mapLifecycleEvent),
      };
    },

    /** Upserts the local single-user tracker state for a job. */
    async updateUserJobState(
      jobId: string,
      input: UpdateUserJobStateInput
    ): Promise<UserJobState> {
      const jobRows = await sql<NormalizedJobRow[]>`
        select *
        from normalized_jobs
        where id = ${jobId}
        limit 1
      `;

      if (!jobRows[0]) {
        throw createServiceError({
          statusCode: 404,
          code: API_ERROR_CODES.ROUTE_NOT_FOUND,
          message: "Job not found.",
        });
      }

      const existingRows = await sql<UserJobStateRow[]>`
        select *
        from user_job_states
        where job_id = ${jobId}
        limit 1
      `;
      const existingRow = existingRows[0];

      const nextState = {
        ignored: input.ignored ?? existingRow?.ignored ?? false,
        saved: input.saved ?? existingRow?.saved ?? false,
        applied: input.applied ?? existingRow?.applied ?? false,
        applicationStatus:
          input.applicationStatus ??
          existingRow?.application_status ??
          ("not_started" satisfies JobApplicationStatus),
        notes: input.notes ?? existingRow?.notes ?? "",
      };

      const rows = await sql<UserJobStateRow[]>`
        insert into user_job_states (
          job_id,
          ignored,
          saved,
          applied,
          application_status,
          notes,
          updated_at
        )
        values (
          ${jobId},
          ${nextState.ignored},
          ${nextState.saved},
          ${nextState.applied},
          ${nextState.applicationStatus},
          ${nextState.notes},
          now()
        )
        on conflict (job_id) do update
        set
          ignored = excluded.ignored,
          saved = excluded.saved,
          applied = excluded.applied,
          application_status = excluded.application_status,
          notes = excluded.notes,
          updated_at = now()
        returning *
      `;

      return mapUserJobState(rows[0]);
    },

    /** Clears the application tracker state but preserves the underlying job listing. */
    async resetUserJobApplication(jobId: string): Promise<UserJobState> {
      const rows = await sql<UserJobStateRow[]>`
        insert into user_job_states (
          job_id,
          ignored,
          saved,
          applied,
          application_status,
          notes,
          updated_at
        )
        values (
          ${jobId},
          false,
          false,
          false,
          'not_started',
          '',
          now()
        )
        on conflict (job_id) do update
        set
          ignored = false,
          saved = false,
          applied = false,
          application_status = 'not_started',
          notes = '',
          updated_at = now()
        returning *
      `;

      return mapUserJobState(rows[0]);
    },

    /** Fetches the single-user preference profile. */
    async getUserPreferences(): Promise<JobUserPreferences> {
      const rows = await sql<UserPreferencesRow[]>`
        select *
        from job_user_preferences
        where id = ${DEFAULT_USER_PREFERENCES_ID}
        limit 1
      `;

      return mapPreferences(rows[0]);
    },

    /** Upserts the single-user preference profile. */
    async updateUserPreferences(
      input: Partial<JobUserPreferences>
    ): Promise<JobUserPreferences> {
      const currentRows = await sql<UserPreferencesRow[]>`
        select *
        from job_user_preferences
        where id = ${DEFAULT_USER_PREFERENCES_ID}
        limit 1
      `;
      const currentRow = currentRows[0];

      const nextPreferences = {
        keywords: input.keywords ?? currentRow?.keywords ?? [],
        preferredLocations:
          input.preferredLocations ?? currentRow?.preferred_locations ?? [],
        remoteModes:
          input.remoteModes ??
          (currentRow?.remote_modes as JobUserPreferences["remoteModes"]) ??
          [],
        employmentTypes:
          input.employmentTypes ??
          (currentRow?.employment_types as JobUserPreferences["employmentTypes"]) ??
          [],
      };

      const rows = await sql<UserPreferencesRow[]>`
        insert into job_user_preferences (
          id,
          keywords,
          preferred_locations,
          remote_modes,
          employment_types,
          updated_at
        )
        values (
          ${DEFAULT_USER_PREFERENCES_ID},
          ${nextPreferences.keywords},
          ${nextPreferences.preferredLocations},
          ${nextPreferences.remoteModes},
          ${nextPreferences.employmentTypes},
          now()
        )
        on conflict (id) do update
        set
          keywords = excluded.keywords,
          preferred_locations = excluded.preferred_locations,
          remote_modes = excluded.remote_modes,
          employment_types = excluded.employment_types,
          updated_at = now()
        returning *
      `;

      return mapPreferences(rows[0]);
    },
  };
}
