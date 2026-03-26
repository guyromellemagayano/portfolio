/**
 * @file apps/opsdesk/src/app/_services/opsdesk-api.ts
 * @author Guy Romelle Magayano
 * @description Same-origin client helpers for the local OpsDesk backend.
 */

import type { OpsDeskRequest } from "../_data/opsdesk.data";

type OpsDeskHealthResponse = Readonly<{
  success: boolean;
  data: {
    status: string;
    database: string;
    mode: string;
  };
  meta: {
    correlationId: string;
  };
}>;

type OpsDeskRequestsResponse = Readonly<{
  success: boolean;
  data: ReadonlyArray<{
    id: string;
    requestNumber: string;
    title: string;
    requester: string;
    owningTeam: string;
    priority: OpsDeskRequest["priority"];
    status: OpsDeskRequest["status"];
    slaState: OpsDeskRequest["sla"];
    owner: string;
    age: string;
  }>;
  meta: {
    correlationId: string;
    mode: string;
    count: number;
    limit: number;
  };
}>;

export type OpsDeskBackendHealth = Readonly<{
  status: string;
  database: string;
  mode: string;
}>;

const OPSDESK_API_BASE_PATH = "/api-opsdesk";

/** Fetches local backend health for environment status and failure messaging. */
export async function fetchOpsDeskHealth(signal?: AbortSignal): Promise<OpsDeskBackendHealth> {
  const response = await fetch(`${OPSDESK_API_BASE_PATH}/v1/health`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
    signal,
  });
  const payload = (await parseJson(response)) as OpsDeskHealthResponse;

  if (!response.ok || !payload.success) {
    throw new Error("OpsDesk backend health check failed.");
  }

  return payload.data;
}

/** Fetches the live request queue through the same-origin Vite proxy. */
export async function fetchOpsDeskRequests(
  limit: number,
  signal?: AbortSignal
): Promise<ReadonlyArray<OpsDeskRequest>> {
  const response = await fetch(`${OPSDESK_API_BASE_PATH}/v1/requests?limit=${limit}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
    signal,
  });
  const payload = (await parseJson(response)) as OpsDeskRequestsResponse;

  if (!response.ok || !payload.success) {
    throw new Error("OpsDesk request queue is unavailable.");
  }

  return payload.data.map((item) => ({
    id: item.id,
    requestNumber: item.requestNumber,
    title: item.title,
    requester: item.requester,
    team: item.owningTeam,
    priority: item.priority,
    status: item.status,
    age: item.age,
    sla: item.slaState,
    owner: item.owner,
  }));
}

async function parseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
