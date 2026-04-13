/**
 * @file packages/api-contracts/src/jobs/index.ts
 * @author Guy Romelle Magayano
 * @description Canonical route constants and payload contracts for the jobs platform API.
 */

import { API_VERSION_PREFIX } from "../http/routes";

export const JOBS_ROUTE_PREFIX = `${API_VERSION_PREFIX}/jobs`;
export const JOBS_ROUTE_LIST = JOBS_ROUTE_PREFIX;
export const JOBS_ROUTE_DETAIL_PATTERN = `${JOBS_ROUTE_PREFIX}/:id`;
export const JOBS_ROUTE_STATE_PATTERN = `${JOBS_ROUTE_PREFIX}/:id/state`;
export const JOBS_ROUTE_APPLICATION_RESET_PATTERN = `${JOBS_ROUTE_PREFIX}/:id/application`;
export const JOBS_ROUTE_SOURCES = `${API_VERSION_PREFIX}/job-sources`;
export const JOBS_ROUTE_SOURCES_VERIFY = `${JOBS_ROUTE_SOURCES}/verify`;
export const JOBS_ROUTE_SYNC_RUN = `${API_VERSION_PREFIX}/job-sync/run`;
export const JOBS_ROUTE_SYNC_STATUS = `${API_VERSION_PREFIX}/job-sync/status`;
export const JOBS_ROUTE_PREFERENCES = `${API_VERSION_PREFIX}/job-preferences`;

export type AtsVendor = "ashby" | "greenhouse" | "lever" | "workday";
export type JobSourceVerificationStatus =
  | "pending"
  | "verified"
  | "verification_failed";
export type JobRemoteMode = "hybrid" | "on_site" | "remote" | "unknown";
export type JobEmploymentType =
  | "contract"
  | "full_time"
  | "internship"
  | "part_time"
  | "temporary"
  | "unknown";
export type JobLifecycleState =
  | "active"
  | "closed"
  | "stale"
  | "verification_failed";
export type JobApplicationStatus =
  | "not_started"
  | "saved"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";
export type JobSyncRunStatus = "completed" | "failed" | "running";

export type JobSource = {
  ats: AtsVendor;
  boardUrl: string;
  companyName: string;
  createdAt: string;
  id: string;
  isSeed: boolean;
  lastVerifiedAt: string | null;
  updatedAt: string;
  verificationError?: string;
  verificationStatus: JobSourceVerificationStatus;
};

export type RawJobSnapshot = {
  canonicalUrl: string;
  externalJobId: string;
  id: string;
  payload: Record<string, unknown>;
  payloadHash: string;
  sourceId: string;
  syncedAt: string;
};

export type UserJobState = {
  applicationStatus: JobApplicationStatus;
  applied: boolean;
  ignored: boolean;
  notes: string;
  saved: boolean;
  updatedAt: string;
};

export type NormalizedJob = {
  canonicalUrl: string;
  company: string;
  employmentType: JobEmploymentType;
  firstSeenAt: string;
  id: string;
  lastSeenAt: string;
  lifecycleState: JobLifecycleState;
  location: string;
  metadata: Record<string, unknown>;
  postedAt: string | null;
  remoteMode: JobRemoteMode;
  sourceId: string;
  title: string;
  userState: UserJobState;
};

export type JobLifecycleEvent = {
  details: Record<string, unknown>;
  eventType: string;
  id: string;
  jobId: string;
  nextState: JobLifecycleState | null;
  occurredAt: string;
  previousState: JobLifecycleState | null;
  sourceId: string;
};

export type JobDetail = {
  job: NormalizedJob;
  latestSnapshot: RawJobSnapshot | null;
  lifecycleEvents: JobLifecycleEvent[];
  source: JobSource | null;
};

export type JobSearchFilters = {
  ats?: AtsVendor[];
  company?: string;
  employmentTypes?: JobEmploymentType[];
  freshWithinHours?: number;
  includeIgnored?: boolean;
  keyword?: string;
  location?: string;
  onlyApplied?: boolean;
  onlySaved?: boolean;
  page?: number;
  pageSize?: number;
  remoteModes?: JobRemoteMode[];
};

export type JobSearchResponseData = {
  items: NormalizedJob[];
  page: number;
  pageSize: number;
  total: number;
};

export type UpdateUserJobStateInput = {
  applicationStatus?: JobApplicationStatus;
  applied?: boolean;
  ignored?: boolean;
  notes?: string;
  saved?: boolean;
};

export type JobUserPreferences = {
  employmentTypes: JobEmploymentType[];
  keywords: string[];
  preferredLocations: string[];
  remoteModes: JobRemoteMode[];
  updatedAt: string;
};

export type JobSyncRunSummary = {
  connectorHealth: Record<string, number>;
  errors: string[];
  finishedAt: string | null;
  id: string;
  jobsInserted: number;
  jobsMarkedClosed: number;
  jobsMarkedStale: number;
  jobsMarkedVerificationFailed: number;
  jobsSeen: number;
  jobsUpdated: number;
  sourcesDiscovered: number;
  sourcesFailedVerification: number;
  sourcesVerified: number;
  startedAt: string;
  status: JobSyncRunStatus;
  triggeredBy: string;
};

export type SourceVerificationSummary = {
  errors: string[];
  failedCount: number;
  sources: JobSource[];
  verifiedCount: number;
};
