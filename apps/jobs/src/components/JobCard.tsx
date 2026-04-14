/**
 * @file apps/jobs/src/components/JobCard.tsx
 * @author Guy Romelle Magayano
 * @description Presentational job card for normalized ATS listings.
 */

import { Link } from "react-router";

import { JobActionPanel } from "@jobs/components/JobActionPanel";
import { Badge } from "@jobs/components/ui/badge";
import { buttonVariants } from "@jobs/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@jobs/components/ui/card";
import { cn } from "@jobs/lib/utils";

import type { NormalizedJob } from "@portfolio/api-contracts";

type JobCardProps = {
  job: NormalizedJob;
  onUpdated?: () => void;
};

function resolveLifecycleVariant(
  lifecycleState: NormalizedJob["lifecycleState"]
): "danger" | "default" | "secondary" | "warning" {
  switch (lifecycleState) {
    case "active":
      return "default";
    case "stale":
      return "warning";
    case "verification_failed":
      return "danger";
    case "closed":
      return "secondary";
    default:
      return "secondary";
  }
}

/** Renders a normalized job listing with metadata, link, and tracker controls. */
export function JobCard({ job, onUpdated }: JobCardProps) {
  return (
    <Card
      aria-describedby={`job-${job.id}-meta`}
      aria-labelledby={`job-${job.id}-title`}
      role="article"
    >
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={resolveLifecycleVariant(job.lifecycleState)}>
            {job.lifecycleState}
          </Badge>
          <Badge variant="outline">{job.remoteMode}</Badge>
          <Badge variant="secondary">
            {job.employmentType.replace(/_/g, " ")}
          </Badge>
        </div>
        <div className="grid gap-2">
          <CardTitle className="text-2xl" id={`job-${job.id}-title`}>
            <Link className="hover:text-zinc-700" to={`/jobs/${job.id}`}>
              {job.title}
            </Link>
          </CardTitle>
          <CardDescription className="text-sm" id={`job-${job.id}-meta`}>
            {job.company} · {job.location || "Location unspecified"} · last seen{" "}
            {new Date(job.lastSeenAt).toLocaleString()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 text-sm">
          <a
            className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}
            href={job.canonicalUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Open original posting
          </a>
          <Link
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            to={`/jobs/${job.id}`}
          >
            Inspect normalized detail
          </Link>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <JobActionPanel job={job} onUpdated={onUpdated} />
      </CardFooter>
    </Card>
  );
}
