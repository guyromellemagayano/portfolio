/**
 * @file apps/jobs/src/app/sources/page.tsx
 * @author Guy Romelle Magayano
 * @description Source registry and connector health page.
 */

import { fetchJobSources, fetchSyncStatus } from "@jobs/lib/api";

export default async function SourcesPage() {
  const [sources, syncStatus] = await Promise.all([
    fetchJobSources(),
    fetchSyncStatus(),
  ]);

  return (
    <section
      aria-label="Source registry"
      className="grid gap-8"
      role="region"
    >
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Source registry
        </h1>
        <p className="text-sm text-zinc-600">
          Curated ATS board roots, verification state, and connector throughput.
        </p>
      </div>
      <section
        aria-label="Sync summary"
        className="grid gap-3 rounded-[2rem] border border-zinc-200 bg-white p-6 lg:grid-cols-4"
        role="region"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Sources discovered
          </p>
          <p className="mt-1 text-3xl font-semibold text-zinc-950">
            {syncStatus?.sourcesDiscovered ?? sources.length}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Sources verified
          </p>
          <p className="mt-1 text-3xl font-semibold text-zinc-950">
            {syncStatus?.sourcesVerified ?? 0}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Verification failures
          </p>
          <p className="mt-1 text-3xl font-semibold text-zinc-950">
            {syncStatus?.sourcesFailedVerification ?? 0}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Jobs seen in latest run
          </p>
          <p className="mt-1 text-3xl font-semibold text-zinc-950">
            {syncStatus?.jobsSeen ?? 0}
          </p>
        </div>
      </section>
      <div className="grid gap-4">
        {sources.map((source) => (
          <article
            aria-labelledby={`source-${source.id}-title`}
            className="grid gap-3 rounded-[2rem] border border-zinc-200 bg-white p-6"
            key={source.id}
            role="article"
          >
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {source.ats}
                </p>
                <h2
                  className="text-2xl font-semibold tracking-tight text-zinc-950"
                  id={`source-${source.id}-title`}
                >
                  {source.companyName}
                </h2>
              </div>
              <div className="rounded-full border border-zinc-300 px-3 py-2 text-sm text-zinc-700">
                {source.verificationStatus}
              </div>
            </div>
            <p className="text-sm text-zinc-600">
              Last verified:{" "}
              {source.lastVerifiedAt
                ? new Date(source.lastVerifiedAt).toLocaleString()
                : "Never"}
            </p>
            <a
              className="break-all text-sm text-zinc-700 underline decoration-zinc-300 underline-offset-4"
              href={source.boardUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {source.boardUrl}
            </a>
            {source.verificationError ? (
              <p className="text-sm text-rose-700">{source.verificationError}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
