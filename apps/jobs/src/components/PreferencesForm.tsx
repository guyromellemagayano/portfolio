/**
 * @file apps/jobs/src/components/PreferencesForm.tsx
 * @author Guy Romelle Magayano
 * @description Client-side single-user preferences editor for saved search defaults.
 */

"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import type { JobUserPreferences } from "@portfolio/api-contracts";

import { updatePreferences } from "@jobs/lib/api";

type PreferencesFormProps = {
  preferences: JobUserPreferences;
};

/** Renders a local-first preferences form backed by the jobs API. */
export function PreferencesForm({ preferences }: PreferencesFormProps) {
  const router = useRouter();
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
    <form
      aria-describedby="preferences-help"
      className="grid gap-5 rounded-3xl border border-zinc-200 bg-white p-6"
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
              router.refresh();
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
      <p className="text-sm text-zinc-600" id="preferences-help">
        These defaults shape saved searches and make the local tracker feel like
        your own operating system instead of a generic job board.
      </p>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-900">Keywords</span>
        <input
          aria-label="Preferred keywords"
          className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-600"
          onChange={(event) => setKeywords(event.target.value)}
          type="text"
          value={keywords}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-900">
          Preferred locations
        </span>
        <input
          aria-label="Preferred locations"
          className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-600"
          onChange={(event) => setPreferredLocations(event.target.value)}
          type="text"
          value={preferredLocations}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-900">Remote modes</span>
        <input
          aria-label="Preferred remote modes"
          className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-600"
          onChange={(event) => setRemoteModes(event.target.value)}
          type="text"
          value={remoteModes}
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-900">
          Employment types
        </span>
        <input
          aria-label="Preferred employment types"
          className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none ring-0 focus:border-zinc-600"
          onChange={(event) => setEmploymentTypes(event.target.value)}
          type="text"
          value={employmentTypes}
        />
      </label>
      <div className="flex items-center gap-3">
        <button
          className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 hover:bg-zinc-800"
          disabled={pending}
          type="submit"
        >
          {pending ? "Saving..." : "Save Preferences"}
        </button>
        {errorMessage ? (
          <p className="text-sm text-rose-700" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
