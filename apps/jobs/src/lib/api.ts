/**
 * @file apps/jobs/src/lib/api.ts
 * @author Guy Romelle Magayano
 * @description Jobs API client helpers for server and client components.
 */

import type {
  JobDetail,
  JobSearchFilters,
  JobSearchResponseData,
  JobSource,
  JobSyncRunSummary,
  JobUserPreferences,
  SourceVerificationSummary,
  UpdateUserJobStateInput,
  UserJobState,
} from "@portfolio/api-contracts";
import type { ApiEnvelope } from "@portfolio/api-contracts/http";

const DEFAULT_JOBS_API_URL = "http://127.0.0.1:5002";

/** Resolves the jobs API base URL for the current runtime. */
export function getJobsApiUrl(): string {
  return (
    process.env.JOBS_API_URL ||
    process.env.NEXT_PUBLIC_JOBS_API_URL ||
    DEFAULT_JOBS_API_URL
  ).replace(/\/$/, "");
}

/** Serializes jobs search filters into a query string. */
export function createJobsQueryString(filters: JobSearchFilters): string {
  const params = new URLSearchParams();

  if (filters.keyword) {
    params.set("keyword", filters.keyword);
  }

  for (const ats of filters.ats ?? []) {
    params.append("ats", ats);
  }

  if (filters.company) {
    params.set("company", filters.company);
  }

  if (filters.location) {
    params.set("location", filters.location);
  }

  for (const remoteMode of filters.remoteModes ?? []) {
    params.append("remoteModes", remoteMode);
  }

  for (const employmentType of filters.employmentTypes ?? []) {
    params.append("employmentTypes", employmentType);
  }

  if (filters.freshWithinHours) {
    params.set("freshWithinHours", String(filters.freshWithinHours));
  }

  if (filters.includeIgnored) {
    params.set("includeIgnored", "true");
  }

  if (filters.onlyApplied) {
    params.set("onlyApplied", "true");
  }

  if (filters.onlySaved) {
    params.set("onlySaved", "true");
  }

  if (filters.page) {
    params.set("page", String(filters.page));
  }

  if (filters.pageSize) {
    params.set("pageSize", String(filters.pageSize));
  }

  return params.toString();
}

/** Fetches an API envelope and unwraps successful responses. */
async function fetchEnvelope<T>(
  pathname: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${getJobsApiUrl()}${pathname}`, {
    ...init,
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const envelope = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !envelope.success) {
    const message =
      !envelope.success
        ? envelope.error.message
        : `Jobs API request failed with status ${response.status}.`;

    throw new Error(
      message
    );
  }

  return envelope.data;
}

/** Fetches search results from the jobs API. */
export async function fetchJobs(
  filters: JobSearchFilters
): Promise<JobSearchResponseData> {
  const query = createJobsQueryString(filters);

  return fetchEnvelope<JobSearchResponseData>(
    `/v1/jobs${query ? `?${query}` : ""}`
  );
}

/** Fetches a full job detail record. */
export async function fetchJobDetail(jobId: string): Promise<JobDetail> {
  return fetchEnvelope<JobDetail>(`/v1/jobs/${jobId}`);
}

/** Fetches the current source registry. */
export async function fetchJobSources(): Promise<JobSource[]> {
  return fetchEnvelope<JobSource[]>("/v1/job-sources");
}

/** Fetches the latest sync status. */
export async function fetchSyncStatus(): Promise<JobSyncRunSummary | null> {
  return fetchEnvelope<JobSyncRunSummary | null>("/v1/job-sync/status");
}

/** Fetches stored user preferences. */
export async function fetchPreferences(): Promise<JobUserPreferences> {
  return fetchEnvelope<JobUserPreferences>("/v1/job-preferences");
}

/** Updates single-user tracker state. */
export async function updateJobState(
  jobId: string,
  input: UpdateUserJobStateInput
): Promise<UserJobState> {
  return fetchEnvelope<UserJobState>(`/v1/jobs/${jobId}/state`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

/** Clears the local tracker state for a job. */
export async function resetJobState(jobId: string): Promise<UserJobState> {
  return fetchEnvelope<UserJobState>(`/v1/jobs/${jobId}/application`, {
    method: "DELETE",
  });
}

/** Triggers a manual sync run. */
export async function triggerSync(
  triggeredBy = "manual"
): Promise<JobSyncRunSummary> {
  return fetchEnvelope<JobSyncRunSummary>("/v1/job-sync/run", {
    method: "POST",
    body: JSON.stringify({
      triggeredBy,
    }),
  });
}

/** Triggers source verification. */
export async function verifySources(): Promise<SourceVerificationSummary> {
  return fetchEnvelope<SourceVerificationSummary>("/v1/job-sources/verify", {
    method: "POST",
    body: JSON.stringify({}),
  });
}

/** Updates single-user preference defaults. */
export async function updatePreferences(
  input: Partial<JobUserPreferences>
): Promise<JobUserPreferences> {
  return fetchEnvelope<JobUserPreferences>("/v1/job-preferences", {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}
