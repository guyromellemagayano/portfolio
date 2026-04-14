"""Route coverage for the local OpsDesk backend."""

from dataclasses import replace
from datetime import datetime, timezone

from httpx import ASGITransport, AsyncClient
import pytest
import pytest_asyncio

from app.api.dependencies import (
    get_health_service,
    get_opsdesk_service,
    get_request_service,
)
from app.core.errors import OpsDeskApiError
from app.main import app
from app.repositories.opsdesk_repository import (
    ApprovalRecord,
    AuditEventRecord,
    IncidentRecord,
    MetricRecord,
    TeamRecord,
)
from app.repositories.request_repository import RequestQueueItem
from app.schemas.health import HealthData, HealthMeta, HealthResponse
from app.services.opsdesk_service import OpsDeskService
from app.services.request_service import RequestService


class StubHealthService:
    """Simple health service stub for route testing."""

    async def get_health_payload(self, correlation_id: str) -> HealthResponse:
        return HealthResponse(
            success=True,
            data=HealthData(
                status="ok",
                database="healthy",
                mode="local-postgresql",
            ),
            meta=HealthMeta(correlationId=correlation_id),
        )


class FakeOpsDeskRepository:
    """In-memory repository for OpsDesk read resources."""

    async def list_metrics(self) -> list[MetricRecord]:
        return [
            MetricRecord(
                id="open-requests",
                label="Open Requests",
                value="18",
                delta="+4 today",
                detail="Most load is clustering around permissions and fulfillment changes.",
                tone="warning",
            )
        ]

    async def list_approvals(self) -> list[ApprovalRecord]:
        return [
            ApprovalRecord(
                id="APR-901",
                subject="Queue retry policy override",
                stage="Security Review",
                requested_by="Platform Reliability",
                owner="C. Villanueva",
                due_by="Today, 16:00",
                risk="High",
                summary="Override retry ceiling while incident tooling stabilizes.",
                status="Pending",
                version=1,
            )
        ]

    async def list_teams(self) -> list[TeamRecord]:
        return [
            TeamRecord(
                id="team-platform",
                name="Platform",
                lead="Kai Ramos",
                focus="Permissions and release controls.",
                queue_health="Busy",
                active_work="7 active requests",
                automation_coverage="82%",
            )
        ]

    async def list_incidents(self) -> list[IncidentRecord]:
        return [
            IncidentRecord(
                id="INC-144",
                name="Fulfillment retry queue spike",
                status="Needs Attention",
                service="Orders API",
                owner="Ina Reyes",
                next_checkpoint="11:30",
            )
        ]

    async def list_audit_events(self, *, limit: int) -> list[AuditEventRecord]:
        return [
            AuditEventRecord(
                id="AUD-3201",
                actor="Kai Ramos",
                action="approved a production role change for",
                target="REQ-2481",
                channel="Security Review",
                created_at=datetime.now(timezone.utc),
            )
        ][:limit]

    async def decide_approval(
        self,
        *,
        approval_id: str,
        decision: str,
        version: int,
        actor: str,
        correlation_id: str,
        idempotency_key: str,
    ) -> ApprovalRecord:
        _ = actor, correlation_id, idempotency_key
        if approval_id != "APR-901":
            raise OpsDeskApiError(
                status_code=404,
                code="OPSDESK_APPROVAL_NOT_FOUND",
                message="OpsDesk approval not found.",
            )
        if version != 1:
            raise OpsDeskApiError(
                status_code=409,
                code="OPSDESK_APPROVAL_VERSION_CONFLICT",
                message="OpsDesk approval version does not match the current record.",
            )

        return ApprovalRecord(
            id="APR-901",
            subject="Queue retry policy override",
            stage="Security Review",
            requested_by="Platform Reliability",
            owner="C. Villanueva",
            due_by="Today, 16:00",
            risk="High",
            summary="Override retry ceiling while incident tooling stabilizes.",
            status="Approved" if decision == "approve" else "Rejected",
            version=2,
        )


