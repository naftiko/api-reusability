# API Reusability Capability Roadmap

This roadmap tracks planned capability expansions for the API reusability use case beyond the current **Discover → Report → Generate** architecture. The full lifecycle target is: **Discover → Search → Enrich → Govern → Report → Cost → Credentials → Developer Experience → Generate**.

Each proposed capability follows the same Naftiko v0.5 schema, directory structure, and triple-exposure pattern (HTTP, MCP, Agent Skill) as the existing capabilities.

---

## Current State (19 Capabilities)

| Area | Count | Capabilities |
|---|---|---|
| **Discover** | 10 | GitHub, Kong, AWS API Gateway, Backstage, Apigee, Azure APIM, Postman, Bruno, HAR, SwaggerHub |
| **Report** | 8 | Datadog, New Relic, Splunk, Notion, Confluence, Power BI, Backstage, Slack |
| **Generate** | 1 | Naftiko Adapters |

---

## 1. Semantic Discovery (New Area)

Traditional filter-based catalog search doesn't match how developers think about problems. Developers can't describe "what I'm trying to do" and get matched APIs — they must already know what to search for. Semantic discovery closes that gap and enables duplicate detection.

| Capability | What It Does |
|---|---|
| `search-apis-semantic` | Intent-based search across normalized API inventory — developers describe what they need ("send a customer notification") and get ranked matches with confidence scores |
| `search-apis-schema-similarity` | Find APIs with similar or identical schemas across the inventory to surface data element reuse and consolidation opportunities |
| `search-apis-duplicates` | Detect duplicate or overlapping API paths, operations, and schemas across teams to quantify duplication and recommend consolidation |

**MRD Problems Addressed:**

- Problem 9: Need semantic search for API and MCP discovery — "no way to get a 60, 70, 80, 90% match score"
- Problem 20: Need reuse metrics that connect to business outcomes
- Problem 21b: Need artifact and data element reuse across APIs — not just whole API reuse

**Design Partner Sources:** Chase (semantic search for API marketplace), Avalara (teams rebuilding because discovery is ineffective), CNT (intent-based capability discovery)

---

## 2. Enrichment (New Area)

Raw specs aren't reuse-ready. Thin summaries, missing descriptions, absent examples, and human-only documentation all undermine both developer discovery and AI agent performance. Enrichment capabilities prepare APIs for effective reuse by humans and machines.

| Capability | What It Does |
|---|---|
| `enrich-openapi-metadata` | AI-powered enrichment of summaries, descriptions, examples, and tags on OpenAPI specs — filling gaps that governance rules flag but can't fix |
| `enrich-openapi-ai-docs` | Rewrite API documentation for AI-first consumption — explicit context, disambiguated parameters, task-oriented framing instead of reference-style docs |
| `enrich-openapi-business-mapping` | Map API paths and operations to business capabilities and domains — connecting technical inventory to business capability model |
| `enrich-openapi-examples` | Generate request/response examples for each operation from schema definitions — critical for both developer onboarding and agent context |

**MRD Problems Addressed:**

- Problem 10: Need AI-powered enrichment of OpenAPI metadata — "6 lookup APIs with crappy documentation, how does AI know which one to call?"
- Problem 22: Need to map APIs to products and business capabilities
- Problem 25: Need API documentation rewritten for AI-first consumption — "talking to a computer that speaks human as a second language"
- Problem 26: Need task-oriented MCP tools, not 1:1 API endpoint mapping

**Design Partner Sources:** Chase (metadata quality for AI), Avalara (documentation as the barrier to reuse), Ford (AI-first documentation requirements)

---

## 3. Governance (New Area)

Governance enables reuse when it's embedded in developer workflows as a golden path, not bolted on as a late-stage gate. These capabilities bring governance into the reusability loop — scoring readiness, tracking reviews, distributing rules, and assessing reuse potential during architecture review.

| Capability | What It Does |
|---|---|
| `govern-openapi-lint` | Run Spectral/vacuum rules against discovered specs and score governance compliance — surfaceable via MCP in IDE and copilot |
| `govern-review-track` | Record governance review results (API ID, review date, submitter, spec version, rules version, issue counts) and publish to observability tools |
| `govern-reuse-assessment` | Score discovered APIs on reusability readiness — documentation completeness, schema consistency, example coverage, ownership clarity |
| `govern-rules-distribute` | Distribute and version governance rules across environments including restricted and air-gapped deployments |

