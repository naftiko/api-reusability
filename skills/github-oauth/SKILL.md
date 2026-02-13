---
name: github-oauth
description: >
  Implement GitHub OAuth 2.0 authorization flows and manage OAuth tokens. Use this
  skill when building GitHub OAuth integrations, exchanging authorization codes for
  tokens, checking token validity, resetting or revoking tokens, or managing GitHub
  app grants. Trigger when the user mentions GitHub OAuth, GitHub authentication,
  GitHub access tokens, or needs to authorize users via GitHub.
---

# GitHub OAuth Authentication

Implement the GitHub OAuth 2.0 authorization flow and manage tokens for GitHub
OAuth Apps and GitHub Apps.

## When to Use

- Building a "Sign in with GitHub" flow
- Exchanging authorization codes for access tokens
- Checking, resetting, or revoking OAuth tokens
- Managing OAuth app grants and permissions

## OAuth Flow

1. Redirect users to `https://github.com/login/oauth/authorize` with your `client_id`, `redirect_uri`, and requested `scope`
2. User approves access on GitHub
3. GitHub redirects back with an authorization `code`
4. Exchange the code for an access token via `POST /login/oauth/access_token`
5. Use the token in `Authorization: Bearer <token>` header for API requests

## Key Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/login/oauth/authorize` | GET | Redirect user to authorize |
| `/login/oauth/access_token` | POST | Exchange code for token |
| `/applications/{client_id}/token` | POST | Check token validity |
| `/applications/{client_id}/token` | PATCH | Reset a token |
| `/applications/{client_id}/token` | DELETE | Revoke a token |
| `/applications/{client_id}/grant` | DELETE | Revoke an app grant |

## Token Prefixes

- `gho_` — OAuth app tokens
- `ghu_` — GitHub App user tokens

## Authentication for Token Management

Token management endpoints (check, reset, delete) use **HTTP Basic Auth** with
`client_id` as username and `client_secret` as password. Include the target
`access_token` in the request body.

## Required Headers

All GitHub API requests require:
- `Accept: application/json` (for token exchange) or `application/vnd.github+json`
- `X-GitHub-Api-Version: 2022-11-28`

## API Reference

For complete schema details including all parameters, scopes, response formats,
and error codes, read `references/openapi.yml`.