class FakeRequestRepository:
    """In-memory request repository covering assignment rules."""

    def __init__(self):
        self._records = {
            "58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8": RequestQueueItem(
                id="58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8",
                request_number="REQ-2481",
                title="Split admin roles for fulfillment escalations",
                requester="Nina Ortega",
                owning_team="Platform",
                priority="Critical",
                status="Blocked",
                sla_state="Breached",
                owner="Kai Ramos",
                created_at=datetime.now(timezone.utc),
                version=3,
            )
        }
        self._idempotent_results: dict[str, RequestQueueItem] = {}

    async def list_queue(self, *, limit: int) -> list[RequestQueueItem]:
        return list(self._records.values())[:limit]

    async def get_request_detail(self, *, request_id: str, audit_limit: int):
        record = self._records.get(request_id)
        if record is None:
            raise OpsDeskApiError(
                status_code=404,
                code="OPSDESK_REQUEST_NOT_FOUND",
                message="OpsDesk request not found.",
            )

        from app.repositories.request_repository import (
            RequestAuditRecord,
            RequestDetailRecord,
        )

        return RequestDetailRecord(
            request=record,
            notes="Permissions model update is waiting on a release-control exception.",
            updated_at=datetime.now(timezone.utc),
            audit_trail=[
                RequestAuditRecord(
                    id="AUD-3201",
                    actor="Kai Ramos",
                    action="approved a production role change for",
                    target=record.request_number,
                    channel="Security Review",
                    created_at=datetime.now(timezone.utc),
                )
            ][:audit_limit],
        )

    async def assign_owner(
        self,
        *,
        request_id: str,
        owner: str,
        version: int,
        actor: str,
        correlation_id: str,
        idempotency_key: str,
    ) -> RequestQueueItem:
        _ = actor, correlation_id
        if idempotency_key in self._idempotent_results:
            return self._idempotent_results[idempotency_key]

        record = self._records.get(request_id)
        if record is None:
            raise OpsDeskApiError(
                status_code=404,
                code="OPSDESK_REQUEST_NOT_FOUND",
                message="OpsDesk request not found.",
            )
        if record.owner == owner:
            raise OpsDeskApiError(
                status_code=409,
                code="OPSDESK_ASSIGNMENT_NO_CHANGE",
                message="OpsDesk request assignment is unchanged.",
            )
        if record.version != version:
            raise OpsDeskApiError(
                status_code=409,
                code="OPSDESK_REQUEST_VERSION_CONFLICT",
                message="OpsDesk request version does not match the current record.",
            )

        updated_record = replace(record, owner=owner, version=record.version + 1)
        self._records[request_id] = updated_record
        self._idempotent_results[idempotency_key] = updated_record
        return updated_record

    async def escalate_request(
        self,
        *,
        request_id: str,
        version: int,
        actor: str,
        correlation_id: str,
        idempotency_key: str,
    ) -> RequestQueueItem:
        _ = actor, correlation_id, idempotency_key
        record = self._records.get(request_id)
        if record is None:
            raise OpsDeskApiError(
                status_code=404,
                code="OPSDESK_REQUEST_NOT_FOUND",
                message="OpsDesk request not found.",
            )
        if record.version != version:
            raise OpsDeskApiError(
                status_code=409,
                code="OPSDESK_REQUEST_VERSION_CONFLICT",
                message="OpsDesk request version does not match the current record.",
            )

        updated_record = replace(
            record,
            owner="Ina Reyes",
            owning_team="Operations",
            version=record.version + 1,
        )
        self._records[request_id] = updated_record
        return updated_record


@pytest_asyncio.fixture
async def client():
    """Create an async client against the FastAPI app with override cleanup."""
    app.dependency_overrides.clear()

    async with AsyncClient(
        base_url="http://testserver",
        transport=ASGITransport(app=app),
    ) as async_client:
        yield async_client

    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_health_route_returns_success_payload(client: AsyncClient):
    app.dependency_overrides[get_health_service] = lambda: StubHealthService()

    response = await client.get(
        "/v1/health", headers={"x-correlation-id": "corr-test-health"}
    )

    assert response.status_code == 200
    assert response.json()["meta"]["correlationId"] == "corr-test-health"


@pytest.mark.asyncio
@pytest.mark.parametrize(
    ("path", "expected_key"),
    [
        ("/v1/overview", "metrics"),
        ("/v1/approvals", "data"),
        ("/v1/teams", "data"),
        ("/v1/incidents", "data"),
        ("/v1/audit", "data"),
    ],
)
async def test_read_routes_return_canonical_payloads(
    client: AsyncClient, path: str, expected_key: str
):
    app.dependency_overrides[get_opsdesk_service] = lambda: OpsDeskService(
        repository=FakeOpsDeskRepository()
    )

    response = await client.get(path, headers={"x-correlation-id": "corr-read-route"})

    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    if path == "/v1/overview":
        assert expected_key in payload["data"]
    else:
        assert expected_key in payload
    assert payload["meta"]["correlationId"] == "corr-read-route"


@pytest.mark.asyncio
async def test_request_queue_route_returns_live_rows(client: AsyncClient):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.get("/v1/requests?limit=25")

    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"][0]["requestNumber"] == "REQ-2481"
    assert payload["data"][0]["version"] == 3


@pytest.mark.asyncio
async def test_request_assignment_success(client: AsyncClient):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.patch(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8/assignment",
        headers={
            "x-correlation-id": "corr-assignment-success",
            "x-opsdesk-actor": "Local Operator",
            "idempotency-key": "assign-key-1",
        },
        json={"owner": "Miko Valdez", "version": 3},
    )

    payload = response.json()
    assert response.status_code == 200
    assert payload["data"]["owner"] == "Miko Valdez"
    assert payload["data"]["version"] == 4


