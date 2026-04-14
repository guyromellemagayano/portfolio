/**
 * @file apps/jobs/src/components/PreferencesForm.tsx
 * @author Guy Romelle Magayano
 * @description Single-user preferences editor for saved search defaults.
 */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@jobs/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@jobs/components/ui/Card";
import { Input } from "@jobs/components/ui/Input";
import { updatePreferences } from "@jobs/lib/api";

import { type JobUserPreferences } from "@portfolio/api-contracts";

type PreferencesFormProps = {
  onSaved?: () => void;
  preferences: JobUserPreferences;
};

type PreferencesFormValues = {
  employmentTypes: string;
  keywords: string;
  preferredLocations: string;
  remoteModes: string;
};

function toDelimitedValue(values: string[]) {
  return values.join(", ");
}

function normalizeDelimitedValue(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function PreferencesForm({
  onSaved,
  preferences,
}: PreferencesFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<PreferencesFormValues>({
    defaultValues: {
      employmentTypes: toDelimitedValue(preferences.employmentTypes),
      keywords: toDelimitedValue(preferences.keywords),
      preferredLocations: toDelimitedValue(preferences.preferredLocations),
      remoteModes: toDelimitedValue(preferences.remoteModes),
    },
  });

  useEffect(() => {
    reset({
      employmentTypes: toDelimitedValue(preferences.employmentTypes),
      keywords: toDelimitedValue(preferences.keywords),
      preferredLocations: toDelimitedValue(preferences.preferredLocations),
      remoteModes: toDelimitedValue(preferences.remoteModes),
    });
  }, [preferences, reset]);

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
          onSubmit={handleSubmit(async (values: PreferencesFormValues) => {
            setErrorMessage(null);

            try {
              await updatePreferences({
                employmentTypes: normalizeDelimitedValue(
                  values.employmentTypes
                ) as JobUserPreferences["employmentTypes"],
                keywords: normalizeDelimitedValue(values.keywords),
                preferredLocations: normalizeDelimitedValue(
                  values.preferredLocations
                ),
                remoteModes: normalizeDelimitedValue(
                  values.remoteModes
                ) as JobUserPreferences["remoteModes"],
              });

              onSaved?.();
            } catch (error) {
              setErrorMessage(
                error instanceof Error ? error.message : "Request failed."
              );
            }
          })}
          role="form"
        >
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-900">Keywords</span>
            <Input
              aria-label="Preferred keywords"
              {...register("keywords")}
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-900">
              Preferred locations
            </span>
            <Input
              aria-label="Preferred locations"
              {...register("preferredLocations")}
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-900">
              Remote modes
            </span>
            <Input
              aria-label="Preferred remote modes"
              {...register("remoteModes")}
              type="text"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-zinc-900">
              Employment types
            </span>
            <Input
              aria-label="Preferred employment types"
              {...register("employmentTypes")}
              type="text"
            />
          </label>
          <div className="flex items-center gap-3">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Saving..." : "Save Preferences"}
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
