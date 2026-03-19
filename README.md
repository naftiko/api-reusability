# API Reusability

Discover, measure, and increase reuse of existing APIs across your organization using the Naftiko v0.5 capability framework. This project breaks API reusability into three capability areas — **Discover**, **Report**, and **Generate** — each exposed as HTTP, MCP, and Agent Skill adapters.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DISCOVER                                 │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ GitHub Repos   │  │ Kong Gateway │  │ AWS API Gateway      │  │
│  │ (OpenAPI specs)│  │ (Admin API)  │  │ (REST APIs/resources)│  │
│  └───────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│          └─────────────────┼─────────────────────┘              │
│                            ▼                                    │
│                  Normalized API Inventory                       │
│          (paths, operations, parameters, schemas)               │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────────────┐
│      REPORT      │ │   GENERATE   │ │                          │
│  ┌────────────┐  │ │  Naftiko v0.5│ │  Reuse across adapters:  │
│  │ Datadog    │  │ │  consumes    │ │  • HTTP endpoints        │
│  │ New Relic  │  │ │  adapters    │ │  • MCP tools             │
│  │ Splunk     │  │ │  + capability│ │  • Agent Skills          │
│  │ Notion     │  │ │  wrappers    │ │                          │
│  └────────────┘  │ └──────────────┘ └──────────────────────────┘
└──────────────────┘
```

---

## Capabilities

### Discovery (3 capabilities)

| Capability | Source | What It Extracts |
|------------|--------|-----------------|
| [discover-apis-github](examples/discover-apis-github.yml) | GitHub Repositories | OpenAPI/Swagger specs → paths, operations, parameters, schemas |
| [discover-apis-kong](examples/discover-apis-kong.yml) | Kong API Gateway | Services, routes, plugins → paths, methods, auth schemes |
| [discover-apis-aws](examples/discover-apis-aws.yml) | AWS API Gateway | REST APIs, resources, methods, models, stages |

### Reporting (4 capabilities)

| Capability | Target | What It Publishes |
|------------|--------|------------------|
| [report-reuse-datadog](examples/report-reuse-datadog.yml) | Datadog Dashboard | Custom metrics: path overlap rate, schema duplication, parameter patterns |
| [report-reuse-newrelic](examples/report-reuse-newrelic.yml) | New Relic Dashboard | Deployment markers + custom events for reuse scan results |
| [report-reuse-splunk](examples/report-reuse-splunk.yml) | Splunk Dashboard | Indexed events with sourcetype=api_reuse_scan for SPL queries |
| [report-reuse-notion](examples/report-reuse-notion.yml) | Notion Page | Structured report with tables, callouts, and recommendations |

### Generation (1 capability)

| Capability | Output | What It Produces |
|------------|--------|-----------------|
| [generate-naftiko-adapters](examples/generate-naftiko-adapters.yml) | GitHub Repository | Naftiko v0.5 consumes YAML + capability wrappers (HTTP, MCP, Agent Skill) |

---

## Shared Adapters

New adapters created for this project (complement the 31 adapters in the [capabilities repo](../capabilities/shared/)):

| Adapter | Service |
|---------|---------|
| [consumes-kong.yml](shared/consumes-kong.yml) | Kong Admin API — services, routes, plugins |
| [consumes-aws-apigateway.yml](shared/consumes-aws-apigateway.yml) | AWS API Gateway — REST APIs, resources, methods, models, stages, export |

Existing adapters consumed from the capabilities repo:

- `consumes-github.yml` — GitHub REST API v3
- `consumes-datadog.yml` — Datadog API v1/v2
- `consumes-newrelic.yml` — New Relic REST API v2
- `consumes-splunk.yml` — Splunk REST API
- `consumes-notion.yml` — Notion REST API v1

---

## Exposure Modes

Every capability is exposed three ways, aligned with the Naftiko framework:

| Mode | Description |
|------|-------------|
| **HTTP** | REST endpoint (e.g. `POST /discover/github`) for direct integration |
| **MCP** | Model Context Protocol tool under the `api-reusability` namespace |
| **Agent Skill** | Agent skill adapter for agentic orchestration workflows |

---

## Reuse Metrics

The reporting capabilities measure and track:

- **Path Overlap Rate** — % of API paths that appear across multiple services
- **Schema Duplication** — count of identical or near-identical JSON Schema definitions
- **Parameter Patterns** — commonly repeated query/header/path parameters
- **Header Reuse** — shared authentication and content-type headers
- **Consolidation Opportunities** — recommendations for shared adapter creation

---

## Relationship to Capabilities Repo

This project builds on the [capabilities](../capabilities/) repo:

- Uses the same **Naftiko v0.5 schema** (`naftiko-schema.json`)
- Follows the same **directory structure** (`examples/` for capabilities, `shared/` for consumes adapters)
- **Imports shared adapters** from the capabilities repo (GitHub, Datadog, New Relic, Splunk, Notion)
- **Adds new shared adapters** (Kong, AWS API Gateway) that could be contributed back
- Each capability uses the same `exposes` / `consumes` / `steps` pattern
