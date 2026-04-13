/**
 * @file apps/jobs/src/app/settings/page.tsx
 * @author Guy Romelle Magayano
 * @description Local single-user settings page for saved search defaults.
 */

import { PreferencesForm } from "@jobs/components/PreferencesForm";
import { fetchPreferences } from "@jobs/lib/api";

export default async function SettingsPage() {
  const preferences = await fetchPreferences();

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
      <PreferencesForm preferences={preferences} />
    </section>
  );
}
