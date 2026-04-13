/**
 * @file apps/jobs/src/components/JobCard.tsx
 * @author Guy Romelle Magayano
 * @description Presentational job card for normalized ATS listings.
 */

import { Link } from "react-router";

import { JobActionPanel } from "@jobs/components/JobActionPanel";

import type { NormalizedJob } from "@portfolio/api-contracts";

type JobCardProps = {
  job: NormalizedJob;
  onUpdated?: () => void;
};

/** Renders a normalized job listing with metadata, link, and tracker controls. */
export function JobCard({ job, onUpdated }: JobCardProps) {
  return (
    <article
      aria-describedby={`job-${job.id}-meta`}
      aria-labelledby={`job-${job.id}-title`}
      className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6"
      role="article"
    >
      <div className="grid gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] text-zinc-500 uppercase">
          <span>{job.lifecycleState}</span>
          <span aria-hidden="true">/</span>
          <span>{job.remoteMode}</span>
          <span aria-hidden="true">/</span>
          <span>{job.employmentType.replace(/_/g, " ")}</span>
        </div>
        <h2
          className="text-2xl font-semibold tracking-tight text-zinc-950"
          id={`job-${job.id}-title`}
        >
          <Link to={`/jobs/${job.id}`}>{job.title}</Link>
        </h2>
        <p className="text-sm text-zinc-600" id={`job-${job.id}-meta`}>
          {job.company} · {job.location || "Location unspecified"} · last seen{" "}
          {new Date(job.lastSeenAt).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-zinc-700">
        <a
          className="rounded-full border border-zinc-300 px-3 py-2 hover:border-zinc-500"
          href={job.canonicalUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Open original posting
        </a>
        <Link
          className="rounded-full border border-zinc-300 px-3 py-2 hover:border-zinc-500"
          to={`/jobs/${job.id}`}
        >
          Inspect normalized detail
        </Link>
      </div>
      <JobActionPanel job={job} onUpdated={onUpdated} />
    </article>
  );
}
