import * as Sentry from "@sentry/astro";

import { configureSentryLogger } from "@portfolio/logger";

import {
  getSentryBaseRuntimeOptions,
  getSentryReplayRuntimeOptions,
  SENTRY_APP_TAGS,
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

  configureSentryLogger(Sentry, {
    context: {
      component: "portfolio-web",
    },
    tags: SENTRY_APP_TAGS,
  });
}
