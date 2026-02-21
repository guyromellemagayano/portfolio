/**
 * Logger Integrations
 * Comprehensive integrations for popular logging services and platforms
 */

import { CloudWatchIntegration, type CloudWatchConfig } from "./aws-cloudwatch";
import {
  AzureMonitorIntegration,
  type AzureMonitorConfig,
} from "./azure-monitor";
import { DatadogIntegration, type DatadogConfig } from "./datadog";
import {
  ElasticsearchIntegration,
  type ElasticsearchConfig,
} from "./elasticsearch";
import { GoogleCloudIntegration, type GoogleCloudConfig } from "./google-cloud";
import { LogRocketIntegration, type LogRocketConfig } from "./logrocket";
import { NewRelicIntegration, type NewRelicConfig } from "./newrelic";
import { PapertrailIntegration, type PapertrailConfig } from "./papertrail";
import { SentryIntegration, type SentryConfig } from "./sentry";
import { SplunkIntegration, type SplunkConfig } from "./splunk";

// Core integrations
export { DatadogIntegration } from "./datadog";
export { LogRocketIntegration } from "./logrocket";
export { NewRelicIntegration } from "./newrelic";
export { SentryIntegration } from "./sentry";

// Cloud provider integrations
export { CloudWatchIntegration } from "./aws-cloudwatch";
export { AzureMonitorIntegration } from "./azure-monitor";
export { GoogleCloudIntegration } from "./google-cloud";

// Platform integrations
export { ElasticsearchIntegration } from "./elasticsearch";
export { PapertrailIntegration } from "./papertrail";
export { SplunkIntegration } from "./splunk";

// Integration utilities
export { createIntegration, type IntegrationConfig } from "./base";

// Integration factory
export const integrations = {
  sentry: (config?: SentryConfig) => new SentryIntegration(config),
  datadog: (config?: DatadogConfig) => new DatadogIntegration(config),
  newrelic: (config?: NewRelicConfig) => new NewRelicIntegration(config),
  logrocket: (config?: LogRocketConfig) => new LogRocketIntegration(config),
  cloudwatch: (config?: CloudWatchConfig) => new CloudWatchIntegration(config),
  googleCloud: (config?: GoogleCloudConfig) =>
    new GoogleCloudIntegration(config),
  azureMonitor: (config?: AzureMonitorConfig) =>
    new AzureMonitorIntegration(config),
  elasticsearch: (config?: ElasticsearchConfig) =>
    new ElasticsearchIntegration(config),
  splunk: (config?: SplunkConfig) => new SplunkIntegration(config),
  papertrail: (config?: PapertrailConfig) => new PapertrailIntegration(config),
};
