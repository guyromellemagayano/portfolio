/**
 * @file apps/web/src/lib/document-integrations.ts
 * @author Guy Romelle Magayano
 * @description Environment-backed integration helpers for the shared document shell.
 */

type DocumentEnvKey =
  | "BING_SITE_VERIFICATION"
  | "GOOGLE_ANALYTICS_MEASUREMENT_ID"
  | "GOOGLE_TAG_MANAGER_CONTAINER_ID"
  | "VERCEL_ENV";

export type ResolvedDocumentIntegrations = {
  bingSiteVerification: string;
  googleAnalyticsBootstrapScript: string;
  googleAnalyticsMeasurementId: string;
  googleAnalyticsScriptUrl: string;
  googleTagManagerBootstrapScript: string;
  googleTagManagerContainerId: string;
  googleTagManagerNoScriptUrl: string;
  shouldRenderVercelObservability: boolean;
};

/** Resolves analytics, verification, and observability settings for the document shell. */
export function resolveDocumentIntegrations(): ResolvedDocumentIntegrations {
  const googleAnalyticsMeasurementId = getTrimmedEnvValue(
    "GOOGLE_ANALYTICS_MEASUREMENT_ID"
  );
  const googleTagManagerContainerId = getTrimmedEnvValue(
    "GOOGLE_TAG_MANAGER_CONTAINER_ID"
  );
  const shouldUseDirectGoogleAnalytics =
    googleAnalyticsMeasurementId.length > 0 &&
    googleTagManagerContainerId.length === 0;
  const bingSiteVerification = getTrimmedEnvValue("BING_SITE_VERIFICATION");
  const shouldRenderVercelObservability =
    getTrimmedEnvValue("VERCEL_ENV").length > 0;

  return {
    bingSiteVerification,
    googleAnalyticsBootstrapScript: buildGoogleAnalyticsBootstrapScript(
      shouldUseDirectGoogleAnalytics ? googleAnalyticsMeasurementId : ""
    ),
    googleAnalyticsMeasurementId,
    googleAnalyticsScriptUrl: shouldUseDirectGoogleAnalytics
      ? `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
          googleAnalyticsMeasurementId
        )}`
      : "",
    googleTagManagerBootstrapScript: buildGoogleTagManagerBootstrapScript(
      googleTagManagerContainerId
    ),
    googleTagManagerContainerId,
    googleTagManagerNoScriptUrl: googleTagManagerContainerId
      ? `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(
          googleTagManagerContainerId
        )}`
      : "",
    shouldRenderVercelObservability,
  };
}

function getTrimmedEnvValue(key: DocumentEnvKey): string {
  const env = globalThis.process?.env;

  return env?.[key]?.trim() ?? "";
}

function buildGoogleAnalyticsBootstrapScript(measurementId: string): string {
  if (!measurementId) {
    return "";
  }

  return `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag() {
  window.dataLayer.push(arguments);
};
window.gtag("js", new Date());
window.gtag("config", ${JSON.stringify(measurementId)});
`;
}

function buildGoogleTagManagerBootstrapScript(containerId: string): string {
  if (!containerId) {
    return "";
  }

  return `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":
new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=
"https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,"script","dataLayer",${JSON.stringify(containerId)});
`;
}
