/**
 * @file apps/admin/src/app/index.tsx
 * @author Guy Romelle Magayano
 * @description OpsDesk admin workspace shell for requests, approvals, teams, and audit visibility.
 */

import { useId, useState } from "react";

import {
  OPS_DESK_APPROVALS,
  OPS_DESK_AUDIT_LOG,
  OPS_DESK_INCIDENTS,
  OPS_DESK_METRICS,
  OPS_DESK_NAV_ITEMS,
  OPS_DESK_REQUESTS,
  OPS_DESK_TEAMS,
  type OpsDeskApproval,
  type OpsDeskIncident,
  type OpsDeskRequest,
  type OpsDeskTeam,
  type OpsDeskTone,
  type OpsDeskView,
} from "./_data/opsdesk.data";

import "./styles.css";

/** Returns the tone class name for metric and status surfaces. */
function getToneClassName(tone: OpsDeskTone) {
  switch (tone) {
    case "positive":
      return "tone-positive";
    case "warning":
      return "tone-warning";
    case "critical":
      return "tone-critical";
    default:
      return "tone-neutral";
  }
}

/** Maps request priority to a reusable badge style. */
function getPriorityClassName(priority: OpsDeskRequest["priority"]) {
  switch (priority) {
    case "Critical":
      return "badge-critical";
    case "High":
      return "badge-warning";
    case "Medium":
      return "badge-neutral";
    default:
      return "badge-positive";
  }
}

/** Maps SLA and load states into one consistent tone system. */
function getHealthClassName(
  status: OpsDeskRequest["sla"] | OpsDeskIncident["status"] | OpsDeskTeam["queueHealth"]
) {
  switch (status) {
    case "Breached":
    case "Needs Attention":
    case "Overloaded":
      return "badge-critical";
    case "Watch":
    case "Monitoring":
    case "Busy":
      return "badge-warning";
    case "Resolved":
    case "Healthy":
    case "Stable":
      return "badge-positive";
    default:
      return "badge-neutral";
  }
}

/** Returns badge styles for approval risk levels. */
function getRiskClassName(risk: OpsDeskApproval["risk"]) {
  switch (risk) {
    case "High":
      return "badge-critical";
    case "Medium":
      return "badge-warning";
    default:
      return "badge-positive";
  }
}

