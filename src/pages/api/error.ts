/* eslint-disable @typescript-eslint/no-unused-vars */
import { HandlerContext, HandlerEvent } from '@netlify/functions'
import { wrap } from '@netlify/integrations'
import { SentryContext, withSentry } from '@netlify/sentry'

const withIntegrations = wrap(withSentry)

const handler = withIntegrations(async (_event: HandlerEvent, _context: HandlerContext & SentryContext) => {
  throw Error('Yet another error')
})

export { handler }
