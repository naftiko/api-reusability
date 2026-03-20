# API Reusability

Discover, measure, and increase reuse of existing APIs across your organization using the Naftiko v0.5 capability framework. This project breaks API reusability into three capability areas — **Discover**, **Report**, and **Generate** — each exposed as HTTP, MCP, and Agent Skill adapters.

See [ROADMAP.md](ROADMAP.md) for planned capability expansions across Search, Enrich, Govern, Cost, Credentials, and Developer Experience.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          DISCOVER (10)                               │
│  GitHub  Kong  AWS  Backstage  Apigee  Azure APIM  Postman  Bruno  │
│  HAR  SwaggerHub                                                    │
└────────────────────────────────┬────────────────────────────────────┘
                                 ▼
                    Normalized API Inventory
              (paths, operations, parameters, schemas)
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐
│   REPORT (8)     │  │   GENERATE (1)   │  │                          │
│  Datadog         │  │  Naftiko v0.5    │  │  Reuse across adapters:  │
│  New Relic       │  │  consumes        │  │  • HTTP endpoints        │
│  Splunk          │  │  adapters        │  │  • MCP tools             │
│  Notion          │  │  + capability    │  │  • Agent Skills          │
│  Confluence      │  │  wrappers        │  │                          │
│  Power BI        │  └──────────────────┘  └──────────────────────────┘
│  Backstage       │
│  Slack           │
└──────────────────┘
```

---

## Capabilities

### Discovery (10 capabilities)

| Capability | Source | What It Extracts |
|------------|--------|-----------------|
| [discover-apis-github](examples/discover-apis-github.yml) | GitHub Repositories | OpenAPI/Swagger specs → paths, operations, parameters, schemas |
| [discover-apis-kong](examples/discover-apis-kong.yml) | Kong API Gateway | Services, routes, plugins → paths, methods, auth schemes |
| [discover-apis-aws](examples/discover-apis-aws.yml) | AWS API Gateway | REST APIs, resources, methods, models, stages |
| [discover-apis-backstage](examples/discover-apis-backstage.yml) | Backstage Catalog | Catalog entities, component metadata, ownership, lifecycle status, specs |
| [discover-apis-apigee](examples/discover-apis-apigee.yml) | Google Apigee | API proxies, products, environments, deployed revisions, traffic policies |
| [discover-apis-azure-apim](examples/discover-apis-azure-apim.yml) | Azure API Management | APIs, operations, products, subscriptions, policy configurations |
| [discover-apis-postman](examples/discover-apis-postman.yml) | Postman Collections | Collections, requests, environments, variables, authentication schemes |
| [discover-apis-bruno](examples/discover-apis-bruno.yml) | Bruno Collections | Request definitions, environments, variables from Git-native collections |
| [discover-apis-har](examples/discover-apis-har.yml) | HAR Files (Traffic) | Evidence-based API inventory from actual HTTP traffic captures |
| [discover-apis-swaggerhub](examples/discover-apis-swaggerhub.yml) | SwaggerHub | Published API specs, versions, domains, paths, operations, schemas |

### Reporting (8 capabilities)

| Capability | Target | What It Publishes |
|------------|--------|------------------|
| [report-reuse-datadog](examples/report-reuse-datadog.yml) | Datadog Dashboard | Custom metrics: path overlap rate, schema duplication, parameter patterns |
| [report-reuse-newrelic](examples/report-reuse-newrelic.yml) | New Relic Dashboard | Deployment markers + custom events for reuse scan results |
| [report-reuse-splunk](examples/report-reuse-splunk.yml) | Splunk Dashboard | Indexed events with sourcetype=api_reuse_scan for SPL queries |
| [report-reuse-notion](examples/report-reuse-notion.yml) | Notion Page | Structured report with tables, callouts, and recommendations |
| [report-reuse-confluence](examples/report-reuse-confluence.yml) | Confluence Page | Structured reuse reports with tables, status macros, and recommendations |
| [report-reuse-powerbi](examples/report-reuse-powerbi.yml) | Power BI Dashboard | Executive dashboards with reuse trends, cost savings, business outcomes |
| [report-reuse-backstage](examples/report-reuse-backstage.yml) | Backstage Scorecard | Reusability scores and governance compliance as entity annotations |
| [report-reuse-slack](examples/report-reuse-slack.yml) | Slack Channel | Reuse alerts, duplicate warnings, and consolidation recommendations |

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
| [consumes-backstage.yml](shared/consumes-backstage.yml) | Backstage Software Catalog API — entities, metadata, annotations |
| [consumes-apigee.yml](shared/consumes-apigee.yml) | Apigee Management API — proxies, products, deployments |
| [consumes-azure-apim.yml](shared/consumes-azure-apim.yml) | Azure API Management REST API — APIs, operations, products |
| [consumes-postman.yml](shared/consumes-postman.yml) | Postman API v10 — collections, requests, environments |
| [consumes-swaggerhub.yml](shared/consumes-swaggerhub.yml) | SwaggerHub Registry API — specs, versions, definitions |

Existing adapters consumed from the capabilities repo:

- `consumes-github.yml` — GitHub REST API v3 (also used by Bruno discovery)
- `consumes-datadog.yml` — Datadog API v1/v2
- `consumes-newrelic.yml` — New Relic REST API v2
- `consumes-splunk.yml` — Splunk REST API
- `consumes-notion.yml` — Notion REST API v1
- `consumes-confluence.yml` — Confluence REST API
- `consumes-powerbi.yml` — Power BI REST API
- `consumes-slack.yml` — Slack Web API

---

## Exposure Modes

Every capability is exposed three ways, aligned with the Naftiko framework:

| Mode | Description |
|------|-------------|
| **HTTP** | REST endpoint (e.g. `POST /discover/github`) for direct integration |
| **MCP** | Model Context Protocol tool under the `api-reusability` namespace |
| **Agent Skill** | Agent skill adapter for agentic orchestration workflows |

