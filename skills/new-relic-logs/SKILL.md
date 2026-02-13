---
name: new-relic-logs
description: >
  Send log data to New Relic via the Log API for centralized log management. Use this
  skill when ingesting logs into New Relic, forwarding application logs via HTTP,
  sending structured or unstructured log entries, or batch-submitting log data. Trigger
  when the user mentions New Relic logs, New Relic log ingestion, sending logs to New
  Relic, log forwarding, or centralized logging with New Relic.
---

# New Relic Log API

Send log data directly to New Relic via HTTP endpoints for centralized log management
and analysis.

## When to Use

- Sending application logs to New Relic
- Forwarding structured log data via HTTP
- Batch-submitting log entries with shared attributes
- Custom log ingestion when standard forwarders don't fit

## Authentication

Use your **New Relic license key** via header or query parameter:

```
Api-Key: <license_key>
```

Or: `POST /log/v1?Api-Key=<license_key>`

## Key Endpoint

**`POST /log/v1`**

- **US datacenter**: `https://log-api.newrelic.com/log/v1`
- **EU datacenter**: `https://log-api.eu.newrelic.com/log/v1`

## Payload Formats

### Simplified Format (single log entry)

```json
{
  "timestamp": 1643234829000,
  "message": "Application started successfully",
  "level": "INFO",
  "service": "my-app"
}
```

### Detailed Format (batch with common attributes)

```json
[{
  "common": {
    "attributes": {
      "service": "my-app",
      "environment": "production"
    }
  },
  "logs": [
    {"timestamp": 1643234829000, "message": "Request started"},
    {"timestamp": 1643234830000, "message": "Request completed"}
  ]
}]
```

## Key Fields

| Field | Description |
|-------|-------------|
| `timestamp` | Unix epoch in milliseconds (defaults to ingest time) |
| `message` | Main log message (indexed and searchable) |
| `level` / `logtype` | Log severity or type |
| `attributes` | Additional key-value metadata |

## Limits

- Max payload size: **1 MB** per POST (compression recommended)
- Max attributes per event: **255**
- Max attribute name length: **255 characters**
- Supports `gzip` compression via `Content-Encoding: gzip`

## API Reference

For complete schema details including all fields, response codes, and error
handling, read `references/openapi.yml`.
