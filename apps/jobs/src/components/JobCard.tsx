/**
 * @file apps/jobs/src/components/JobCard.tsx
 * @author Guy Romelle Magayano
 * @description Presentational job card for normalized ATS listings.
 */

import Link from "next/link";

import type { NormalizedJob } from "@portfolio/api-contracts";

import { JobActionPanel } from "@jobs/components/JobActionPanel";

type JobCardProps = {
  job: NormalizedJob;
};

/** Renders a normalized job listing with metadata, link, and tracker controls. */
export function JobCard({ job }: JobCardProps) {
  return (
    <article
      aria-describedby={`job-${job.id}-meta`}
      aria-labelledby={`job-${job.id}-title`}
      className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6"
      role="article"
    >
      <div className="grid gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span>{job.lifecycleState}</span>
          <span aria-hidden="true">/</span>
          <span>{job.remoteMode}</span>
          <span aria-hidden="true">/</span>
          <span>{job.employmentType.replaceAll("_", " ")}</span>
        </div>
        <h2
          className="text-2xl font-semibold tracking-tight text-zinc-950"
          id={`job-${job.id}-title`}
        >
          <Link href={`/jobs/${job.id}`} prefetch={false}>
            {job.title}
          </Link>
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
          href={`/jobs/${job.id}`}
          prefetch={false}
        >
          Inspect normalized detail
        </Link>
      </div>
      <JobActionPanel job={job} />
    </article>
  );
}
