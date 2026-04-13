/**
 * @file apps/jobs/src/pages/JobsDashboardPage.tsx
 * @author Guy Romelle Magayano
 * @description Search dashboard page for normalized direct ATS listings.
 */

import { type FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { JobCard } from "@jobs/components/JobCard";
import { fetchJobs, fetchSyncStatus } from "@jobs/lib/api";

import type {
  JobSearchResponseData,
  JobSyncRunSummary,
} from "@portfolio/api-contracts";

type JobsDashboardPageProps = {
  onRefreshRequested: () => void;
  refreshToken: number;
};

function parseDelimitedValue(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function createSearchParamsFromForm(form: HTMLFormElement): URLSearchParams {
  const formData = new FormData(form);
  const nextSearchParams = new URLSearchParams();
  const keyword = formData.get("keyword");
  const location = formData.get("location");
  const freshWithinHours = formData.get("freshWithinHours");

  if (typeof keyword === "string" && keyword.trim()) {
    nextSearchParams.set("keyword", keyword.trim());
  }

  if (typeof location === "string" && location.trim()) {
    nextSearchParams.set("location", location.trim());
  }

  if (typeof freshWithinHours === "string" && freshWithinHours.trim()) {
    nextSearchParams.set("freshWithinHours", freshWithinHours.trim());
  }

  for (const ats of parseDelimitedValue(formData.get("ats"))) {
    nextSearchParams.append("ats", ats);
  }

  for (const remoteMode of parseDelimitedValue(formData.get("remoteModes"))) {
    nextSearchParams.append("remoteModes", remoteMode);
  }

  for (const employmentType of parseDelimitedValue(
    formData.get("employmentTypes")
  )) {
    nextSearchParams.append("employmentTypes", employmentType);
  }

  return nextSearchParams;
}

/** Renders the client-side search dashboard and normalized job results. */
export function JobsDashboardPage({
  onRefreshRequested,
  refreshToken,
}: JobsDashboardPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobResults, setJobResults] = useState<JobSearchResponseData | null>(
    null
  );
  const [syncStatus, setSyncStatus] = useState<JobSyncRunSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const keyword = searchParams.get("keyword") ?? "";
  const location = searchParams.get("location") ?? "";
  const ats = searchParams.getAll("ats");
  const remoteModes = searchParams.getAll("remoteModes");
  const employmentTypes = searchParams.getAll("employmentTypes");
  const freshWithinHours = searchParams.get("freshWithinHours") ?? "72";

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setErrorMessage(null);

    void Promise.all([
      fetchJobs({
        keyword: keyword || undefined,
        ats: ats.length
          ? (ats as Array<"ashby" | "greenhouse" | "lever" | "workday">)
          : undefined,
        location: location || undefined,
        remoteModes: remoteModes.length
          ? (remoteModes as Array<"hybrid" | "on_site" | "remote" | "unknown">)
          : undefined,
        employmentTypes: employmentTypes.length
          ? (employmentTypes as Array<
              | "contract"
              | "full_time"
              | "internship"
              | "part_time"
              | "temporary"
              | "unknown"
            >)
          : undefined,
        freshWithinHours: Number.parseInt(freshWithinHours, 10) || 72,
        page: 1,
        pageSize: 20,
      }),
      fetchSyncStatus(),
    ])
      .then(([jobsResponse, syncResponse]) => {
        if (!isActive) {
          return;
        }

        setJobResults(jobsResponse);
        setSyncStatus(syncResponse);
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load jobs."
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
  }, [
    ats.join(","),
    employmentTypes.join(","),
    freshWithinHours,
    keyword,
    location,
    refreshToken,
    remoteModes.join(","),
  ]);

  return (
    <section
      aria-label="Jobs search dashboard"
      className="grid gap-8"
      role="region"
    >
      <section
        aria-label="Search filters"
        className="grid gap-4 rounded-[2rem] border border-zinc-200 bg-white p-6"
        role="search"
      >
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Search direct ATS jobs
            </h2>
            <p className="text-sm text-zinc-600">
              Freshness-first search over verified company-owned sources.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-700">
            Latest sync:{" "}
            {syncStatus?.finishedAt
              ? new Date(syncStatus.finishedAt).toLocaleString()
              : "Not run yet"}
          </div>
        </div>
        <form
          className="grid gap-4 lg:grid-cols-5"
          key={searchParams.toString()}
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setSearchParams(createSearchParamsFromForm(event.currentTarget));
          }}
        >
          <label className="grid gap-2 lg:col-span-2">
            <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Keyword
            </span>
            <input
              aria-label="Search keyword"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={keyword}
              name="keyword"
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
              ATS
            </span>
            <input
              aria-label="ATS vendors"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={ats.join(", ")}
              name="ats"
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Location
            </span>
            <input
              aria-label="Location filter"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={location}
              name="location"
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Freshness (hours)
            </span>
            <input
              aria-label="Freshness window in hours"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={freshWithinHours}
              min={1}
              name="freshWithinHours"
              type="number"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Remote mode
            </span>
            <input
              aria-label="Remote mode filter"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={remoteModes.join(", ")}
              name="remoteModes"
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Employment type
            </span>
            <input
              aria-label="Employment type filter"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={employmentTypes.join(", ")}
              name="employmentTypes"
              type="text"
            />
          </label>
          <div className="flex items-end">
            <button
              className="w-full rounded-full border border-zinc-900 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
              type="submit"
            >
              Update search
            </button>
          </div>
        </form>
      </section>
      <section aria-label="Jobs results" className="grid gap-5" role="region">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
            {(jobResults?.total ?? 0).toLocaleString()} normalized jobs
          </h2>
          <p className="text-sm text-zinc-600">
            Ordered by lifecycle freshness first, then posting recency.
          </p>
        </div>
        {isLoading ? (
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-600">
            Loading jobs...
          </div>
        ) : errorMessage ? (
          <div className="rounded-[2rem] border border-rose-200 bg-white p-10 text-center text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : !jobResults || jobResults.items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-600">
            No jobs matched the current filter set.
          </div>
        ) : (
          <div className="grid gap-5">
            {jobResults.items.map((job) => (
              <JobCard job={job} key={job.id} onUpdated={onRefreshRequested} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
