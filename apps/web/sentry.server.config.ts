import * as Sentry from "@sentry/astro";

import {
  getSentryBaseRuntimeOptions,
  SENTRY_CONSOLE_LOG_LEVELS,
} from "./sentry.shared";

const sentryOptions = getSentryBaseRuntimeOptions();

if (sentryOptions) {
  Sentry.init({
    ...sentryOptions,
    integrations: [
      Sentry.consoleLoggingIntegration({
        levels: [...SENTRY_CONSOLE_LOG_LEVELS],
      }),
    ],
  });
}
