/**
 * @file packages/jobs-domain/src/index.ts
 * @author Guy Romelle Magayano
 * @description Core types and normalization utilities for the jobs platform domain.
 */

import { createHash } from "node:crypto";

export type AtsVendor = "ashby" | "greenhouse" | "lever" | "workday";
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
export type JobSourceVerificationStatus =
  | "pending"
  | "verified"
  | "verification_failed";

export type JobSourceRecord = {
  ats: AtsVendor;
  boardUrl: string;
  companyName: string;
  id: string;
  isSeed?: boolean;
  lastVerifiedAt?: string | null;
  metadata?: Record<string, unknown>;
  verificationError?: string;
  verificationStatus?: JobSourceVerificationStatus;
};

export type ConnectorJobRecord = {
  canonicalUrl: string;
  employmentType: JobEmploymentType;
  externalJobId: string;
  location: string;
  metadata?: Record<string, unknown>;
  postedAt: string | null;
  rawPayload: Record<string, unknown>;
  remoteMode: JobRemoteMode;
  sourceAts: AtsVendor;
  summary: string;
  title: string;
};

export type NormalizedJobRecord = ConnectorJobRecord & {
  company: string;
  dedupeKey: string;
  firstSeenAt: string;
  id: string;
  lastSeenAt: string;
  latestSnapshotId?: string | null;
  lifecycleState: JobLifecycleState;
  searchText: string;
  sourceId: string;
};

export type ExistingNormalizedJobShape = {
  canonicalUrl: string;
  employmentType: JobEmploymentType;
  fingerprint?: string;
  firstSeenAt?: string;
  id?: string;
  lifecycleState: JobLifecycleState;
  location: string;
  metadata?: Record<string, unknown>;
  remoteMode: JobRemoteMode;
  title: string;
};

export type LifecycleTransitionResult = {
  didChange: boolean;
  nextState: JobLifecycleState;
  previousState: JobLifecycleState | null;
  wasUpdated: boolean;
};

type LegacyLifecycleInput = {
  previousState: JobLifecycleState;
  seenInLatestSync: boolean;
  sourceVerified: boolean;
};

type LegacyNormalizedJobInput = {
  canonicalUrl: string;
  company: string;
  employmentType: JobEmploymentType;
  externalJobId: string;
  firstSeenAt: string;
  lastSeenAt: string;
  lifecycleState?: JobLifecycleState;
  location: string;
  metadata?: Record<string, unknown>;
  postedAt: string | null;
  remoteMode: JobRemoteMode;
  sourceAts: AtsVendor;
  sourceId: string;
  summary: string;
  title: string;
};

const REMOTE_KEYWORDS = [
  "distributed",
  "hybrid",
  "remote",
  "telecommute",
  "work from home",
  "wfh",
];
const CONTRACT_KEYWORDS = ["contract", "freelance", "consultant", "temporary"];
const FULL_TIME_KEYWORDS = ["full time", "full-time", "permanent"];
const PART_TIME_KEYWORDS = ["part time", "part-time"];
const INTERNSHIP_KEYWORDS = ["apprentice", "intern", "residency"];

