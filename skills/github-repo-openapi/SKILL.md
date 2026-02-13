---
name: github-repo-openapi
description: >
  Retrieve repository file contents from GitHub to find and read OpenAPI specification
  files. Use this skill when pulling OpenAPI specs from GitHub repos, reading file
  contents from repositories, or discovering API definitions stored in GitHub. Trigger
  when the user mentions GitHub repository contents, OpenAPI files in repos, reading
  specs from GitHub, or fetching API definitions from source control.
---

# GitHub Repository OpenAPI Contents

Retrieve file contents from GitHub repositories, specifically for locating and
reading OpenAPI specification files.

## When to Use

- Fetching OpenAPI/Swagger files from a GitHub repository
- Reading any file contents from a GitHub repo by path
- Discovering API specifications stored in version control
- Pulling API definitions for analysis or comparison

## Authentication

Use a **Bearer token** in the `Authorization` header:

```
Authorization: Bearer <github_token>
```

Alternatively, use `token <github_token>` format.

## Key Endpoint

**`GET /repos/{owner}/{repo}/contents/{path}`** — Retrieve contents of a file or directory.

### Parameters

| Parameter | Location | Required | Description |
|-----------|----------|----------|-------------|
| `owner` | path | Yes | Repository owner (user or org) |
| `repo` | path | Yes | Repository name |
| `path` | path | Yes | File path (e.g., `openapi.yaml`) |
| `ref` | query | No | Branch, tag, or commit SHA (default: default branch) |

### Response Handling

- **Files**: Returns `content` (base64-encoded), `encoding`, `sha`, `size`, `download_url`
- **Directories**: Returns array of file metadata objects
- **Large files**: If > 1MB, use the `download_url` or Git Blobs API instead

### Required Headers

- `Accept: application/vnd.github+json`
- `X-GitHub-Api-Version: 2022-11-28`

### Common OpenAPI File Paths

Look for specs at typical locations: `openapi.yaml`, `openapi.json`, `swagger.yaml`,
`swagger.json`, `api/openapi.yml`, `docs/api.yaml`, `spec/openapi.yml`.

## API Reference

For complete schema details including all response fields, error codes, and
content types, read `references/openapi.yml`.
