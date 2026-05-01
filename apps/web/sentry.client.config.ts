import * as Sentry from "@sentry/astro";

import {
  getSentryBaseRuntimeOptions,
  getSentryReplayRuntimeOptions,
  SENTRY_CONSOLE_LOG_LEVELS,
} from "./sentry.shared";

const sentryOptions = getSentryBaseRuntimeOptions();

if (sentryOptions) {
  Sentry.init({
    ...sentryOptions,
    ...getSentryReplayRuntimeOptions(),
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.browserSessionIntegration({ lifecycle: "route" }),
      Sentry.consoleLoggingIntegration({
        levels: [...SENTRY_CONSOLE_LOG_LEVELS],
      }),
      Sentry.replayIntegration(),
    ],
  });
}