**MRD Problems Addressed:**

- Problem 15: Need governance rules available in coding assistants via MCP
- Problem 16: Need governance rule distribution in restricted environments
- Problem 17: Need governance review tracking and reporting
- Problem 18: Need to define what "reuse" actually means at the organization level
- Problem 22: Need reuse assessment built into architecture review process
- Problem 30: Need governance framed as a "golden path," not a gate
- Problem 31: Need to avoid "rules in the pipeline = governance" oversimplification

**Design Partner Sources:** Chase (Spectral rules, governance review tracking), Bloomberg (governance as enablement), BNP Paribas (restricted environment distribution)

---

## 4. Cost Attribution (New Area)

The messaging pillar on **Cost** and multiple problem statements make cost tracking a direct enabler of the reuse argument. Leadership demands measurable savings — cost attribution connects reuse metrics to financial outcomes.

| Capability | What It Does |
|---|---|
| `track-cost-3rdparty-apis` | Aggregate and attribute spend across 3rd-party API providers by team, domain, and capability — surfacing where money goes |
| `track-cost-duplication` | Calculate the cost of duplicate APIs and integrations — quantifying what consolidation through reuse would save |
| `track-cost-consolidation-roi` | Model ROI of consolidating overlapping APIs into shared capabilities — projected savings, reduced maintenance, volume discount potential |

**MRD Problems Addressed:**

- Problem 7: Need AI FinOps — cost visibility and control across AI services
- Problem 24: Need to manage spend across all 3rd-party APIs — not just AI

**Design Partner Sources:** Ford (total cost of ownership visibility), Chase (cost attribution by domain), P&G (vendor negotiation leverage)

---

## 5. Credential & Access Management (New Area)

Reuse can't happen if teams can't safely access existing APIs. Centralized credential management removes a key blocker — teams get tokens from an internal gateway instead of independently obtaining credentials from each provider.

| Capability | What It Does |
|---|---|
| `manage-credentials-3rdparty` | Centralize credential management for 3rd-party APIs — teams obtain tokens from internal gateway with rotation, scope, and audit |
| `manage-access-catalog` | Track which teams have access to which APIs and credentials across the organization — prerequisite for safe cross-team reuse |

**MRD Problems Addressed:**

- Problem 23: Need centralized credential management for 3rd-party API access
- Problem 28: Need to know who is actually calling APIs after handoff

**Design Partner Sources:** Chase (centralized credential policy), Goldman Sachs (access management at scale)

---

## 6. Developer Experience (New Area)

The messaging repeatedly says "meet developers where they work." These capabilities surface reuse opportunities directly in the IDE and PR workflow — where developers make integration decisions — instead of requiring them to visit a separate portal.

| Capability | What It Does |
|---|---|
| `surface-reuse-ide` | Expose discovered capabilities as IDE and copilot suggestions when developers create new integrations — inline discovery at decision time |
| `surface-reuse-pr-check` | PR-level check that flags when new code duplicates an existing capability — 72% of PR-level notifications get fixed immediately |

**MRD Problems Addressed:**

- Problem 2: Need to incentivize developers to reuse APIs when developing — in IDE and copilot
- Problem 19: Need discoverability, not just governance — the real barrier to reuse

**Design Partner Sources:** Cvent (copilot-embedded discovery), Chase (MCP servers from catalog for copilot), Avalara (developer workflow integration)

---

## Capability Summary

| Area | Built | Proposed | Total |
|---|---|---|---|
| **Discover** | 10 | 0 | 10 |
| **Search** | 0 | 3 | 3 |
| **Enrich** | 0 | 4 | 4 |
| **Govern** | 0 | 4 | 4 |
| **Report** | 8 | 0 | 8 |
| **Cost** | 0 | 3 | 3 |
| **Credentials** | 0 | 2 | 2 |
| **Developer Experience** | 0 | 2 | 2 |
| **Generate** | 1 | 0 | 1 |
| **Total** | **19** | **18** | **37** |

---

