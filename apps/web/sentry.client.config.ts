import * as Sentry from "@sentry/astro";

import {
  getSentryBaseRuntimeOptions,
  getSentryReplayRuntimeOptions,
} from "./sentry.shared";

const sentryOptions = getSentryBaseRuntimeOptions();

if (sentryOptions) {
  Sentry.init({
    ...sentryOptions,
    ...getSentryReplayRuntimeOptions(),
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.browserSessionIntegration({ lifecycle: "route" }),
      Sentry.replayIntegration(),
    ],
  });
}
