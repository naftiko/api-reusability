---
name: notion-oauth
description: >
  Implement Notion OAuth 2.0 authorization for public integrations. Use this skill
  when building Notion OAuth flows, exchanging authorization codes for access tokens,
  or setting up Notion public integrations. Trigger when the user mentions Notion OAuth,
  Notion authorization, Notion access tokens, or connecting a Notion workspace to
  an external application.
---

# Notion OAuth Authorization

Implement the OAuth 2.0 authorization flow for Notion public integrations.

## When to Use

- Building a Notion public integration that users authorize
- Exchanging authorization codes for Notion access tokens
- Setting up the redirect flow for workspace authorization

## OAuth Flow

1. Redirect users to `https://api.notion.com/v1/oauth/authorize` with `client_id`, `redirect_uri`, and `response_type=code`
2. User approves integration and selects pages to share
3. Notion redirects back with an authorization `code` (valid 10 minutes)
4. Exchange code for access token via `POST /oauth/token`
5. Use token in `Authorization: Bearer <token>` header for all API requests

## Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/oauth/authorize` | GET | Redirect user to authorize |
| `/oauth/token` | POST | Exchange code for access token |

## Token Characteristics

- Access tokens **do not expire**
- Tokens are workspace-specific
- Token prefix: `secret_`
- Users typically authorize only once per integration

## Token Exchange Authentication

The `/oauth/token` endpoint uses **HTTP Basic Auth** with `client_id` as username
and `client_secret` as password (base64-encoded). Request body uses
`application/x-www-form-urlencoded` format with `grant_type=authorization_code`.

## Response Data

The token response includes: `access_token`, `bot_id`, `workspace_name`,
`workspace_id`, and `owner` information. Store the `bot_id` as the primary key
for integration data.

## API Reference

For complete schema details including all parameters, error responses, and the
full token response structure, read `references/openapi.yml`.
