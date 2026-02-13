---
name: notion-page
description: >
  Update Notion pages and their properties via the Notion API. Use this skill when
  modifying Notion page properties, updating page content, archiving/unarchiving pages,
  or changing page icons and covers. Trigger when the user mentions updating Notion pages,
  modifying Notion properties, publishing page updates, or managing Notion page metadata.
---

# Notion API - Update Page

Update Notion page properties, icons, covers, and archive status via the Notion API.

## When to Use

- Updating page properties (title, status, dates, selects, etc.)
- Changing page icon or cover image
- Archiving or restoring pages
- Publishing structured updates to Notion databases

## Authentication

Use a **Bearer token** in the `Authorization` header:

```
Authorization: Bearer <notion_token>
```

Also include the Notion API version header:

```
Notion-Version: 2022-06-28
```

## Key Endpoint

**`PATCH /pages/{page_id}`** — Update a page's properties and metadata.

### Parameters

| Parameter | Location | Required | Description |
|-----------|----------|----------|-------------|
| `page_id` | path | Yes | The page ID (UUID format, hyphens optional) |

### Request Body

All fields are optional — include only what you want to update:

- **`properties`** — Object mapping property names to new values. Property types include: `title`, `rich_text`, `number`, `select`, `multi_select`, `date`, `url`, `email`, `phone_number`, `checkbox`, `relation`, `status`
- **`icon`** — Page icon (`emoji` type with `emoji` field, or `external` type with `url` field)
- **`cover`** — Cover image (`external` type with `url` field)
- **`archived`** — Boolean to archive (true) or restore (false)

### Property Value Formats

- **Title**: `{"title": [{"text": {"content": "My Title"}}]}`
- **Rich text**: `{"rich_text": [{"text": {"content": "Some text"}}]}`
- **Select**: `{"select": {"name": "Option Name"}}`
- **Date**: `{"date": {"start": "2025-01-15", "end": "2025-01-20"}}`
- **URL**: `{"url": "https://example.com"}`
- **Checkbox**: `{"checkbox": true}`

## API Reference

For complete schema details including all property types, response format,
and error codes, read `references/openapi.yml`.
