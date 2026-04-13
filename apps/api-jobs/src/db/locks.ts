/**
 * @file apps/api-jobs/src/db/locks.ts
 * @author Guy Romelle Magayano
 * @description Advisory locking helpers for scheduled job sync coordination.
 */

import type { Sql } from "postgres";

const JOB_SYNC_LOCK_KEY = 9_114_262;

/** Attempts to acquire the global sync advisory lock. */
export async function acquireJobSyncLock(sql: Sql): Promise<boolean> {
  const rows = await sql<{ acquired: boolean }[]>`
    select pg_try_advisory_lock(${JOB_SYNC_LOCK_KEY}) as acquired
  `;

  return rows[0]?.acquired ?? false;
}

/** Releases the global sync advisory lock. */
export async function releaseJobSyncLock(sql: Sql): Promise<void> {
  await sql`
    select pg_advisory_unlock(${JOB_SYNC_LOCK_KEY})
  `;
}
