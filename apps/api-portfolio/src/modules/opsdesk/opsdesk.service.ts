/**
 * @file apps/api-portfolio/src/modules/opsdesk/opsdesk.service.ts
 * @author Guy Romelle Magayano
 * @description OpsDesk service providing the first operational dataset for admin workflows.
 */

import type {
  OpsDeskApproval,
  OpsDeskApprovalsResponseData,
  OpsDeskAuditEvent,
  OpsDeskAuditResponseData,
  OpsDeskIncident,
  OpsDeskIncidentsResponseData,
  OpsDeskMetric,
  OpsDeskOverviewResponseData,
  OpsDeskRequest,
  OpsDeskRequestsResponseData,
  OpsDeskTeam,
  OpsDeskTeamsResponseData,
} from "@portfolio/api-contracts/opsdesk";

const OPSDESK_METRICS: ReadonlyArray<OpsDeskMetric> = [
  {
    id: "open-requests",
    label: "Open Requests",
    value: "18",
    delta: "+4 today",
    detail: "Most load is clustering around permissions and fulfillment changes.",
    tone: "warning",
  },
  {
    id: "approval-queue",
    label: "Approval Queue",
    value: "6",
    delta: "2 overdue",
    detail: "Security review and data retention approvals are holding releases.",
    tone: "critical",
  },
  {
    id: "automation-coverage",
    label: "Automation Coverage",
    value: "79%",
    delta: "+7% MoM",
    detail: "Recent workflow automation reduced manual incident triage steps.",
    tone: "positive",
  },
  {
    id: "sla-health",
    label: "SLA Health",
    value: "94.2%",
    delta: "-1.3%",
    detail: "Two cross-team requests are close to breach and need reassignment.",
    tone: "warning",
  },
];

const OPSDESK_REQUESTS: ReadonlyArray<OpsDeskRequest> = [
  {
    id: "REQ-2481",
    title: "Split admin roles for fulfillment escalations",
    requester: "Nina Ortega",
    team: "Platform",
    priority: "Critical",
    status: "Blocked",
    age: "3d",
    sla: "Breached",
    owner: "Kai Ramos",
  },
  {
    id: "REQ-2478",
    title: "Add release visibility to the marketing content queue",
    requester: "Mira Santos",
    team: "Content",
    priority: "High",
    status: "In Progress",
    age: "1d",
    sla: "Watch",
    owner: "Jules Tan",
  },
  {
    id: "REQ-2472",
    title: "Consolidate merchant health alerts into one operating view",
    requester: "David Cruz",
    team: "Operations",
    priority: "High",
    status: "Queued",
    age: "9h",
    sla: "Healthy",
    owner: "Ina Reyes",
  },
  {
    id: "REQ-2466",
    title: "Expose audit snapshots for bulk approval actions",
    requester: "Sami Navarro",
    team: "Security",
    priority: "Medium",
    status: "Ready for Release",
    age: "4d",
    sla: "Healthy",
    owner: "Miko Valdez",
  },
  {
    id: "REQ-2459",
    title: "Backfill missing warehouse retry reasons",
    requester: "Aria Lim",
    team: "Logistics",
    priority: "Low",
    status: "In Progress",
    age: "2d",
    sla: "Healthy",
    owner: "Paolo Dizon",
  },
];

const OPSDESK_APPROVALS: ReadonlyArray<OpsDeskApproval> = [
  {
    id: "APR-901",
    subject: "Queue retry policy override",
    stage: "Security Review",
    requestedBy: "Platform Reliability",
    owner: "C. Villanueva",
    dueBy: "Today, 16:00",
    risk: "High",
    summary:
      "Overrides the default retry ceiling for fulfillment webhooks while incident tooling is stabilized.",
  },
  {
    id: "APR-897",
    subject: "Content freeze exception for launch page",
    stage: "Editorial Approval",
    requestedBy: "Growth",
    owner: "M. Evangelista",
    dueBy: "Tomorrow, 09:30",
    risk: "Medium",
    summary:
      "Requests a controlled update window for pricing content during the current freeze period.",
  },
  {
    id: "APR-894",
    subject: "Retention policy update for order logs",
    stage: "Compliance Review",
    requestedBy: "Data Platform",
    owner: "L. Bautista",
    dueBy: "Tomorrow, 15:00",
    risk: "High",
    summary:
      "Reduces long-tail log retention after incident exports are copied into the warehouse.",
  },
];

