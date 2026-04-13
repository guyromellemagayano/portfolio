/**
 * @file apps/jobs-worker/src/index.ts
 * @author Guy Romelle Magayano
 * @description Scheduled worker entrypoint for periodic direct ATS sync triggers.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_JOBS_API_URL = "http://127.0.0.1:5002";
const DEFAULT_SYNC_INTERVAL_MS = 60 * 60 * 1000;

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRootDirectory = path.resolve(currentDirectory, "../../..");
const workspaceRootEnvLocalFile = path.join(
  workspaceRootDirectory,
  ".env.local"
);

if (existsSync(workspaceRootEnvLocalFile)) {
  process.loadEnvFile?.(workspaceRootEnvLocalFile);
}

/** Sleeps for the provided millisecond duration. */
function sleep(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

/** Parses the worker sync interval from process env. */
function getSyncIntervalMs(): number {
  const rawInterval = process.env.JOBS_SYNC_INTERVAL_MS?.trim() ?? "";
  const interval = Number.parseInt(rawInterval, 10);

  if (!Number.isFinite(interval) || interval < 30_000) {
    return DEFAULT_SYNC_INTERVAL_MS;
  }

  return interval;
}

/** Resolves the jobs API base URL for the worker process. */
function getJobsApiUrl(): string {
  return (
    process.env.JOBS_API_URL ||
    process.env.NEXT_PUBLIC_JOBS_API_URL ||
    DEFAULT_JOBS_API_URL
  ).replace(/\/$/, "");
}

/** Triggers a sync run through the jobs API. */
async function triggerSync(): Promise<void> {
  const response = await fetch(`${getJobsApiUrl()}/v1/job-sync/run`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      triggeredBy: "worker",
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Worker sync trigger failed with status ${response.status}.`
    );
  }
}

/** Starts the background sync loop using the shared jobs API. */
export async function startJobsWorker(): Promise<void> {
  for (;;) {
    try {
      await triggerSync();
    } catch (error) {
      console.error("[jobs-worker] sync trigger failed", error);
    }

    await sleep(getSyncIntervalMs());
  }
}

void startJobsWorker();
