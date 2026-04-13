/**
 * @file packages/jobs-connectors/src/index.ts
 * @author Guy Romelle Magayano
 * @description ATS connector implementations, verification helpers, and curated seed sources for the jobs platform.
 */

import {
  type AtsVendor,
  createCanonicalUrl,
  inferRemoteMode,
  normalizeEmploymentType,
  type ConnectorJobRecord,
  type JobSourceRecord,
} from "@portfolio/jobs-domain";

export type SourceVerificationResult = {
  error: string | null;
  metadata: Record<string, unknown>;
  verified: boolean;
  verificationError?: string;
  verificationStatus?: "verified" | "verification_failed";
};

export type AtsConnector = {
  syncSource: (source: JobSourceRecord) => Promise<ConnectorJobRecord[]>;
  verifySource: (source: JobSourceRecord) => Promise<SourceVerificationResult>;
};

const ASHBY_OPERATION_NAME = "ApiJobBoardWithTeams";
const ASHBY_QUERY = `
  query ApiJobBoardWithTeams($organizationHostedJobsPageName: String!) {
    jobBoard: jobBoardWithTeams(
      organizationHostedJobsPageName: $organizationHostedJobsPageName
    ) {
      jobPostings {
        id
        title
        locationName
        employmentType
        workplaceType
      }
    }
  }
`;

export const curatedSeedSources: JobSourceRecord[] = [
  {
    ats: "workday",
    boardUrl: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite",
    companyName: "NVIDIA",
    id: "seed-workday-nvidia",
  },
  {
    ats: "greenhouse",
    boardUrl: "https://boards.greenhouse.io/notion",
    companyName: "Notion",
    id: "seed-greenhouse-notion",
  },
  {
    ats: "lever",
    boardUrl: "https://jobs.lever.co/figma",
    companyName: "Figma",
    id: "seed-lever-figma",
  },
  {
    ats: "ashby",
    boardUrl: "https://jobs.ashbyhq.com/linear",
    companyName: "Linear",
    id: "seed-ashby-linear",
  },
];

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

