/**
 * @file apps/jobs/src/routes/JobDetailPage.tsx
 * @author Guy Romelle Magayano
 * @description Job detail page for one normalized ATS posting.
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { JobActionPanel } from "@jobs/components/JobActionPanel";
import { Badge } from "@jobs/components/ui/Badge";
import { buttonVariants } from "@jobs/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@jobs/components/ui/Card";
import { fetchJobDetail } from "@jobs/lib/api";
import { cn } from "@jobs/lib/utils";

import { type JobDetail } from "@portfolio/api-contracts";

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
      <Card>
        <CardContent className="p-10 text-center text-sm text-zinc-600">
          Loading job detail...
        </CardContent>
      </Card>
    );
  }

  if (errorMessage || !detail) {
    return (
      <Card className="border-rose-200">
        <CardContent className="p-10 text-center text-sm text-rose-700">
          {errorMessage ?? "Job detail is unavailable."}
        </CardContent>
      </Card>
    );
  }

  return (
    <section aria-label="Job detail" className="grid gap-8" role="region">
      <Card>
        <CardHeader className="gap-4">
          <Link
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "w-fit px-0 text-zinc-600 hover:bg-transparent"
            )}
            to="/"
          >
            Back to search
          </Link>
          <div className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{detail.source?.ats ?? "unknown"}</Badge>
              <Badge variant="secondary">{detail.job.lifecycleState}</Badge>
              <Badge variant="secondary">{detail.job.remoteMode}</Badge>
            </div>
            <CardTitle className="text-4xl">{detail.job.title}</CardTitle>
            <CardDescription className="text-base">
              {detail.job.company} ·{" "}
              {detail.job.location || "Location unspecified"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              className={cn(
                buttonVariants({ size: "sm", variant: "secondary" })
              )}
              href={detail.job.canonicalUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open company posting
            </a>
            {detail.source ? (
              <a
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" })
                )}
                href={detail.source.boardUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open source board
              </a>
            ) : null}
          </div>
        </CardContent>
      </Card>
      <JobActionPanel job={detail.job} onUpdated={onRefreshRequested} />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card aria-label="Job lifecycle history" role="region">
          <CardHeader>
            <CardTitle>Lifecycle history</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        <Card aria-label="Snapshot and metadata" role="region">
          <CardHeader>
            <CardTitle>Latest snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