@pytest.mark.asyncio
async def test_request_assignment_requires_actor_header(client: AsyncClient):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.patch(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8/assignment",
        headers={
            "idempotency-key": "assign-key-2",
        },
        json={"owner": "Miko Valdez", "version": 3},
    )

    assert response.status_code == 400
    assert response.json()["error"]["code"] == "OPSDESK_ASSIGNMENT_ACTOR_REQUIRED"


@pytest.mark.asyncio
async def test_request_assignment_requires_idempotency_key(client: AsyncClient):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.patch(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8/assignment",
        headers={
            "x-opsdesk-actor": "Local Operator",
        },
        json={"owner": "Miko Valdez", "version": 3},
    )

    assert response.status_code == 400
    assert response.json()["error"]["code"] == "OPSDESK_IDEMPOTENCY_KEY_REQUIRED"


@pytest.mark.asyncio
async def test_request_assignment_requires_non_blank_owner(client: AsyncClient):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.patch(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8/assignment",
        headers={
            "x-opsdesk-actor": "Local Operator",
            "idempotency-key": "assign-key-3",
        },
        json={"owner": "   ", "version": 3},
    )

    assert response.status_code == 400
    assert response.json()["error"]["code"] == "OPSDESK_REQUEST_OWNER_REQUIRED"


@pytest.mark.asyncio
async def test_request_assignment_rejects_unchanged_owner(client: AsyncClient):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.patch(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8/assignment",
        headers={
            "x-opsdesk-actor": "Local Operator",
            "idempotency-key": "assign-key-4",
        },
        json={"owner": "Kai Ramos", "version": 3},
    )

    assert response.status_code == 409
    assert response.json()["error"]["code"] == "OPSDESK_ASSIGNMENT_NO_CHANGE"


@pytest.mark.asyncio
async def test_request_assignment_rejects_stale_versions(client: AsyncClient):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.patch(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8/assignment",
        headers={
            "x-opsdesk-actor": "Local Operator",
            "idempotency-key": "assign-key-5",
        },
        json={"owner": "Miko Valdez", "version": 2},
    )

    assert response.status_code == 409
    assert response.json()["error"]["code"] == "OPSDESK_REQUEST_VERSION_CONFLICT"


@pytest.mark.asyncio
async def test_request_assignment_returns_not_found_for_unknown_requests(
    client: AsyncClient,
):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.patch(
        "/v1/requests/unknown-request/assignment",
        headers={
            "x-opsdesk-actor": "Local Operator",
            "idempotency-key": "assign-key-6",
        },
        json={"owner": "Miko Valdez", "version": 1},
    )

    assert response.status_code == 404
    assert response.json()["error"]["code"] == "OPSDESK_REQUEST_NOT_FOUND"


@pytest.mark.asyncio
async def test_request_assignment_reuses_idempotent_results(client: AsyncClient):
    repository = FakeRequestRepository()
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=repository
    )

    first_response = await client.patch(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8/assignment",
        headers={
            "x-opsdesk-actor": "Local Operator",
            "idempotency-key": "assign-key-7",
        },
        json={"owner": "Miko Valdez", "version": 3},
    )
    second_response = await client.patch(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8/assignment",
        headers={
            "x-opsdesk-actor": "Local Operator",
            "idempotency-key": "assign-key-7",
        },
        json={"owner": "Miko Valdez", "version": 3},
    )

    assert first_response.status_code == 200
    assert second_response.status_code == 200
    assert first_response.json()["data"] == second_response.json()["data"]


@pytest.mark.asyncio
async def test_request_detail_route_returns_selected_request(client: AsyncClient):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.get(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8",
        headers={"x-correlation-id": "corr-request-detail"},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["data"]["request"]["requestNumber"] == "REQ-2481"
    assert payload["data"]["auditTrail"][0]["id"] == "AUD-3201"


@pytest.mark.asyncio
async def test_request_escalation_updates_owner_and_team(client: AsyncClient):
    app.dependency_overrides[get_request_service] = lambda: RequestService(
        repository=FakeRequestRepository()
    )

    response = await client.patch(
        "/v1/requests/58d266f4-c90a-4ff2-b04c-bb2c33ebc3f8/escalation",
        headers={
            "x-opsdesk-actor": "Local Operator",
            "idempotency-key": "escalate-key-1",
        },
        json={"version": 3},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["data"]["owner"] == "Ina Reyes"
    assert payload["data"]["owningTeam"] == "Operations"
    assert payload["data"]["version"] == 4


@pytest.mark.asyncio
async def test_approval_decision_route_returns_updated_status(client: AsyncClient):
    app.dependency_overrides[get_opsdesk_service] = lambda: OpsDeskService(
        repository=FakeOpsDeskRepository()
    )

    response = await client.patch(
        "/v1/approvals/APR-901/decision",
        headers={
            "x-opsdesk-actor": "Local Operator",
            "idempotency-key": "approval-key-1",
        },
        json={"decision": "approve", "version": 1},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["data"]["status"] == "Approved"
    assert payload["data"]["version"] == 2
