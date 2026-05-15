import { browserTracingIntegration, init } from "@sentry/astro";

import { getSentryBaseRuntimeOptions } from "./sentry.shared";

const sentryOptions = getSentryBaseRuntimeOptions();

if (sentryOptions) {
  init({
    ...sentryOptions,
    integrations: [browserTracingIntegration()],
  });
}
