/**
 * @file apps/jobs/src/components/SyncControls.tsx
 * @author Guy Romelle Magayano
 * @description Controls for source verification and manual sync runs.
 */

import { startTransition, useState } from "react";

import { Button } from "@jobs/components/ui/Button";
import { triggerSync, verifySources } from "@jobs/lib/api";

/** Renders buttons for manual verification and sync orchestration. */
export function SyncControls(props: { onCompleted?: () => void }) {
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const runAction = (label: string, action: () => Promise<unknown>) => {
    setPendingAction(label);
    setErrorMessage(null);

    startTransition(() => {
      void action()
        .then(() => {
          props.onCompleted?.();
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
      <Button
        disabled={pendingAction !== null}
        onClick={() => runAction("verify", () => verifySources())}
        variant="secondary"
      >
        {pendingAction === "verify" ? "Verifying..." : "Verify Sources"}
      </Button>
      <Button
        disabled={pendingAction !== null}
        onClick={() => runAction("sync", () => triggerSync())}
      >
        {pendingAction === "sync" ? "Running Sync..." : "Run Sync"}
      </Button>
      {errorMessage ? (
        <p className="text-sm text-rose-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
