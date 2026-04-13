/**
 * @file apps/jobs/src/app/tracker/page.tsx
 * @author Guy Romelle Magayano
 * @description Tracker page for saved and applied direct ATS jobs.
 */

import { JobCard } from "@jobs/components/JobCard";
import { fetchJobs } from "@jobs/lib/api";

export default async function TrackerPage() {
  const [savedJobs, appliedJobs] = await Promise.all([
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
  ]);

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
      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-label="Saved jobs" className="grid gap-4" role="region">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
            Saved
          </h2>
          {savedJobs.items.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white p-8 text-sm text-zinc-600">
              No saved jobs yet.
            </div>
          ) : (
            savedJobs.items.map((job) => <JobCard job={job} key={job.id} />)
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
          {appliedJobs.items.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-white p-8 text-sm text-zinc-600">
              No applied jobs yet.
            </div>
          ) : (
            appliedJobs.items.map((job) => <JobCard job={job} key={job.id} />)
          )}
        </section>
      </div>
    </section>
  );
}
