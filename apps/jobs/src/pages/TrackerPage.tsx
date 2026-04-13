/**
 * @file apps/jobs/src/pages/TrackerPage.tsx
 * @author Guy Romelle Magayano
 * @description Tracker page for saved and applied direct ATS jobs.
 */

import { useEffect, useState } from "react";

import { JobCard } from "@jobs/components/JobCard";
import { fetchJobs } from "@jobs/lib/api";

import type { JobSearchResponseData } from "@portfolio/api-contracts";

type TrackerPageProps = {
  onRefreshRequested: () => void;
  refreshToken: number;
};

/** Renders saved and applied jobs in two local-first tracker lanes. */
export function TrackerPage({
  onRefreshRequested,
  refreshToken,
}: TrackerPageProps) {
  const [savedJobs, setSavedJobs] = useState<JobSearchResponseData | null>(
    null
  );
  const [appliedJobs, setAppliedJobs] = useState<JobSearchResponseData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    setErrorMessage(null);

    void Promise.all([
      fetchJobs({
        onlySaved: true,
        includeIgnored: true,
        pageSize: 50,
      }),
      fetchJobs({
        onlyApplied: true,
        includeIgnored: true,
        pageSize: 50,
      }),
    ])
      .then(([savedResponse, appliedResponse]) => {
        if (!isActive) {
          return;
        }

        setSavedJobs(savedResponse);
        setAppliedJobs(appliedResponse);
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load tracker."
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
    <section
      aria-label="Tracker workspace"
      className="grid gap-8"
      role="region"
    >
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Tracker
        </h1>
        <p className="text-sm text-zinc-600">
          Local-first workflow state for saved and applied jobs.
        </p>
      </div>
      {isLoading ? (
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-600">
          Loading tracker...
        </div>
      ) : errorMessage ? (
        <div className="rounded-[2rem] border border-rose-200 bg-white p-10 text-center text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <section aria-label="Saved jobs" className="grid gap-4" role="region">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Saved
            </h2>
            {savedJobs && savedJobs.items.length > 0 ? (
              savedJobs.items.map((job) => (
                <JobCard
                  job={job}
                  key={job.id}
                  onUpdated={onRefreshRequested}
                />
              ))
            ) : (
              <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white p-8 text-sm text-zinc-600">
                No saved jobs yet.
              </div>
            )}
          </section>
          <section
            aria-label="Applied jobs"
            className="grid gap-4"
            role="region"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Applied
            </h2>
            {appliedJobs && appliedJobs.items.length > 0 ? (
              appliedJobs.items.map((job) => (
                <JobCard
                  job={job}
                  key={job.id}
                  onUpdated={onRefreshRequested}
                />
              ))
            ) : (
              <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white p-8 text-sm text-zinc-600">
                No applied jobs yet.
              </div>
            )}
          </section>
        </div>
      )}
    </section>
  );
}
