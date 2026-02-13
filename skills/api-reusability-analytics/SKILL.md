---
name: api-reusability-analytics
description: >
  Retrieve analytics about API path and schema reuse patterns across an API catalog.
  Use this skill when analyzing API reusability, checking which paths or schemas are
  shared across multiple APIs, auditing API design consistency, or generating reuse
  reports. Trigger when the user mentions API reusability, path reuse, schema reuse,
  API catalog analytics, or needs to assess API design patterns across a portfolio.
---

# API Reusability Analytics

Retrieve analytics about API paths and schemas, including usage statistics and
reuse patterns across an API catalog.

## When to Use

- Analyzing which API paths are reused across multiple APIs
- Identifying shared schemas and their usage counts
- Auditing API design consistency across a catalog
- Generating reuse and standardization reports

## Authentication

Use an **API key** in the `X-API-Key` header:

```
X-API-Key: <your_api_key>
```

## Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/paths` | GET | List all API paths in the catalog |
| `/paths/reuse` | GET | Get path reuse statistics |
| `/paths/all` | GET | All paths with additional metadata |
| `/schemas` | GET | List all schemas in the catalog |
| `/schemas/reuse` | GET | Get schema reuse statistics (with counts) |
| `/schemas/all` | GET | All schemas with additional metadata |
| `/catalog` | GET | Complete analytics (paths + schemas + reuse) |

## Quick Start

For a comprehensive overview, use the **`/catalog`** endpoint which returns
everything in one call: all paths, all schemas, and reuse statistics for both.

## Response Patterns

**Path reuse** returns items with `path` and `count` (minimum count of 2):
```json
{"reuse": [{"path": "/users", "count": 5}]}
```

**Schema reuse** returns items with `schema` and `count`:
```json
{"reuse": [{"schema": "Error", "count": 12}, {"schema": "Meta", "count": 4}]}
```

## API Reference

For complete schema details including all response fields and error codes,
read `references/openapi.yml`.