## Full Lifecycle Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          DISCOVER (10)                               │
│  GitHub  Kong  AWS  Backstage  Apigee  Azure  Postman  Bruno  HAR  │
│  SwaggerHub                                                         │
└────────────────────────────────┬────────────────────────────────────┘
                                 ▼
                    Normalized API Inventory
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   SEARCH (3)     │ │   ENRICH (4)     │ │   GOVERN (4)     │
│ Semantic         │ │ Metadata         │ │ Lint             │
│ Schema Similarity│ │ AI Docs          │ │ Review Track     │
│ Duplicates       │ │ Business Mapping │ │ Reuse Assessment │
│                  │ │ Examples         │ │ Rules Distribute │
└────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
         └────────────────────┼────────────────────┘
                              ▼
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   REPORT (8)     │ │    COST (3)      │ │ CREDENTIALS (2)  │
│ Datadog          │ │ 3rd-Party Spend  │ │ 3rd-Party Creds  │
│ New Relic        │ │ Duplication Cost  │ │ Access Catalog   │
│ Splunk           │ │ Consolidation ROI│ └──────────────────┘
│ Notion           │ └──────────────────┘
│ Confluence       │          ┌──────────────────┐
│ Power BI         │          │      DX (2)      │
│ Backstage        │          │ IDE Surface      │
│ Slack            │          │ PR Check         │
└──────────────────┘          └──────────────────┘
                              ▼
                    ┌──────────────────┐
                    │  GENERATE (1)    │
                    │ Naftiko Adapters │
                    └──────────────────┘
```

---

## Shared Adapters Required

New shared adapters still needed:

| Adapter | Service | Area |
|---|---|---|
| `consumes-spectral.yml` | Spectral/vacuum linting engine | Govern |

Already built in this project (`shared/`):

- `consumes-kong.yml`, `consumes-aws-apigateway.yml` (original)
- `consumes-backstage.yml`, `consumes-apigee.yml`, `consumes-azure-apim.yml`, `consumes-postman.yml`, `consumes-swaggerhub.yml` (new)

Existing adapters consumed from the capabilities repo:

- `consumes-github.yml` (Discover: GitHub, Bruno)
- `consumes-datadog.yml`, `consumes-newrelic.yml`, `consumes-splunk.yml`, `consumes-notion.yml` (Report)
- `consumes-confluence.yml`, `consumes-powerbi.yml`, `consumes-slack.yml` (Report)

---

## MRD Problem Coverage

| Problem | Description | Capabilities |
|---|---|---|
| 2 | Quantify and incentivize API reuse | Report (all) **BUILT**, DX (all) |
| 7 | AI FinOps — cost visibility and control | Cost (all) |
| 9 | Semantic search for API and MCP discovery | Search (semantic, duplicates) |
| 10 | AI-powered enrichment of OpenAPI metadata | Enrich (metadata, examples) |
| 14 | Auto-discovery of API artifacts | Discover (Backstage, Bruno, Postman) **BUILT** |
| 15 | Governance rules in coding assistants via MCP | Govern (lint, rules distribute) |
| 16 | Governance rule distribution in restricted environments | Govern (rules distribute) |
| 17 | Governance review tracking and reporting | Govern (review track) |
| 18 | Define what "reuse" means at org level | Govern (reuse assessment) |
| 19 | Discoverability as the real barrier to reuse | Search (semantic), DX (IDE surface) |
| 20 | Reuse metrics that connect to business outcomes | Report (Power BI, Backstage) **BUILT**, Cost (all) |
| 21 | Discover and govern shadow API gateways | Discover (AWS, Azure, Apigee) **BUILT** |
| 21b | Artifact and data element reuse across APIs | Search (schema similarity), Enrich (business mapping) |
| 22 | Map APIs to products and business capabilities | Enrich (business mapping), Govern (reuse assessment) |
| 23 | Central catalog of 3rd-party APIs | Discover (Postman, SwaggerHub) **BUILT**, Credentials (all) |
| 24 | Manage spend across all 3rd-party APIs | Cost (3rd-party spend, duplication) |
| 25 | API documentation rewritten for AI-first consumption | Enrich (AI docs) |
| 26 | Task-oriented MCP tools, not 1:1 endpoint mapping | Enrich (AI docs, business mapping) |
| 27 | Evidence-based OpenAPI generation from traffic | Discover (HAR) **BUILT** |
| 28 | Know who is calling APIs after handoff | Credentials (access catalog) |
| 30 | Governance as golden path, not gate | Govern (lint, reuse assessment), DX (PR check) |
| 31 | Avoid "rules in pipeline = governance" | Govern (all) |
