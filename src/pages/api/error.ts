import { HandlerContext, HandlerEvent } from "@netlify/functions";
import { wrap } from "@netlify/integrations";
import { SentryContext, withSentry } from "@netlify/sentry";

const withIntegrations = wrap(withSentry);

const handler = withIntegrations(async (event: HandlerEvent, context: HandlerContext & SentryContext) => {
	throw Error("Yet another error");
});

export { handler };
