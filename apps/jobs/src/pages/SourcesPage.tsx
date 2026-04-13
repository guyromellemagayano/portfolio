/**
 * @file apps/jobs/src/pages/SourcesPage.tsx
 * @author Guy Romelle Magayano
 * @description Source registry and connector health page.
 */

import { useEffect, useState } from "react";

import { fetchJobSources, fetchSyncStatus } from "@jobs/lib/api";

import type { JobSource, JobSyncRunSummary } from "@portfolio/api-contracts";

type SourcesPageProps = {
  refreshToken: number;
};

/** Renders the verified source registry and latest sync summary. */
export function SourcesPage({ refreshToken }: SourcesPageProps) {
  const [sources, setSources] = useState<JobSource[]>([]);
  const [syncStatus, setSyncStatus] = useState<JobSyncRunSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    setErrorMessage(null);

    void Promise.all([fetchJobSources(), fetchSyncStatus()])
      .then(([sourcesResponse, syncResponse]) => {
        if (!isActive) {
          return;
        }

        setSources(sourcesResponse);
        setSyncStatus(syncResponse);
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load sources."
        );
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [refreshToken]);

  return (
    <section aria-label="Source registry" className="grid gap-8" role="region">
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
          <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
            Sources discovered
          </p>
          <p className="mt-1 text-3xl font-semibold text-zinc-950">
            {syncStatus?.sourcesDiscovered ?? sources.length}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
            Sources verified
          </p>
          <p className="mt-1 text-3xl font-semibold text-zinc-950">
            {syncStatus?.sourcesVerified ?? 0}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
            Verification failures
          </p>
          <p className="mt-1 text-3xl font-semibold text-zinc-950">
            {syncStatus?.sourcesFailedVerification ?? 0}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
            Jobs seen in latest run
          </p>
          <p className="mt-1 text-3xl font-semibold text-zinc-950">
            {syncStatus?.jobsSeen ?? 0}
          </p>
        </div>
      </section>
      {isLoading ? (
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-600">
          Loading sources...
        </div>
      ) : errorMessage ? (
        <div className="rounded-[2rem] border border-rose-200 bg-white p-10 text-center text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : (
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
                  <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
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
                className="text-sm break-all text-zinc-700 underline decoration-zinc-300 underline-offset-4"
                href={source.boardUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {source.boardUrl}
              </a>
              {source.verificationError ? (
                <p className="text-sm text-rose-700">
                  {source.verificationError}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
