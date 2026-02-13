---
name: splunk-hec
description: >
  Send events to Splunk via the HTTP Event Collector (HEC) for indexing and searching.
  Use this skill when ingesting events into Splunk, sending log data to HEC, forwarding
  application events, or batch-submitting event data. Trigger when the user mentions
  Splunk HEC, Splunk event collector, sending events to Splunk, Splunk event ingestion,
  or logging to Splunk via HTTP.
---

# Splunk HTTP Event Collector (HEC)

Send events to Splunk via the HTTP Event Collector for indexing and searching.

## When to Use

- Sending application events or logs to Splunk
- Ingesting structured or unstructured event data
- Batch-submitting multiple events in a single request
- Forwarding metrics or log data to Splunk indexes

## Authentication

Use a **Splunk HEC token** in the Authorization header:

```
Authorization: Splunk <hec_token>
```

Alternatively, use Basic Auth with the token as password (username is ignored):

```
curl -u x:<hec_token> ...
```

## Key Endpoint

**`POST /collector`** on port **8088** (default HEC port).

### Event Formats

**Single event with metadata:**
```json
{
  "time": 1643234829,
  "host": "webserver01",
  "source": "/var/log/app.log",
  "sourcetype": "application",
  "index": "main",
  "event": {"level": "ERROR", "message": "Something failed"}
}
```

**Multiple events** — newline-delimited JSON (no comma separation):
```
{"event": "First event"}
{"event": "Second event", "sourcetype": "custom"}
```

### Event Fields

| Field | Required | Description |
|-------|----------|-------------|
| `event` | Yes | Event payload (string or JSON object) |
| `time` | No | Epoch timestamp (seconds or milliseconds) |
| `host` | No | Hostname override |
| `source` | No | Event source identifier |
| `sourcetype` | No | Event source type |
| `index` | No | Target Splunk index |
| `fields` | No | Additional indexed metadata fields |

### Query Parameters

Override defaults for all events via query params: `host`, `index`, `source`,
`sourcetype`, `time`, `channel`.

### Acknowledgement

When `useAck` is enabled, include a `channel` GUID (query param or
`x-splunk-request-channel` header). The response includes an `ackId`.

## API Reference

For complete schema details including all error codes, response format, and
multi-event handling, read `references/openapi.yml`.
