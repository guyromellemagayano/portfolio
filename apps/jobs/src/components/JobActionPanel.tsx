/**
 * @file apps/jobs/src/components/JobActionPanel.tsx
 * @author Guy Romelle Magayano
 * @description Tracker controls for ignore, save, apply, and reset actions.
 */

import { startTransition, useState } from "react";

import { Badge } from "@jobs/components/ui/Badge";
import { Button } from "@jobs/components/ui/Button";
import { Card, CardContent } from "@jobs/components/ui/Card";
import { resetJobState, updateJobState } from "@jobs/lib/api";

import { type NormalizedJob } from "@portfolio/api-contracts";

type JobActionPanelProps = {
  job: NormalizedJob;
  onUpdated?: () => void;
};

export function JobActionPanel({ job, onUpdated }: JobActionPanelProps) {
  const [pendingLabel, setPendingLabel] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPending = pendingLabel !== null;

  const runAction = (label: string, action: () => Promise<unknown>) => {
    setPendingLabel(label);
    setErrorMessage(null);

    startTransition(() => {
      void action()
        .then(() => {
          onUpdated?.();
        })
        .catch((error) => {
          setErrorMessage(
            error instanceof Error ? error.message : "Request failed."
          );
        })
        .finally(() => {
          setPendingLabel(null);
        });
    });
  };

  return (
    <Card
      aria-label={`Tracker actions for ${job.title} at ${job.company}`}
      className="border-zinc-200 bg-zinc-50/80"
      role="group"
    >
      <CardContent className="grid gap-4 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={job.userState.saved ? "success" : "secondary"}>
            {job.userState.saved ? "saved" : "not saved"}
          </Badge>
          <Badge variant={job.userState.applied ? "success" : "secondary"}>
            {job.userState.applied ? "applied" : "not applied"}
          </Badge>
          {job.userState.ignored ? (
            <Badge variant="warning">ignored</Badge>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            aria-label={job.userState.saved ? "Unsave job" : "Save job"}
            disabled={isPending}
            onClick={() =>
              runAction("save", () =>
                updateJobState(job.id, {
                  saved: !job.userState.saved,
                  applicationStatus: !job.userState.saved
                    ? "saved"
                    : "not_started",
                })
              )
            }
            size="sm"
            variant="secondary"
          >
            {pendingLabel === "save"
              ? "Saving..."
              : job.userState.saved
                ? "Saved"
                : "Save"}
          </Button>
          <Button
            aria-label={
              job.userState.applied ? "Mark as not applied" : "Mark as applied"
            }
            disabled={isPending}
            onClick={() =>
              runAction("apply", () =>
                updateJobState(job.id, {
                  applied: !job.userState.applied,
                  applicationStatus: !job.userState.applied
                    ? "applied"
                    : "not_started",
                })
              )
            }
            size="sm"
            variant="secondary"
          >
            {pendingLabel === "apply"
              ? "Updating..."
              : job.userState.applied
                ? "Applied"
                : "Mark Applied"}
          </Button>
          <Button
            aria-label={
              job.userState.ignored ? "Restore ignored job" : "Ignore job"
            }
            disabled={isPending}
            onClick={() =>
              runAction("ignore", () =>
                updateJobState(job.id, {
                  ignored: !job.userState.ignored,
                })
              )
            }
            size="sm"
            variant="outline"
          >
            {pendingLabel === "ignore"
              ? "Updating..."
              : job.userState.ignored
                ? "Ignored"
                : "Ignore"}
          </Button>
          <Button
            aria-label="Reset job tracker state"
            disabled={isPending}
            onClick={() => runAction("reset", () => resetJobState(job.id))}
            size="sm"
            variant="danger"
          >
            {pendingLabel === "reset" ? "Resetting..." : "Reset"}
          </Button>
        </div>
        <div aria-live="polite" className="text-xs text-zinc-600" role="status">
          Status: {job.userState.applicationStatus.replace(/_/g, " ")}
        </div>
        {errorMessage ? (
          <p className="text-sm text-rose-700" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
