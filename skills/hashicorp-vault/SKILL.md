---
name: hashicorp-vault
description: >
  Manage secrets and check system health via the HashiCorp Vault HTTP API. Use this
  skill when reading, writing, or managing secrets in Vault, checking Vault health
  status, working with KV secrets engines (v1 and v2), or managing secret metadata
  and versions. Trigger when the user mentions HashiCorp Vault, Vault secrets, Vault
  KV engine, secret management, Vault API, or needs to store/retrieve sensitive
  configuration data.
---

# HashiCorp Vault HTTP API

Full access to HashiCorp Vault via REST-like HTTP API for secrets management
and system health monitoring.

## When to Use

- Reading and writing secrets (KV v1 and v2 engines)
- Checking Vault health and seal status
- Managing secret versions (delete, undelete, destroy)
- Working with secret metadata
- Listing secrets at a path

## Authentication

Send a client token via either header:

```
X-Vault-Token: <vault_token>
Authorization: Bearer <vault_token>
```

For Enterprise namespaces, include:
```
X-Vault-Namespace: admin
```

## System Health

**`GET /sys/health`** — Returns Vault status (initialized, sealed, standby).
Returns different HTTP status codes based on state (200 = active, 429 = standby,
472 = performance standby, 501 = not initialized, 503 = sealed).

## KV Secrets Engine v1

Simple key-value storage without versioning:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/secret/{path}` | GET | Read a secret |
| `/secret/{path}` | POST/PUT | Create or update a secret |
| `/secret/{path}` | DELETE | Delete a secret |
| `/secret/` | LIST | List secrets at root |

## KV Secrets Engine v2

Versioned key-value storage with full lifecycle management:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/secret/data/{path}` | GET | Read secret (latest or specific version) |
| `/secret/data/{path}` | POST | Create/update secret (new version) |
| `/secret/delete/{path}` | POST | Soft-delete version(s) |
| `/secret/undelete/{path}` | POST | Restore soft-deleted version(s) |
| `/secret/destroy/{path}` | POST | Permanently destroy version(s) |
| `/secret/metadata/{path}` | GET | Read secret metadata |
| `/secret/metadata/{path}` | POST | Update metadata settings |
| `/secret/metadata/{path}` | DELETE | Delete all versions and metadata |
| `/secret/metadata/` | LIST | List secrets at root |

## KV v2 Read Options

Use query parameters for version control:
- `version` — Specific version number to read
- Response wraps data in `data.data` with `metadata` including `version`, `created_time`, `destroyed`, `deletion_time`

## Check-and-Set (CAS)

KV v2 supports optimistic locking via `cas` parameter in write options.
Set `cas` to the current version number to prevent concurrent overwrites.

## API Reference

For complete schema details including all endpoints, request/response bodies,
error codes, and version management, read `references/openapi.yml`.
