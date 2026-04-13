/**
 * @file apps/jobs/src/app/page.tsx
 * @author Guy Romelle Magayano
 * @description Jobs search dashboard page for normalized ATS listings.
 */

import { JobCard } from "@jobs/components/JobCard";
import { fetchJobs, fetchSyncStatus } from "@jobs/lib/api";

type JobsHomePageProps = {
  searchParams: Promise<{
    keyword?: string;
    ats?: string | string[];
    location?: string;
    remoteModes?: string | string[];
    employmentTypes?: string | string[];
    freshWithinHours?: string;
    page?: string;
  }>;
};

function normalizeListInput(value?: string | string[]) {
  const values = Array.isArray(value) ? value : value ? [value] : [];

  return values.flatMap((entry) =>
    entry
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
  );
}

export default async function JobsHomePage(props: JobsHomePageProps) {
  const searchParams = await props.searchParams;
  const freshWithinHours = Number.parseInt(
    searchParams.freshWithinHours ?? "72",
    10
  );
  const [jobResults, syncStatus] = await Promise.all([
    fetchJobs({
      keyword: searchParams.keyword,
      ats: normalizeListInput(searchParams.ats) as Array<
        "ashby" | "greenhouse" | "lever" | "workday"
      >,
      location: searchParams.location,
      remoteModes: normalizeListInput(searchParams.remoteModes) as Array<
        "remote" | "hybrid" | "on_site" | "unknown"
      >,
      employmentTypes: normalizeListInput(
        searchParams.employmentTypes
      ) as Array<
        "contract" | "full_time" | "internship" | "part_time" | "temporary" | "unknown"
      >,
      freshWithinHours: Number.isFinite(freshWithinHours)
        ? freshWithinHours
        : 72,
      page: Number.parseInt(searchParams.page ?? "1", 10) || 1,
      pageSize: 20,
    }),
    fetchSyncStatus(),
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
        <form className="grid gap-4 lg:grid-cols-5" method="get">
          <label className="grid gap-2 lg:col-span-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Keyword
            </span>
            <input
              aria-label="Search keyword"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={searchParams.keyword ?? ""}
              name="keyword"
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              ATS
            </span>
            <input
              aria-label="ATS vendors"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={normalizeListInput(searchParams.ats).join(", ")}
              name="ats"
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Location
            </span>
            <input
              aria-label="Location filter"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={searchParams.location ?? ""}
              name="location"
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Freshness (hours)
            </span>
            <input
              aria-label="Freshness window in hours"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={String(freshWithinHours)}
              min={1}
              name="freshWithinHours"
              type="number"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Remote mode
            </span>
            <input
              aria-label="Remote mode filter"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={normalizeListInput(searchParams.remoteModes).join(
                ", "
              )}
              name="remoteModes"
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Employment type
            </span>
            <input
              aria-label="Employment type filter"
              className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-950 outline-none focus:border-zinc-600"
              defaultValue={normalizeListInput(
                searchParams.employmentTypes
              ).join(", ")}
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
            {jobResults.total.toLocaleString()} normalized jobs
          </h2>
          <p className="text-sm text-zinc-600">
            Ordered by lifecycle freshness first, then posting recency.
          </p>
        </div>
        {jobResults.items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-600">
            No jobs matched the current filter set.
          </div>
        ) : (
          <div className="grid gap-5">
            {jobResults.items.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
