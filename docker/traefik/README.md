# Local Traefik Assets

This folder contains local edge-proxy support files used by the Traefik Compose overlays:

- `docker/compose/edge.local.yml` (HTTP host routing)
- `docker/compose/edge.tls.local.yml` (optional mkcert-ready TLS overlay)

Contents:

- `docker/traefik/dynamic/`: optional dynamic Traefik config files (for example local TLS cert definitions)
- `docker/traefik/certs/`: local certificate/key files (gitignored except `.gitkeep`)

## mkcert (Optional Local TLS)

Recommended helper (runs `mkcert`, generates certs, and writes `docker/traefik/dynamic/local-tls.yml`):

```bash
make tls-local-setup
```

Manual `mkcert` flow (default domain):

```bash
mkcert \
  guyromellemagayano.test \
  "*.guyromellemagayano.test"
```

Then place the generated files in `docker/traefik/certs/` and copy:

```bash
cp docker/traefik/examples/local-tls.example.yml docker/traefik/dynamic/local-tls.yml
```

Update filenames in `local-tls.yml` if your mkcert output names differ.

Note: the example file is intentionally outside `docker/traefik/dynamic/` so Traefik does not load it before you create a real `local-tls.yml`.