const OPSDESK_TEAMS: ReadonlyArray<OpsDeskTeam> = [
  {
    id: "team-platform",
    name: "Platform",
    lead: "Kai Ramos",
    focus: "Permissions, release controls, and internal tooling foundations.",
    queueHealth: "Busy",
    activeWork: "7 active requests",
    automationCoverage: "82%",
  },
  {
    id: "team-content",
    name: "Content Systems",
    lead: "Jules Tan",
    focus: "Publishing workflow, editorial governance, and preview reliability.",
    queueHealth: "Stable",
    activeWork: "4 active requests",
    automationCoverage: "76%",
  },
  {
    id: "team-ops",
    name: "Operations",
    lead: "Ina Reyes",
    focus: "Queue monitoring, incident routing, and manual intervention tools.",
    queueHealth: "Overloaded",
    activeWork: "5 active incidents",
    automationCoverage: "63%",
  },
  {
    id: "team-security",
    name: "Security",
    lead: "Miko Valdez",
    focus: "Access boundaries, approval guardrails, and audit trace coverage.",
    queueHealth: "Busy",
    activeWork: "3 active reviews",
    automationCoverage: "91%",
  },
];

const OPSDESK_INCIDENTS: ReadonlyArray<OpsDeskIncident> = [
  {
    id: "INC-144",
    name: "Fulfillment retry queue spike",
    status: "Needs Attention",
    service: "Orders API",
    owner: "Ina Reyes",
    nextCheckpoint: "11:30",
  },
  {
    id: "INC-141",
    name: "Approval webhook latency regression",
    status: "Monitoring",
    service: "Workflow Service",
    owner: "Kai Ramos",
    nextCheckpoint: "12:00",
  },
  {
    id: "INC-139",
    name: "Editorial preview token drift",
    status: "Resolved",
    service: "Portfolio API",
    owner: "Jules Tan",
    nextCheckpoint: "Postmortem queued",
  },
];

const OPSDESK_AUDIT_LOG: ReadonlyArray<OpsDeskAuditEvent> = [
  {
    id: "AUD-3201",
    actor: "Kai Ramos",
    action: "approved a production role change for",
    target: "REQ-2481",
    channel: "Security Review",
    timestamp: "10:14",
  },
  {
    id: "AUD-3198",
    actor: "Ina Reyes",
    action: "escalated incident ownership for",
    target: "INC-144",
    channel: "Operations",
    timestamp: "09:52",
  },
  {
    id: "AUD-3194",
    actor: "Jules Tan",
    action: "released editorial preview fixes for",
    target: "APR-897",
    channel: "Content Systems",
    timestamp: "09:16",
  },
  {
    id: "AUD-3189",
    actor: "Miko Valdez",
    action: "requested compliance follow-up on",
    target: "APR-894",
    channel: "Compliance",
    timestamp: "Yesterday",
  },
];

export type OpsDeskService = {
  getOverview: () => Promise<OpsDeskOverviewResponseData>;
  getRequests: () => Promise<OpsDeskRequestsResponseData>;
  getApprovals: () => Promise<OpsDeskApprovalsResponseData>;
  getTeams: () => Promise<OpsDeskTeamsResponseData>;
  getIncidents: () => Promise<OpsDeskIncidentsResponseData>;
  getAuditLog: () => Promise<OpsDeskAuditResponseData>;
};

/** Creates the first OpsDesk service backed by in-memory operational demo data. */
export function createOpsDeskService(): OpsDeskService {
  return {
    getOverview: async () => ({
      metrics: [...OPSDESK_METRICS],
      incidents: [...OPSDESK_INCIDENTS],
      teams: [...OPSDESK_TEAMS],
    }),
    getRequests: async () => [...OPSDESK_REQUESTS],
    getApprovals: async () => [...OPSDESK_APPROVALS],
    getTeams: async () => [...OPSDESK_TEAMS],
    getIncidents: async () => [...OPSDESK_INCIDENTS],
    getAuditLog: async () => [...OPSDESK_AUDIT_LOG],
  };
}
