/**
 * @file apps/jobs/src/pages/JobDetailPage.tsx
 * @author Guy Romelle Magayano
 * @description Job detail page for one normalized ATS posting.
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { JobActionPanel } from "@jobs/components/JobActionPanel";
import { fetchJobDetail } from "@jobs/lib/api";

import type { JobDetail } from "@portfolio/api-contracts";

type JobDetailPageProps = {
  onRefreshRequested: () => void;
  refreshToken: number;
};

/** Renders the job detail route with lifecycle history and latest snapshot. */
export function JobDetailPage({
  onRefreshRequested,
  refreshToken,
}: JobDetailPageProps) {
  const { id } = useParams();
  const [detail, setDetail] = useState<JobDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setErrorMessage("Job id is required.");
      setIsLoading(false);
      return;
    }

    let isActive = true;
    setIsLoading(true);
    setErrorMessage(null);

    void fetchJobDetail(id)
      .then((response) => {
        if (isActive) {
          setDetail(response);
        }
      })
      .catch((error) => {
        if (isActive) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Failed to load job detail."
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [id, refreshToken]);

  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-600">
        Loading job detail...
      </div>
    );
  }

  if (errorMessage || !detail) {
    return (
      <div className="rounded-[2rem] border border-rose-200 bg-white p-10 text-center text-sm text-rose-700">
        {errorMessage ?? "Job detail is unavailable."}
      </div>
    );
  }

  return (
    <section aria-label="Job detail" className="grid gap-8" role="region">
      <div className="grid gap-4 rounded-[2rem] border border-zinc-200 bg-white p-6">
        <Link
          className="text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4"
          to="/"
        >
          Back to search
        </Link>
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] text-zinc-500 uppercase">
            <span>{detail.source?.ats ?? "unknown"}</span>
            <span aria-hidden="true">/</span>
            <span>{detail.job.lifecycleState}</span>
            <span aria-hidden="true">/</span>
            <span>{detail.job.remoteMode}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
            {detail.job.title}
          </h1>
          <p className="text-base text-zinc-600">
            {detail.job.company} ·{" "}
            {detail.job.location || "Location unspecified"}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-zinc-700">
          <a
            className="rounded-full border border-zinc-300 px-3 py-2 hover:border-zinc-500"
            href={detail.job.canonicalUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Open company posting
          </a>
          {detail.source ? (
            <a
              className="rounded-full border border-zinc-300 px-3 py-2 hover:border-zinc-500"
              href={detail.source.boardUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open source board
            </a>
          ) : null}
        </div>
      </div>
      <JobActionPanel job={detail.job} onUpdated={onRefreshRequested} />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section
          aria-label="Job lifecycle history"
          className="grid gap-4 rounded-[2rem] border border-zinc-200 bg-white p-6"
          role="region"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
            Lifecycle history
          </h2>
          <ol className="grid gap-3">
            {detail.lifecycleEvents.map((event) => (
              <li
                className="rounded-2xl border border-zinc-200 px-4 py-3"
                key={event.id}
              >
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-900">
                  <span>{event.eventType.replace(/_/g, " ")}</span>
                  {event.previousState ? (
                    <>
                      <span aria-hidden="true">:</span>
                      <span>{event.previousState}</span>
                    </>
                  ) : null}
                  {event.nextState ? (
                    <>
                      <span aria-hidden="true">→</span>
                      <span>{event.nextState}</span>
                    </>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-zinc-500">
                  {new Date(event.occurredAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section
          aria-label="Snapshot and metadata"
          className="grid gap-4 rounded-[2rem] border border-zinc-200 bg-white p-6"
          role="region"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
            Latest snapshot
          </h2>
          <dl className="grid gap-3 text-sm text-zinc-700">
            <div>
              <dt className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
                Source verification
              </dt>
              <dd>{detail.source?.verificationStatus ?? "unknown"}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
                First seen
              </dt>
              <dd>{new Date(detail.job.firstSeenAt).toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
                Last seen
              </dt>
              <dd>{new Date(detail.job.lastSeenAt).toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
                Snapshot payload hash
              </dt>
              <dd className="text-xs break-all text-zinc-600">
                {detail.latestSnapshot?.payloadHash ?? "Unavailable"}
              </dd>
            </div>
          </dl>
          {detail.latestSnapshot ? (
            <pre className="overflow-x-auto rounded-2xl bg-zinc-950 p-4 text-xs leading-6 text-zinc-100">
              {JSON.stringify(detail.latestSnapshot.payload, null, 2)}
            </pre>
          ) : null}
        </section>
      </div>
    </section>
  );
}
