---
name: aws-api-gateway-resources
description: >
  Retrieve and inspect API resource collections from AWS API Gateway REST APIs.
  Use this skill when working with AWS API Gateway resources, listing API paths,
  retrieving resource trees, or analyzing REST API structure. Trigger when the user
  mentions API Gateway resources, REST API paths, resource hierarchies, or needs
  to inspect API structure on AWS.
---

# AWS API Gateway - Retrieve Resources

Interact with the AWS API Gateway REST API to retrieve information about resource
collections. Resources represent the URL paths in an API Gateway REST API.

## When to Use

- Listing all resources (paths) in a REST API
- Inspecting resource hierarchy and method configurations
- Auditing API structure for reusability analysis
- Retrieving resource details including integration settings

## Authentication

Requests must be signed using **AWS Signature Version 4** (SigV4). Required headers:

- `Authorization` — SigV4 signature
- `x-amz-date` — Request timestamp
- `x-amz-security-token` — (Optional) Session token for temporary credentials

## Key Endpoint

**`GET /restapis/{restapi_id}/resources`** — Retrieve all resources for a given REST API.

### Parameters

| Parameter | Location | Required | Description |
|-----------|----------|----------|-------------|
| `restapi_id` | path | Yes | The REST API identifier |
| `position` | query | No | Pagination cursor |
| `limit` | query | No | Max results per page (default varies) |
| `embed` | query | No | Embed related data (e.g., `methods`) |

### Response Structure

Each resource contains:
- `id` — Resource identifier
- `parentId` — Parent resource ID (null for root `/`)
- `path` — Full resource path (e.g., `/users/{userId}`)
- `pathPart` — This resource's path segment
- `resourceMethods` — Map of HTTP methods configured on this resource

## API Reference

For complete schema details including all response fields, pagination, and error codes,
read `references/openapi.yml`.