const App = function () {
  const [activeView, setActiveView] = useState<OpsDeskView>("overview");
  const viewId = useId();

  const activeItem =
    OPS_DESK_NAV_ITEMS.find((item) => item.id === activeView) ?? OPS_DESK_NAV_ITEMS[0];
  const activeTabId = `${viewId}-${activeView}-tab`;
  const activePanelId = `${viewId}-${activeView}-panel`;

  return (
    <div className="opsdesk-shell">
      <aside className="opsdesk-sidebar" aria-label="OpsDesk workspace">
        <div className="opsdesk-brand">
          <p className="opsdesk-kicker">Internal Operations Console</p>
          <h1>OpsDesk</h1>
          <p className="opsdesk-sidebar-copy">
            A high-signal admin surface for work intake, approvals, response coordination,
            and operator traceability.
          </p>
        </div>

        <nav aria-label="OpsDesk sections" className="opsdesk-nav">
          <div
            aria-label="OpsDesk views"
            aria-orientation="vertical"
            className="opsdesk-nav-list"
            role="tablist"
          >
            {OPS_DESK_NAV_ITEMS.map((item) => {
              const isActive = item.id === activeView;
              const tabId = `${viewId}-${item.id}-tab`;
              const panelId = `${viewId}-${item.id}-panel`;

              return (
                <button
                  key={item.id}
                  aria-controls={panelId}
                  aria-selected={isActive}
                  className={`opsdesk-nav-item${isActive ? " is-active" : ""}`}
                  id={tabId}
                  onClick={() => setActiveView(item.id)}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  <span className="opsdesk-nav-label-row">
                    <span className="opsdesk-nav-label">{item.label}</span>
                    <span className="opsdesk-nav-badge">{item.badge}</span>
                  </span>
                  <span className="opsdesk-nav-description">{item.description}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <section
          aria-label="Workspace notes"
          className="opsdesk-sidebar-card opsdesk-sidebar-card-compact"
        >
          <p className="opsdesk-sidebar-card-label">Current focus</p>
          <p className="opsdesk-sidebar-card-value">Permission boundaries and release gating</p>
          <p className="opsdesk-sidebar-card-copy">
            Two approval bottlenecks are affecting queue health. Reassignment and automation are
            the immediate levers.
          </p>
        </section>
      </aside>

      <main aria-label="OpsDesk console" className="opsdesk-main">
        <header className="opsdesk-topbar">
          <div>
            <p className="opsdesk-kicker">Monday pulse</p>
            <h2 className="opsdesk-heading">{activeItem.label}</h2>
            <p className="opsdesk-subcopy">{activeItem.description}</p>
          </div>

          <div className="opsdesk-topbar-actions">
            <div
              aria-label="Current environment"
              className="opsdesk-environment"
              role="status"
            >
              Production mirror
            </div>
            <button className="opsdesk-ghost-button" type="button">
              Export snapshot
            </button>
            <button className="opsdesk-primary-button" type="button">
              Escalate blocker
            </button>
          </div>
        </header>

        <section
          aria-labelledby="opsdesk-command-center-heading"
          className="opsdesk-command-center"
          role="region"
        >
          <div>
            <h3 id="opsdesk-command-center-heading" className="opsdesk-section-title">
              Command center
            </h3>
            <p className="opsdesk-section-copy">
              OpsDesk is optimized around everyday internal-tool work: queue triage, approval
              visibility, and intervention-ready operational context.
            </p>
          </div>
          <div className="opsdesk-command-tags" role="list" aria-label="Command center focus">
            {["Access controls", "Queue health", "Approvals", "Audit trace"].map((tag) => (
              <span key={tag} className="opsdesk-chip" role="listitem">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section
          aria-labelledby={activeTabId}
          className="opsdesk-panel"
          id={activePanelId}
          role="tabpanel"
          tabIndex={0}
        >
          <h3 id={`${viewId}-${activeView}-heading`} className="sr-only">
            {activeItem.label}
          </h3>

          {activeView === "overview" ? (
            <div className="opsdesk-overview">
              <div className="opsdesk-metrics-grid" role="list" aria-label="Operational metrics">
                {OPS_DESK_METRICS.map((metric) => (
                  <article
                    key={metric.id}
                    className={`opsdesk-card opsdesk-metric-card ${getToneClassName(metric.tone)}`}
                    role="listitem"
                  >
                    <p className="opsdesk-card-label">{metric.label}</p>
                    <p className="opsdesk-metric-value">{metric.value}</p>
                    <p className="opsdesk-metric-delta">{metric.delta}</p>
                    <p className="opsdesk-card-copy">{metric.detail}</p>
                  </article>
                ))}
              </div>

              <div className="opsdesk-two-column">
                <section
                  aria-labelledby="opsdesk-incidents-heading"
                  className="opsdesk-card"
                  role="region"
                >
                  <div className="opsdesk-card-header">
                    <div>
                      <h4 id="opsdesk-incidents-heading" className="opsdesk-card-title">
                        Incident watch
                      </h4>
                      <p className="opsdesk-card-copy">
                        Active incidents with the next operator checkpoint already attached.
                      </p>
                    </div>
                  </div>

                  <div className="opsdesk-stack">
                    {OPS_DESK_INCIDENTS.map((incident) => (
                      <article key={incident.id} className="opsdesk-list-row">
                        <div>
                          <p className="opsdesk-row-title">{incident.name}</p>
                          <p className="opsdesk-row-meta">
                            {incident.service} · Owner: {incident.owner}
                          </p>
                        </div>
                        <div className="opsdesk-row-trailing">
                          <span className={`opsdesk-badge ${getHealthClassName(incident.status)}`}>
                            {incident.status}
                          </span>
                          <span className="opsdesk-row-meta">{incident.nextCheckpoint}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section
                  aria-labelledby="opsdesk-teams-summary-heading"
                  className="opsdesk-card"
                  role="region"
                >
                  <div className="opsdesk-card-header">
                    <div>
                      <h4 id="opsdesk-teams-summary-heading" className="opsdesk-card-title">
                        Team load
                      </h4>
                      <p className="opsdesk-card-copy">
                        Team ownership surfaces where work is actually accumulating.
                      </p>
                    </div>
                  </div>

                  <div className="opsdesk-stack">
                    {OPS_DESK_TEAMS.map((team) => (
                      <article key={team.id} className="opsdesk-list-row">
                        <div>
                          <p className="opsdesk-row-title">{team.name}</p>
                          <p className="opsdesk-row-meta">
                            {team.activeWork} · Lead: {team.lead}
                          </p>
                        </div>
                        <div className="opsdesk-row-trailing">
                          <span
                            className={`opsdesk-badge ${getHealthClassName(team.queueHealth)}`}
                          >
                            {team.queueHealth}
                          </span>
                          <span className="opsdesk-row-meta">{team.automationCoverage}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ) : null}

          {activeView === "requests" ? (
            <section aria-labelledby="opsdesk-requests-heading" className="opsdesk-card">
              <div className="opsdesk-card-header">
                <div>
                  <h4 id="opsdesk-requests-heading" className="opsdesk-card-title">
                    Request queue
                  </h4>
                  <p className="opsdesk-card-copy">
                    Focused on the mix that most internal teams care about: permissions, delivery,
                    visibility, and operating friction.
                  </p>
                </div>
              </div>

              <div className="opsdesk-table-wrap">
                <table className="opsdesk-table">
                  <caption className="sr-only">OpsDesk request queue</caption>
                  <thead>
                    <tr>
                      <th scope="col">Request</th>
                      <th scope="col">Owner</th>
                      <th scope="col">Priority</th>
                      <th scope="col">Status</th>
                      <th scope="col">SLA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OPS_DESK_REQUESTS.map((request) => (
                      <tr key={request.id}>
                        <td>
                          <div className="opsdesk-table-primary">
                            <span className="opsdesk-table-id">{request.id}</span>
                            <span className="opsdesk-row-title">{request.title}</span>
                            <span className="opsdesk-row-meta">
                              {request.requester} · {request.team} · Age {request.age}
                            </span>
                          </div>
                        </td>
                        <td>{request.owner}</td>
                        <td>
                          <span className={`opsdesk-badge ${getPriorityClassName(request.priority)}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td>{request.status}</td>
                        <td>
                          <span className={`opsdesk-badge ${getHealthClassName(request.sla)}`}>
                            {request.sla}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {activeView === "approvals" ? (
            <section aria-labelledby="opsdesk-approvals-heading" className="opsdesk-card">
              <div className="opsdesk-card-header">
                <div>
                  <h4 id="opsdesk-approvals-heading" className="opsdesk-card-title">
                    Approval queue
                  </h4>
                  <p className="opsdesk-card-copy">
                    The review surfaces are intentionally explicit about owner, risk, and timing so
                    release decisions stay legible.
                  </p>
                </div>
              </div>

              <div className="opsdesk-approval-grid" role="list" aria-label="Approval items">
                {OPS_DESK_APPROVALS.map((approval) => (
                  <article key={approval.id} className="opsdesk-approval-card" role="listitem">
                    <div className="opsdesk-approval-topline">
                      <span className="opsdesk-table-id">{approval.id}</span>
                      <span className={`opsdesk-badge ${getRiskClassName(approval.risk)}`}>
                        {approval.risk} risk
                      </span>
                    </div>
                    <h4 className="opsdesk-row-title">{approval.subject}</h4>
                    <p className="opsdesk-card-copy">{approval.summary}</p>
                    <dl className="opsdesk-meta-grid">
                      <div>
                        <dt>Stage</dt>
                        <dd>{approval.stage}</dd>
                      </div>
                      <div>
                        <dt>Requested by</dt>
                        <dd>{approval.requestedBy}</dd>
                      </div>
                      <div>
                        <dt>Owner</dt>
                        <dd>{approval.owner}</dd>
                      </div>
                      <div>
                        <dt>Due by</dt>
                        <dd>{approval.dueBy}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeView === "teams" ? (
            <section aria-labelledby="opsdesk-teams-heading" className="opsdesk-card">
              <div className="opsdesk-card-header">
                <div>
                  <h4 id="opsdesk-teams-heading" className="opsdesk-card-title">
                    Team ownership
                  </h4>
                  <p className="opsdesk-card-copy">
                    This is where the internal-tool story gets credible: ownership, load, and
                    automation are visible in one place.
                  </p>
                </div>
              </div>

              <div className="opsdesk-team-grid" role="list" aria-label="Team coverage">
                {OPS_DESK_TEAMS.map((team) => (
                  <article key={team.id} className="opsdesk-team-card" role="listitem">
                    <div className="opsdesk-team-header">
                      <div>
                        <h4 className="opsdesk-row-title">{team.name}</h4>
                        <p className="opsdesk-row-meta">Lead: {team.lead}</p>
                      </div>
                      <span className={`opsdesk-badge ${getHealthClassName(team.queueHealth)}`}>
                        {team.queueHealth}
                      </span>
                    </div>
                    <p className="opsdesk-card-copy">{team.focus}</p>
                    <dl className="opsdesk-meta-grid">
                      <div>
                        <dt>Active work</dt>
                        <dd>{team.activeWork}</dd>
                      </div>
                      <div>
                        <dt>Automation coverage</dt>
                        <dd>{team.automationCoverage}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {activeView === "audit" ? (
            <section aria-labelledby="opsdesk-audit-heading" className="opsdesk-card">
              <div className="opsdesk-card-header">
                <div>
                  <h4 id="opsdesk-audit-heading" className="opsdesk-card-title">
                    Audit trail
                  </h4>
                  <p className="opsdesk-card-copy">
                    Operator actions are logged as terse, reviewable events instead of buried in
                    raw system output.
                  </p>
                </div>
              </div>

              <ol className="opsdesk-audit-list">
                {OPS_DESK_AUDIT_LOG.map((event) => (
                  <li key={event.id} className="opsdesk-audit-item">
                    <div className="opsdesk-audit-dot" aria-hidden="true" />
                    <div className="opsdesk-audit-copy">
                      <p className="opsdesk-row-title">
                        {event.actor} {event.action} {event.target}
                      </p>
                      <p className="opsdesk-row-meta">
                        {event.channel} · {event.timestamp}
                      </p>
                    </div>
                    <span className="opsdesk-table-id">{event.id}</span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default App;
