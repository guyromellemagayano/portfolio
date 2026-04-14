/**
 * @file packages/api-contracts/src/opsdesk/index.ts
 * @author Guy Romelle Magayano
 * @description Canonical route constants and payload contracts for OpsDesk resources.
 */

import { API_VERSION_PREFIX } from "../http/routes";

/** Route prefix for OpsDesk resources in the portfolio API. */
export const OPSDESK_ROUTE_PREFIX = `${API_VERSION_PREFIX}/opsdesk`;

/** Route path for the OpsDesk overview resource. */
export const OPSDESK_OVERVIEW_ROUTE = `${OPSDESK_ROUTE_PREFIX}/overview`;

/** Route path for the OpsDesk requests resource. */
export const OPSDESK_REQUESTS_ROUTE = `${OPSDESK_ROUTE_PREFIX}/requests`;
/** Route path template for an individual OpsDesk request resource. */
export const OPSDESK_REQUEST_DETAIL_ROUTE = `${OPSDESK_REQUESTS_ROUTE}/:requestId`;
/** Route path template for an OpsDesk request assignment mutation. */
export const OPSDESK_REQUEST_ASSIGNMENT_ROUTE = `${OPSDESK_REQUEST_DETAIL_ROUTE}/assignment`;
/** Route path template for an OpsDesk request escalation mutation. */
export const OPSDESK_REQUEST_ESCALATION_ROUTE = `${OPSDESK_REQUEST_DETAIL_ROUTE}/escalation`;

/** Route path for the OpsDesk approvals resource. */
export const OPSDESK_APPROVALS_ROUTE = `${OPSDESK_ROUTE_PREFIX}/approvals`;
/** Route path template for an OpsDesk approval decision mutation. */
export const OPSDESK_APPROVAL_DECISION_ROUTE = `${OPSDESK_APPROVALS_ROUTE}/:approvalId/decision`;

/** Route path for the OpsDesk teams resource. */
export const OPSDESK_TEAMS_ROUTE = `${OPSDESK_ROUTE_PREFIX}/teams`;

/** Route path for the OpsDesk incidents resource. */
export const OPSDESK_INCIDENTS_ROUTE = `${OPSDESK_ROUTE_PREFIX}/incidents`;

/** Route path for the OpsDesk audit resource. */
export const OPSDESK_AUDIT_ROUTE = `${OPSDESK_ROUTE_PREFIX}/audit`;

export type OpsDeskTone = "neutral" | "positive" | "warning" | "critical";

export type OpsDeskRequestPriority = "Low" | "Medium" | "High" | "Critical";

export type OpsDeskRequestStatus =
  | "Queued"
  | "In Progress"
  | "Blocked"
  | "Ready for Release";

export type OpsDeskSlaStatus = "Healthy" | "Watch" | "Breached";

export type OpsDeskApprovalRisk = "Low" | "Medium" | "High";
export type OpsDeskApprovalDecision = "approve" | "reject";
export type OpsDeskApprovalStatus = "Pending" | "Approved" | "Rejected";

export type OpsDeskTeamQueueHealth = "Stable" | "Busy" | "Overloaded";

export type OpsDeskIncidentStatus =
  | "Monitoring"
  | "Needs Attention"
  | "Resolved";

/** Canonical metric payload returned by OpsDesk overview endpoints. */
export type OpsDeskMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  detail: string;
  tone: OpsDeskTone;
};

/** Canonical request queue item returned by OpsDesk endpoints. */
export type OpsDeskRequest = {
  id: string;
  requestNumber: string;
  title: string;
  requester: string;
  team: string;
  priority: OpsDeskRequestPriority;
  status: OpsDeskRequestStatus;
  age: string;
  sla: OpsDeskSlaStatus;
  owner: string;
  version: number;
};

/** Canonical approval queue item returned by OpsDesk endpoints. */
export type OpsDeskApproval = {
  id: string;
  subject: string;
  stage: string;
  requestedBy: string;
  owner: string;
  dueBy: string;
  risk: OpsDeskApprovalRisk;
  summary: string;
  status: OpsDeskApprovalStatus;
  version: number;
};

/** Canonical team workload item returned by OpsDesk endpoints. */
export type OpsDeskTeam = {
  id: string;
  name: string;
  lead: string;
  focus: string;
  queueHealth: OpsDeskTeamQueueHealth;
  activeWork: string;
  automationCoverage: string;
};

/** Canonical incident row returned by OpsDesk endpoints. */
export type OpsDeskIncident = {
  id: string;
  name: string;
  status: OpsDeskIncidentStatus;
  service: string;
  owner: string;
  nextCheckpoint: string;
};

/** Canonical audit event row returned by OpsDesk endpoints. */
export type OpsDeskAuditEvent = {
  id: string;
  actor: string;
  action: string;
  target: string;
  channel: string;
  timestamp: string;
};

/** Canonical request detail payload returned by OpsDesk. */
export type OpsDeskRequestDetailResponseData = {
  request: OpsDeskRequest & {
    notes: string;
    updatedAt: string;
  };
  auditTrail: OpsDeskAuditEvent[];
};

/** Canonical overview payload returned by the OpsDesk overview endpoint. */
export type OpsDeskOverviewResponseData = {
  metrics: OpsDeskMetric[];
  incidents: OpsDeskIncident[];
  teams: OpsDeskTeam[];
};

/** Canonical request collection payload returned by OpsDesk. */
export type OpsDeskRequestsResponseData = OpsDeskRequest[];

/** Canonical request assignment payload accepted by OpsDesk. */
export type OpsDeskAssignRequestOwnerRequest = {
  owner: string;
  version: number;
};

/** Canonical request assignment payload returned by OpsDesk. */
export type OpsDeskAssignRequestOwnerResponseData = OpsDeskRequest;

/** Canonical request escalation payload accepted by OpsDesk. */
export type OpsDeskEscalateRequestRequest = {
  version: number;
};

/** Canonical request escalation payload returned by OpsDesk. */
export type OpsDeskEscalateRequestResponseData = OpsDeskRequest;

/** Canonical approval collection payload returned by OpsDesk. */
export type OpsDeskApprovalsResponseData = OpsDeskApproval[];

/** Canonical approval decision payload accepted by OpsDesk. */
export type OpsDeskApprovalDecisionRequest = {
  decision: OpsDeskApprovalDecision;
  version: number;
};

/** Canonical approval decision payload returned by OpsDesk. */
export type OpsDeskApprovalDecisionResponseData = OpsDeskApproval;

/** Canonical team collection payload returned by OpsDesk. */
export type OpsDeskTeamsResponseData = OpsDeskTeam[];

/** Canonical incident collection payload returned by OpsDesk. */
export type OpsDeskIncidentsResponseData = OpsDeskIncident[];

/** Canonical audit collection payload returned by OpsDesk. */
export type OpsDeskAuditResponseData = OpsDeskAuditEvent[];
