/**
 * @file apps/jobs/src/components/JobActionPanel.tsx
 * @author Guy Romelle Magayano
 * @description Tracker controls for ignore, save, apply, and reset actions.
 */

import { startTransition, useState } from "react";

import { resetJobState, updateJobState } from "@jobs/lib/api";

import type { NormalizedJob } from "@portfolio/api-contracts";

type JobActionPanelProps = {
  job: NormalizedJob;
  onUpdated?: () => void;
};

/** Renders single-user tracker actions for a normalized job record. */
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
    <div
      aria-label={`Tracker actions for ${job.title} at ${job.company}`}
      className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
      role="group"
    >
      <div className="flex flex-wrap gap-2">
        <button
          aria-label={job.userState.saved ? "Unsave job" : "Save job"}
          className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-500"
          disabled={isPending}
          onClick={() =>
            runAction("save", () =>
              updateJobState(job.id, {
                saved: !job.userState.saved,
              })
            )
          }
          type="button"
        >
          {pendingLabel === "save"
            ? "Saving..."
            : job.userState.saved
              ? "Saved"
              : "Save"}
        </button>
        <button
          aria-label={
            job.userState.applied ? "Mark as not applied" : "Mark as applied"
          }
          className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-500"
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
          type="button"
        >
          {pendingLabel === "apply"
            ? "Updating..."
            : job.userState.applied
              ? "Applied"
              : "Mark Applied"}
        </button>
        <button
          aria-label={
            job.userState.ignored ? "Restore ignored job" : "Ignore job"
          }
          className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-500"
          disabled={isPending}
          onClick={() =>
            runAction("ignore", () =>
              updateJobState(job.id, {
                ignored: !job.userState.ignored,
              })
            )
          }
          type="button"
        >
          {pendingLabel === "ignore"
            ? "Updating..."
            : job.userState.ignored
              ? "Ignored"
              : "Ignore"}
        </button>
        <button
          aria-label="Reset job tracker state"
          className="rounded-full border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 hover:border-rose-400"
          disabled={isPending}
          onClick={() => runAction("reset", () => resetJobState(job.id))}
          type="button"
        >
          {pendingLabel === "reset" ? "Resetting..." : "Reset"}
        </button>
      </div>
      <div aria-live="polite" className="text-xs text-zinc-600" role="status">
        Status: {job.userState.applicationStatus.replace(/_/g, " ")}
      </div>
      {errorMessage ? (
        <p className="text-sm text-rose-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
