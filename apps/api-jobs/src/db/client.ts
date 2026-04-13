/**
 * @file apps/api-jobs/src/db/client.ts
 * @author Guy Romelle Magayano
 * @description Postgres client lifecycle for the jobs API runtime.
 */

import postgres, { type Sql } from "postgres";

let sqlClient: Sql | null = null;

/** Creates or returns the singleton jobs Postgres client. */
export function getJobsSqlClient(databaseUrl: string): Sql {
  if (sqlClient) {
    return sqlClient;
  }

  sqlClient = postgres(databaseUrl, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
    transform: {
      undefined: null,
    },
  });

  return sqlClient;
}

/** Closes the singleton jobs Postgres client. */
export async function closeJobsSqlClient(): Promise<void> {
  if (!sqlClient) {
    return;
  }

  await sqlClient.end({ timeout: 5 });
  sqlClient = null;
}
