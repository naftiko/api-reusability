---
name: splunk-auth-tokens
description: >
  Create and manage Splunk authentication tokens (JWT) for REST API access. Use this
  skill when creating Splunk API tokens, managing token lifecycle, listing active tokens,
  or revoking Splunk access. Trigger when the user mentions Splunk authentication,
  Splunk tokens, Splunk JWT, Splunk API credentials, or needs to set up programmatic
  access to Splunk REST APIs.
---

# Splunk Authentication Token API

Create and manage authentication tokens (JWT) for accessing Splunk REST APIs.
Splunk uses JWT tokens rather than OAuth for API authentication.

## When to Use

- Creating new authentication tokens for API access
- Listing existing tokens for a user
- Retrieving token details or status
- Revoking/deleting tokens
- Setting up programmatic Splunk access

## Authentication

Use **Basic Auth** or an existing **Bearer token** to manage tokens:

```
Authorization: Basic <base64(username:password)>
Authorization: Bearer <existing_token>
```

## Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/authorization/tokens` | GET | List all tokens for the authenticated user |
| `/authorization/tokens` | POST | Create a new authentication token |
| `/authorization/tokens/{token_id}` | GET | Get details for a specific token |
| `/authorization/tokens/{token_id}` | DELETE | Revoke/delete a specific token |

## Token Types

- **Static tokens** — Long-lived with configurable expiration
- **Ephemeral tokens** — Short-lived, auto-expire
- **Interactive tokens** — Used by browsers, exchanged for session cookies

## Creating Tokens

POST to `/authorization/tokens` with:
- `name` — Human-readable token name
- `audience` — Intended audience for the token
- `expires_on` — Expiration epoch timestamp (0 = never expires)
- `not_before` — Token valid-from epoch timestamp

## Response Data

Token responses include: `id`, `token` (the JWT string — only returned on creation),
`status`, `claims` (name, audience, subject, expiration, issuer, not_before).

## Important Notes

- The actual JWT token value is only returned at creation time — store it securely
- Splunk REST APIs do not support OAuth; use these JWT tokens instead
- Include `output_mode=json` parameter for JSON responses (default is XML)

## API Reference

For complete schema details including all parameters, response fields, and
error codes, read `references/openapi.yml`.
