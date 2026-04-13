/**
 * @file apps/jobs/src/components/SyncControls.tsx
 * @author Guy Romelle Magayano
 * @description Client-side controls for source verification and manual sync runs.
 */

"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import { triggerSync, verifySources } from "@jobs/lib/api";

/** Renders buttons for manual verification and sync orchestration. */
export function SyncControls() {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const runAction = (label: string, action: () => Promise<unknown>) => {
    setPendingAction(label);
    setErrorMessage(null);

    startTransition(() => {
      void action()
        .then(() => {
          router.refresh();
        })
        .catch((error) => {
          setErrorMessage(
            error instanceof Error ? error.message : "Request failed."
          );
        })
        .finally(() => {
          setPendingAction(null);
        });
    });
  };

  return (
    <div
      aria-label="Sync controls"
      className="flex flex-wrap items-center gap-3"
      role="group"
    >
      <button
        className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-500"
        disabled={pendingAction !== null}
        onClick={() => runAction("verify", () => verifySources())}
        type="button"
      >
        {pendingAction === "verify" ? "Verifying..." : "Verify Sources"}
      </button>
      <button
        className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
        disabled={pendingAction !== null}
        onClick={() => runAction("sync", () => triggerSync())}
        type="button"
      >
        {pendingAction === "sync" ? "Running Sync..." : "Run Sync"}
      </button>
      {errorMessage ? (
        <p className="text-sm text-rose-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
