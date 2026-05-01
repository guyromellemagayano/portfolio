import * as Sentry from "@sentry/astro";

import { getSentryBaseRuntimeOptions } from "./sentry.shared";

const sentryOptions = getSentryBaseRuntimeOptions();

if (sentryOptions) {
  Sentry.init(sentryOptions);
}