function getPathSegments(url: URL): string[] {
  return url.pathname
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function parseWorkdaySource(source: JobSourceRecord): {
  apiUrl: string;
  boardBaseUrl: string;
} {
  const url = new URL(source.boardUrl);
  const pathSegments = getPathSegments(url);
  const firstSegment = pathSegments[0] ?? "";
  const localeSegment =
    pathSegments.length > 1 && /^[a-z]{2}-[A-Z]{2}$/i.test(firstSegment)
      ? firstSegment
      : null;
  const boardSegment = localeSegment ? pathSegments[1] : pathSegments[0];

  if (!boardSegment) {
    throw new Error(
      `Unable to derive Workday board segment from ${source.boardUrl}`
    );
  }

  const tenant = url.hostname.split(".")[0] ?? "";

  if (!tenant) {
    throw new Error(`Unable to derive Workday tenant from ${source.boardUrl}`);
  }

  return {
    apiUrl: `${url.origin}/wday/cxs/${tenant}/${boardSegment}/jobs`,
    boardBaseUrl: localeSegment
      ? `${url.origin}/${localeSegment}/${boardSegment}`
      : `${url.origin}/${boardSegment}`,
  };
}

function parseGreenhouseBoardToken(source: JobSourceRecord): string {
  const url = new URL(source.boardUrl);
  const token = getPathSegments(url).pop();

  if (!token) {
    throw new Error(
      `Unable to derive Greenhouse board token from ${source.boardUrl}`
    );
  }

  return token;
}

function parseLeverBoardToken(source: JobSourceRecord): string {
  const url = new URL(source.boardUrl);
  const token = getPathSegments(url).pop();

  if (!token) {
    throw new Error(
      `Unable to derive Lever board token from ${source.boardUrl}`
    );
  }

  return token;
}

function parseAshbyBoardToken(source: JobSourceRecord): string {
  const url = new URL(source.boardUrl);
  const token = getPathSegments(url).pop();

  if (!token) {
    throw new Error(
      `Unable to derive Ashby board token from ${source.boardUrl}`
    );
  }

  return token;
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

async function verifyBySync(
  source: JobSourceRecord,
  syncSource: (source: JobSourceRecord) => Promise<ConnectorJobRecord[]>
): Promise<SourceVerificationResult> {
  try {
    const jobs = await syncSource(source);

    return {
      error: null,
      metadata: {
        discoveredJobs: jobs.length,
      },
      verified: true,
      verificationError: undefined,
      verificationStatus: "verified",
    };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unknown verification error",
      metadata: {},
      verified: false,
      verificationError:
        error instanceof Error ? error.message : "Unknown verification error",
      verificationStatus: "verification_failed",
    };
  }
}

async function syncGreenhouseSource(
  source: JobSourceRecord
): Promise<ConnectorJobRecord[]> {
  const boardToken = parseGreenhouseBoardToken(source);
  const response = await fetch(
    `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs`
  );
  const payload = await parseJsonResponse<{
    jobs: Array<{
      absolute_url?: string;
      data_compliance?: unknown;
      id: number | string;
      internal_job_id?: number | string;
      location?: { name?: string };
      metadata?: unknown[];
      title: string;
      updated_at?: string;
    }>;
  }>(response);

  return payload.jobs.map((job) => ({
    canonicalUrl: createCanonicalUrl(
      job.absolute_url || `${source.boardUrl}/jobs/${job.id}`
    ),
    employmentType: "unknown",
    externalJobId: String(job.id),
    location: job.location?.name?.trim() || "Unknown",
    metadata: {
      dataCompliance: job.data_compliance ?? null,
      metadata: job.metadata ?? [],
    },
    postedAt: job.updated_at ?? null,
    rawPayload: job as unknown as Record<string, unknown>,
    remoteMode: inferRemoteMode(job.location?.name ?? ""),
    sourceAts: "greenhouse",
    summary: "",
    title: job.title.trim(),
  }));
}

async function syncLeverSource(
  source: JobSourceRecord
): Promise<ConnectorJobRecord[]> {
  const boardToken = parseLeverBoardToken(source);
  const response = await fetch(
    `https://api.lever.co/v0/postings/${boardToken}?mode=json`
  );
  const payload = await parseJsonResponse<
    Array<{
      categories?: {
        commitment?: string;
        location?: string;
        team?: string;
        workplaceType?: string;
      };
      descriptionPlain?: string;
      hostedUrl?: string;
      id: string;
      text: string;
      createdAt?: number;
    }>
  >(response);

  return payload.map((job) => ({
    canonicalUrl: createCanonicalUrl(
      job.hostedUrl || `${source.boardUrl}/${job.id}`
    ),
    employmentType: normalizeEmploymentType(job.categories?.commitment ?? ""),
    externalJobId: job.id,
    location: job.categories?.location?.trim() || "Unknown",
    metadata: {
      team: job.categories?.team ?? null,
      workplaceType: job.categories?.workplaceType ?? null,
    },
    postedAt: job.createdAt ? new Date(job.createdAt).toISOString() : null,
    rawPayload: job as unknown as Record<string, unknown>,
    remoteMode: inferRemoteMode(
      `${job.categories?.location ?? ""} ${job.categories?.workplaceType ?? ""}`
    ),
    sourceAts: "lever",
    summary: job.descriptionPlain?.trim() || "",
    title: job.text.trim(),
  }));
}

async function syncAshbySource(
  source: JobSourceRecord
): Promise<ConnectorJobRecord[]> {
  const boardToken = parseAshbyBoardToken(source);
  const response = await fetch(
    `https://jobs.ashbyhq.com/api/non-user-graphql?op=${ASHBY_OPERATION_NAME}`,
    {
      body: JSON.stringify({
        operationName: ASHBY_OPERATION_NAME,
        query: ASHBY_QUERY,
        variables: {
          organizationHostedJobsPageName: boardToken,
        },
      }),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    }
  );

  const payload = await parseJsonResponse<{
    data?: {
      jobBoard?: {
        jobPostings?: Array<{
          employmentType?: string;
          id: string;
          locationName?: string;
          title: string;
          workplaceType?: string;
        }>;
      };
    };
  }>(response);
  const jobPostings = payload.data?.jobBoard?.jobPostings ?? [];

  return jobPostings.map((job) => ({
    canonicalUrl: createCanonicalUrl(
      `${source.boardUrl}/${trimSlashes(job.id)}`
    ),
    employmentType: normalizeEmploymentType(job.employmentType ?? ""),
    externalJobId: job.id,
    location: job.locationName?.trim() || "Unknown",
    metadata: {
      workplaceType: job.workplaceType ?? null,
    },
    postedAt: null,
    rawPayload: job as unknown as Record<string, unknown>,
    remoteMode: inferRemoteMode(
      `${job.locationName ?? ""} ${job.workplaceType ?? ""}`
    ),
    sourceAts: "ashby",
    summary: "",
    title: job.title.trim(),
  }));
}

async function syncWorkdaySource(
  source: JobSourceRecord
): Promise<ConnectorJobRecord[]> {
  const { apiUrl, boardBaseUrl } = parseWorkdaySource(source);
  const jobs: ConnectorJobRecord[] = [];
  let offset = 0;
  let total = Number.POSITIVE_INFINITY;

  while (offset < total) {
    const response = await fetch(apiUrl, {
      body: JSON.stringify({
        appliedFacets: {},
        limit: 20,
        offset,
        searchText: "",
      }),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    const payload = await parseJsonResponse<{
      jobPostings?: Array<{
        bulletFields?: string[];
        externalPath?: string;
        jobDescription?: string;
        locationsText?: string;
        postedOn?: string;
        title: string;
      }>;
      total?: number;
    }>(response);
    const postings = payload.jobPostings ?? [];

    total = payload.total ?? postings.length;

    for (const job of postings) {
      jobs.push({
        canonicalUrl: createCanonicalUrl(
          `${boardBaseUrl}/${trimSlashes(job.externalPath ?? job.title)}`
        ),
        employmentType: normalizeEmploymentType(
          job.bulletFields?.join(" ") ?? ""
        ),
        externalJobId: trimSlashes(job.externalPath ?? job.title),
        location: job.locationsText?.trim() || "Unknown",
        metadata: {
          bulletFields: job.bulletFields ?? [],
        },
        postedAt: job.postedOn ?? null,
        rawPayload: job as unknown as Record<string, unknown>,
        remoteMode: inferRemoteMode(job.locationsText ?? ""),
        sourceAts: "workday",
        summary: job.jobDescription?.trim() || "",
        title: job.title.trim(),
      });
    }

    if (postings.length === 0) {
      break;
    }

    offset += postings.length;
  }

  return jobs;
}

const connectors: Record<AtsVendor, AtsConnector> = {
  ashby: {
    syncSource: syncAshbySource,
    verifySource: async (source) => verifyBySync(source, syncAshbySource),
  },
  greenhouse: {
    syncSource: syncGreenhouseSource,
    verifySource: async (source) => verifyBySync(source, syncGreenhouseSource),
  },
  lever: {
    syncSource: syncLeverSource,
    verifySource: async (source) => verifyBySync(source, syncLeverSource),
  },
  workday: {
    syncSource: syncWorkdaySource,
    verifySource: async (source) => verifyBySync(source, syncWorkdaySource),
  },
};

/** Resolves the connector implementation for the given ATS vendor. */
export function getConnector(ats: AtsVendor): AtsConnector {
  const connector = connectors[ats];

  if (!connector) {
    throw new Error(`Unsupported ATS connector: ${ats}`);
  }

  return connector;
}

/** Verifies an ATS source before it is used in a sync run. */
export async function verifySource(
  source: JobSourceRecord
): Promise<SourceVerificationResult> {
  return getConnector(source.ats).verifySource(source);
}

/** Pulls and normalizes all jobs from a single ATS source. */
export async function syncSource(
  source: JobSourceRecord
): Promise<ConnectorJobRecord[]> {
  return getConnector(source.ats).syncSource(source);
}
