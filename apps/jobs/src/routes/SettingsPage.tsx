/**
 * @file apps/jobs/src/routes/SettingsPage.tsx
 * @author Guy Romelle Magayano
 * @description Local single-user settings page for saved search defaults.
 */

import { useEffect, useState } from "react";

import { PreferencesForm } from "@jobs/components/PreferencesForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@jobs/components/ui/card";
import { fetchPreferences } from "@jobs/lib/api";

import type { JobUserPreferences } from "@portfolio/api-contracts";

type SettingsPageProps = {
  onRefreshRequested: () => void;
  refreshToken: number;
};

/** Renders local single-user preferences backed by the jobs API. */
export function SettingsPage({
  onRefreshRequested,
  refreshToken,
}: SettingsPageProps) {
  const [preferences, setPreferences] = useState<JobUserPreferences | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    setErrorMessage(null);

    void fetchPreferences()
      .then((response) => {
        if (isActive) {
          setPreferences(response);
        }
      })
      .catch((error) => {
        if (isActive) {
          setErrorMessage(
            error instanceof Error ? error.message : "Failed to load settings."
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
  }, [refreshToken]);

  return (
    <section aria-label="Settings" className="grid gap-8" role="region">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Settings
        </h1>
        <p className="text-sm text-zinc-600">
          Store the default filters that matter to you and keep the workflow
          tuned to your actual search.
        </p>
      </div>
      {isLoading ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-zinc-600">
            Loading settings...
          </CardContent>
        </Card>
      ) : errorMessage || !preferences ? (
        <Card className="border-rose-200">
          <CardContent className="p-10 text-center text-sm text-rose-700">
            {errorMessage ?? "Preferences are unavailable."}
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Single-user defaults</CardTitle>
              <CardDescription>
                Tune the search surface around the roles, locations, and work
                modes that actually matter.
              </CardDescription>
            </CardHeader>
          </Card>
          <PreferencesForm
            onSaved={onRefreshRequested}
            preferences={preferences}
          />
        </>
      )}
    </section>
  );
}
