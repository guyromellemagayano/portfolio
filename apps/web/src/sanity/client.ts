/**
 * @file apps/web/src/sanity/client.ts
 * @author Guy Romelle Magayano
 * @description Sanity client utilities for configuration checks and query execution.
 */

const DEFAULT_SANITY_API_VERSION = "2025-02-19";

type SanityQueryResponse<T> = {
  result?: T;
  error?: {
    description?: string;
  };
};

type SanityClientConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
};

function getSanityEnvVar(key: string): string {
  return globalThis?.process?.env?.[key]?.trim() ?? "";
}

export function getSanityConfig(): SanityClientConfig | null {
  const projectId = getSanityEnvVar("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = getSanityEnvVar("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion =
    getSanityEnvVar("NEXT_PUBLIC_SANITY_API_VERSION") ||
    DEFAULT_SANITY_API_VERSION;
  const token = getSanityEnvVar("SANITY_API_READ_TOKEN");

  if (!projectId || !dataset) {
    return null;
  }

  return {
    projectId,
    dataset,
    apiVersion,
    token: token || undefined,
  };
}

export function hasSanityConfig(): boolean {
  return getSanityConfig() !== null;
}

export async function fetchSanityQuery<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  const config = getSanityConfig();

  if (!config) {
    throw new Error(
      "Sanity configuration is missing. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET."
    );
  }

  const { projectId, dataset, apiVersion, token } = config;

  const queryUrl = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`
  );

  queryUrl.searchParams.set("query", query);
  queryUrl.searchParams.set("perspective", "published");

  if (Object.keys(params).length > 0) {
    queryUrl.searchParams.set("params", JSON.stringify(params));
  }

  const response = await fetch(queryUrl.toString(), {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Sanity query failed with status ${response.status}.`);
  }

  const json = (await response.json()) as SanityQueryResponse<T>;

  if (json.error) {
    throw new Error(json.error.description || "Sanity query failed.");
  }

  if (json.result === undefined) {
    throw new Error("Sanity query response is missing result.");
  }

  return json.result;
}
