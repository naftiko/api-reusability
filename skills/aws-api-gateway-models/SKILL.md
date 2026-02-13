---
name: aws-api-gateway-models
description: >
  Retrieve and inspect API model (schema) collections from AWS API Gateway REST APIs.
  Use this skill when working with API Gateway models, retrieving API schemas,
  inspecting data models, or analyzing schema definitions on AWS API Gateway.
  Trigger when the user mentions API Gateway models, REST API schemas, data models,
  or needs to examine API request/response structures on AWS.
---

# AWS API Gateway - Retrieve Models

Interact with the AWS API Gateway REST API to retrieve information about model
collections. Models define the data structure (schema) for API requests and responses.

## When to Use

- Listing all models/schemas in a REST API
- Inspecting model definitions and JSON schemas
- Auditing API schemas for consistency or reusability
- Retrieving model details for documentation or validation

## Authentication

Requests must be signed using **AWS Signature Version 4** (SigV4). Required headers:

- `Authorization` — SigV4 signature
- `x-amz-date` — Request timestamp
- `x-amz-security-token` — (Optional) Session token for temporary credentials

## Key Endpoint

**`GET /restapis/{restapi_id}/models`** — Retrieve all models for a given REST API.

### Parameters

| Parameter | Location | Required | Description |
|-----------|----------|----------|-------------|
| `restapi_id` | path | Yes | The REST API identifier |
| `position` | query | No | Pagination cursor |
| `limit` | query | No | Max results per page |

### Response Structure

Each model contains:
- `id` — Model identifier
- `name` — Model name (e.g., `UserRequest`, `ErrorResponse`)
- `description` — Human-readable description
- `schema` — JSON Schema definition string
- `contentType` — Media type (typically `application/json`)

## API Reference

For complete schema details including all response fields, pagination, error codes,
and the full model schema structure, read `references/openapi.yml`.