/** Normalizes a string for fuzzy matching and stable hashing. */
export function normalizeText(value: string | null | undefined): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Builds a canonical SHA-256 hash from the provided stable text input. */
export function hashText(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Builds the canonical URL used to deduplicate jobs across sync runs. */
export function createCanonicalUrl(value: string): string {
  try {
    const url = new URL(value);
    url.hash = "";
    url.search = "";

    return url.toString().replace(/\/$/, "");
  } catch {
    return value.trim();
  }
}

/** Builds the stable dedupe key for clustering repeated or mirrored postings. */
export function buildJobFingerprint(input: {
  canonicalUrl: string;
  company: string;
  location: string;
  title: string;
}): string {
  const normalizedParts = [
    createCanonicalUrl(input.canonicalUrl),
    normalizeText(input.company),
    normalizeText(input.title),
    normalizeText(input.location),
  ];

  return hashText(normalizedParts.join("|"));
}

/** Infers a normalized remote mode from raw ATS location labels. */
export function inferRemoteMode(value: string): JobRemoteMode {
  const normalized = normalizeText(value);

  if (!normalized) {
    return "unknown";
  }

  if (normalized.includes("hybrid")) {
    return "hybrid";
  }

  if (REMOTE_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "remote";
  }

  return "on_site";
}

/** Normalizes job employment type values from connector-specific labels. */
export function normalizeEmploymentType(value: string): JobEmploymentType {
  const normalized = normalizeText(value);

  if (!normalized) {
    return "unknown";
  }

  if (INTERNSHIP_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "internship";
  }

  if (PART_TIME_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "part_time";
  }

  if (CONTRACT_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "contract";
  }

  if (FULL_TIME_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return "full_time";
  }

  return "unknown";
}

/** Builds the canonical search text persisted for trigram and tsvector ranking. */
export function buildSearchText(input: {
  company: string;
  location: string;
  summary: string;
  title: string;
}): string {
  return [input.company, input.title, input.location, input.summary]
    .map((value) => value.trim())
    .filter(Boolean)
    .join(" \n");
}

/** Builds a stable persisted identifier for normalized jobs. */
function createNormalizedJobId(
  sourceId: string,
  externalJobId: string
): string {
  return `job-${hashText(`${sourceId}:${externalJobId}`)}`;
}

export function createNormalizedJobRecord(
  input: LegacyNormalizedJobInput
): NormalizedJobRecord;
export function createNormalizedJobRecord(
  source: JobSourceRecord,
  job: ConnectorJobRecord,
  existing?: Partial<NormalizedJobRecord> | null
): NormalizedJobRecord;
/** Creates the normalized job payload persisted by the API. */
export function createNormalizedJobRecord(
  inputOrSource: LegacyNormalizedJobInput | JobSourceRecord,
  maybeJob?: ConnectorJobRecord,
  maybeExisting?: Partial<NormalizedJobRecord> | null
): NormalizedJobRecord {
  if (!maybeJob) {
    const input = inputOrSource as LegacyNormalizedJobInput;
    const canonicalUrl = createCanonicalUrl(input.canonicalUrl);

    return {
      canonicalUrl,
      company: input.company,
      dedupeKey: buildJobFingerprint({
        canonicalUrl,
        company: input.company,
        location: input.location,
        title: input.title,
      }),
      employmentType: input.employmentType,
      externalJobId: input.externalJobId,
      firstSeenAt: input.firstSeenAt,
      id: createNormalizedJobId(input.sourceId, input.externalJobId),
      lastSeenAt: input.lastSeenAt,
      lifecycleState: input.lifecycleState ?? "active",
      location: input.location,
      metadata: input.metadata ?? {},
      postedAt: input.postedAt,
      rawPayload: input.metadata ?? {},
      remoteMode: input.remoteMode,
      searchText: buildSearchText(input),
      sourceAts: input.sourceAts,
      sourceId: input.sourceId,
      summary: input.summary,
      title: input.title,
    };
  }

  const source = inputOrSource as JobSourceRecord;
  const job = maybeJob;
  const existing = maybeExisting ?? null;
  const canonicalUrl = createCanonicalUrl(job.canonicalUrl);
  const firstSeenAt = existing?.firstSeenAt ?? new Date().toISOString();
  const lastSeenAt = new Date().toISOString();

  return {
    ...job,
    canonicalUrl,
    company: source.companyName,
    dedupeKey: buildJobFingerprint({
      canonicalUrl,
      company: source.companyName,
      location: job.location,
      title: job.title,
    }),
    firstSeenAt,
    id: existing?.id ?? createNormalizedJobId(source.id, job.externalJobId),
    lastSeenAt,
    latestSnapshotId: existing?.latestSnapshotId ?? null,
    lifecycleState: existing?.lifecycleState === "closed" ? "active" : "active",
    searchText: buildSearchText({
      company: source.companyName,
      location: job.location,
      summary: job.summary,
      title: job.title,
    }),
    sourceId: source.id,
  };
}

export function resolveLifecycleTransition(
  input: LegacyLifecycleInput
): LifecycleTransitionResult;
export function resolveLifecycleTransition(
  existing: ExistingNormalizedJobShape | null,
  incoming: ConnectorJobRecord
): LifecycleTransitionResult;
/** Determines the next lifecycle state for an existing job after a sync result. */
export function resolveLifecycleTransition(
  inputOrExisting: LegacyLifecycleInput | ExistingNormalizedJobShape | null,
  maybeIncoming?: ConnectorJobRecord
): LifecycleTransitionResult {
  if (!maybeIncoming) {
    const input = inputOrExisting as LegacyLifecycleInput;

    if (!input.sourceVerified) {
      return {
        didChange: input.previousState !== "verification_failed",
        nextState: "verification_failed",
        previousState: input.previousState,
        wasUpdated: false,
      };
    }

    if (input.seenInLatestSync) {
      return {
        didChange: input.previousState !== "active",
        nextState: "active",
        previousState: input.previousState,
        wasUpdated: false,
      };
    }

    if (input.previousState === "closed") {
      return {
        didChange: false,
        nextState: "closed",
        previousState: input.previousState,
        wasUpdated: false,
      };
    }

    return {
      didChange: input.previousState !== "stale",
      nextState: "stale",
      previousState: input.previousState,
      wasUpdated: false,
    };
  }

  const existing = inputOrExisting as ExistingNormalizedJobShape | null;

  if (!existing) {
    return {
      didChange: true,
      nextState: "active",
      previousState: null,
      wasUpdated: true,
    };
  }

  const nextCanonicalUrl = createCanonicalUrl(maybeIncoming.canonicalUrl);
  const wasUpdated =
    createCanonicalUrl(existing.canonicalUrl) !== nextCanonicalUrl ||
    normalizeText(existing.title) !== normalizeText(maybeIncoming.title) ||
    normalizeText(existing.location) !==
      normalizeText(maybeIncoming.location) ||
    existing.remoteMode !== maybeIncoming.remoteMode ||
    existing.employmentType !== maybeIncoming.employmentType;

  return {
    didChange: wasUpdated || existing.lifecycleState !== "active",
    nextState: "active",
    previousState: existing.lifecycleState,
    wasUpdated,
  };
}
