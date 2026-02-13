---
name: new-relic-traces
description: >
  Send distributed tracing data to New Relic via the Trace API. Use this skill when
  submitting trace spans to New Relic, instrumenting distributed tracing, sending
  span data for performance monitoring, or building custom trace exporters. Trigger
  when the user mentions New Relic traces, distributed tracing, New Relic spans,
  trace ingestion, or APM trace data submission.
---

# New Relic Trace API

Send distributed tracing data to New Relic in the `newrelic` format for performance
monitoring and root cause analysis.

## When to Use

- Submitting distributed trace spans to New Relic
- Building custom trace exporters or instrumentation
- Sending trace data from services not covered by auto-instrumentation
- Ingesting span data for performance analysis

## Authentication

Use your **New Relic license key** in the `Api-Key` header:

```
Api-Key: <license_key>
```

## Key Endpoint

**`POST /trace/v1`**

- **US datacenter**: `https://trace-api.newrelic.com/trace/v1`
- **EU datacenter**: `https://trace-api.eu.newrelic.com/trace/v1`

### Required Headers

```
Data-Format: newrelic
Data-Format-Version: 1
Content-Type: application/json
Api-Key: <license_key>
```

## Payload Structure

```json
[
  {
    "common": {
      "attributes": {
        "service.name": "my-service",
        "host": "host123.example.com"
      }
    },
    "spans": [
      {
        "trace.id": "abc123",
        "id": "span-1",
        "timestamp": 1643234829000,
        "attributes": {
          "duration.ms": 150.5,
          "name": "/api/users",
          "parent.id": null
        }
      },
      {
        "trace.id": "abc123",
        "id": "span-2",
        "attributes": {
          "duration.ms": 45.2,
          "name": "/db/query",
          "parent.id": "span-1",
          "service.name": "db-service"
        }
      }
    ]
  }
]
```

## Key Concepts

- **`trace.id`** — Shared by all spans in a trace. Use a unique value per POST to avoid fragmented traces.
- **`id`** — Unique span identifier
- **`parent.id`** — Links to parent span. Omit for root spans. Traces without a root span won't display in the UI.
- **`duration.ms`** — Required. Span duration in milliseconds.
- **`common` block** — Share attributes across all spans; span-level attributes take precedence.
- **`service.name`** — Identifies the entity. If missing, spans are assigned to "UNKNOWN".

## Processing Notes

- Traces may take up to one minute to appear after submission
- Avoid sending the same `trace.id` + `id` combination multiple times
- Span attributes override common block attributes with the same key

## API Reference

For complete schema details including all span attributes, reserved attributes,
and error responses, read `references/openapi.yml`.
