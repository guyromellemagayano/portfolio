/**
 * @file apps/jobs/src/components/PreferencesForm.tsx
 * @author Guy Romelle Magayano
 * @description Single-user preferences editor for saved search defaults.
 */

import { startTransition, useState } from "react";

import { Button } from "@jobs/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@jobs/components/ui/card";
import { Input } from "@jobs/components/ui/input";
import { updatePreferences } from "@jobs/lib/api";

import type { JobUserPreferences } from "@portfolio/api-contracts";

type PreferencesFormProps = {
  onSaved?: () => void;
  preferences: JobUserPreferences;
};

/** Renders a local-first preferences form backed by the jobs API. */
export function PreferencesForm({
  onSaved,
  preferences,
}: PreferencesFormProps) {
  const [keywords, setKeywords] = useState(preferences.keywords.join(", "));
  const [preferredLocations, setPreferredLocations] = useState(
    preferences.preferredLocations.join(", ")
  );
  const [remoteModes, setRemoteModes] = useState(
    preferences.remoteModes.join(", ")
  );
  const [employmentTypes, setEmploymentTypes] = useState(
    preferences.employmentTypes.join(", ")
  );
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search defaults</CardTitle>
        <CardDescription id="preferences-help">
          These defaults shape saved searches and make the local tracker feel
          like your own operating system instead of a generic job board.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          aria-describedby="preferences-help"
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            setPending(true);
            setErrorMessage(null);

            startTransition(() => {
              void updatePreferences({
                keywords: keywords
                  .split(",")
                  .map((entry) => entry.trim())
                  .filter(Boolean),
                preferredLocations: preferredLocations
                  .split(",")
                  .map((entry) => entry.trim())
                  .filter(Boolean),
                remoteModes: remoteModes
                  .split(",")
                  .map((entry) => entry.trim())
                  .filter(Boolean) as JobUserPreferences["remoteModes"],
                employmentTypes: employmentTypes
                  .split(",")
                  .map((entry) => entry.trim())
                  .filter(Boolean) as JobUserPreferences["employmentTypes"],
              })
                .then(() => {
                  onSaved?.();
                })
                .catch((error) => {
                  setErrorMessage(
                    error instanceof Error ? error.message : "Request failed."
                  );
                })
                .finally(() => {
                  setPending(false);
                });
            });
          }}
          role="form"
        >
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-900">Keywords</span>
            <Input
              aria-label="Preferred keywords"
              onChange={(event) => setKeywords(event.target.value)}
              type="text"
              value={keywords}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-900">
              Preferred locations
            </span>
            <Input
              aria-label="Preferred locations"
              onChange={(event) => setPreferredLocations(event.target.value)}
              type="text"
              value={preferredLocations}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-900">
              Remote modes
            </span>
            <Input
              aria-label="Preferred remote modes"
              onChange={(event) => setRemoteModes(event.target.value)}
              type="text"
              value={remoteModes}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-900">
              Employment types
            </span>
            <Input
              aria-label="Preferred employment types"
              onChange={(event) => setEmploymentTypes(event.target.value)}
              type="text"
              value={employmentTypes}
            />
          </label>
          <div className="flex items-center gap-3">
            <Button disabled={pending} type="submit">
              {pending ? "Saving..." : "Save Preferences"}
            </Button>
            {errorMessage ? (
              <p className="text-sm text-rose-700" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
