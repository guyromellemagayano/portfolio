# `api-opsdesk` Bruno Collection

Local Bruno collection for testing the `api-opsdesk` service without relying on a hosted workspace.

## Included Requests

- `Health` -> `GET /v1/health`
- `Requests` -> `GET /v1/requests?limit={{requestLimit}}`

## Local Usage

1. Start the local backend:

```bash
make up-opsdesk
```

1. Open Bruno and choose `Open Collection`.
1. Select this folder:

```text
apps/api-opsdesk/bruno
```

1. Select the `local` environment.
1. Run `Health` or `Requests`.

## Environment

The committed local environment lives in:

```text
apps/api-opsdesk/bruno/environments/local.bru
```

Defaults:

- `host=http://localhost:8010`
- `requestLimit=5`

If you need a different local port or tunnel, duplicate `local.bru` and adjust `host`.
