// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

import { SENTRY_DSN, SENTRY_ENVIRONMENT } from '@portfolio/configs'

Sentry.init({
  dsn: SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.25,
  environment: SENTRY_ENVIRONMENT,
  enabled: SENTRY_ENVIRONMENT === 'production' ? true : false,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: SENTRY_ENVIRONMENT === 'development' ? true : false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  spotlight: SENTRY_ENVIRONMENT === 'development' ? true : false
})
