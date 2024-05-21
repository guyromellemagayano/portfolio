// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import * as Spotlight from '@spotlightjs/spotlight'

import { SENTRY_DSN, SENTRY_ENVIRONMENT } from './src/configs'

Sentry.init({
  dsn: SENTRY_DSN,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: SENTRY_ENVIRONMENT === 'development' ? true : false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.25,
  environment: SENTRY_ENVIRONMENT,
  enabled: SENTRY_ENVIRONMENT === 'production' ? true : false,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true
    })
  ]
})

if (process.env.NODE_ENV === 'development') {
  Spotlight.init()
}
