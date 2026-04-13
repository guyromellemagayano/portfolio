/**
 * @file apps/api-jobs/src/db/migrate.ts
 * @author Guy Romelle Magayano
 * @description Lightweight SQL migration runner for the jobs API Postgres store.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Sql } from "postgres";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const migrationsDirectory = path.resolve(
  currentDirectory,
  "../../db/migrations"
);

/** Runs pending SQL migrations in filename order. */
export async function runJobsMigrations(sql: Sql): Promise<void> {
  await sql.unsafe(`
    create table if not exists schema_migrations (
      version text primary key,
      applied_at timestamptz not null default now()
    )
  `);

  const migrationFiles = (await readdir(migrationsDirectory))
    .filter((fileName) => fileName.endsWith(".sql"))
    .sort((left, right) => left.localeCompare(right));

  for (const migrationFile of migrationFiles) {
    const existing = await sql<{ version: string }[]>`
      select version
      from schema_migrations
      where version = ${migrationFile}
      limit 1
    `;

    if (existing.length > 0) {
      continue;
    }

    const migrationPath = path.join(migrationsDirectory, migrationFile);
    const migrationSql = await readFile(migrationPath, "utf8");

    await sql.begin(async (transaction) => {
      await transaction.unsafe(migrationSql);
      await transaction`
        insert into schema_migrations (version)
        values (${migrationFile})
      `;
    });
  }
}
