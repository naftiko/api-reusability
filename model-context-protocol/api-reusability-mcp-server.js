#!/usr/bin/env node

/**
 * API Catalog Analytics MCP Server
 * 
 * This MCP server provides tools to query API catalog analytics including
 * paths and schemas across multiple APIs with reuse statistics.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Sample data - in production this would come from a database or API
const catalogData = {
  paths: {
    all: [
      "/apis",
      "/apis/rebuild",
      "/apis/{apiId}",
      "/apis/{apiId}/commit",
      "/apis/{apiId}/properties",
      "/apis/{apiId}/properties/openapi",
      "/apis/{apiId}/properties/openapi/review",
      "/messages",
      "/messages/{messageId}",
      "/messages/{messageId}/send",
      "/orders",
      "/orders/{orderId}",
      "/orders/{orderId}/cancel",
      "/organizations",
      "/organizations/{organizationId}",
      "/organizations/{organizationId}/}",
      "/persons",
      "/persons/{personId}",
      "/persons/{personId}/cancel",
      "/products",
      "/products/{productId}",
      "/products/{productId}/cancel",
      "/resources"
    ],
    reuse: []
  },
  schemas: {
    all: [
      "ApiResource",
      "Empty",
      "Error",
      "GitHubFileContent",
      "LinksPagination",
      "LinksSelf",
      "Message",
      "Meta",
      "OrderRequest",
      "Organization",
      "PaginatedList",
      "Person",
      "Policies",
      "Problem",
      "Product",
      "Response",
      "User",
      "WrapperResponseCollection",
      "WrapperResponseObject"
    ],
    reuse: [
      { schema: "WrapperResponseCollection", count: 4 },
      { schema: "WrapperResponseObject", count: 4 },
      { schema: "LinksSelf", count: 4 },
      { schema: "Meta", count: 4 },
      { schema: "LinksPagination", count: 4 },
      { schema: "Problem", count: 4 },
      { schema: "Product", count: 2 }
    ]
  }
};

class ApiCatalogServer {
  constructor() {
    this.server = new Server(
      {
        name: "api-catalog-analytics-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "get_all_paths",
          description: "Get a complete list of all API paths across all APIs in the catalog",
          inputSchema: {
            type: "object",
            properties: {},
            required: []
          }
        },
        {
          name: "get_path_reuse",
          description: "Get statistics about which paths are reused across multiple APIs",
          inputSchema: {
            type: "object",
            properties: {},
            required: []
          }
        },
        {
          name: "get_all_schemas",
          description: "Get a complete list of all schemas across all APIs in the catalog",
          inputSchema: {
            type: "object",
            properties: {},
            required: []
          }
        },
        {
          name: "get_schema_reuse",
          description: "Get statistics about which schemas are reused across multiple APIs, including usage counts",
          inputSchema: {
            type: "object",
            properties: {
              min_count: {
                type: "number",
                description: "Minimum usage count to filter results (optional)",
                minimum: 1
              }
            },
            required: []
          }
        },
        {
          name: "get_complete_catalog",
          description: "Get comprehensive analytics including all paths and schemas with their reuse statistics",
          inputSchema: {
            type: "object",
            properties: {},
            required: []
          }
        },
        {
          name: "search_paths",
          description: "Search for paths matching a pattern",
          inputSchema: {
            type: "object",
            properties: {
              pattern: {
                type: "string",
                description: "Search pattern to match against paths (supports wildcards)"
              }
            },
            required: ["pattern"]
          }
        },
        {
          name: "search_schemas",
          description: "Search for schemas by name",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query to match against schema names"
              }
            },
            required: ["query"]
          }
        }
      ]
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "get_all_paths":
            return this.getAllPaths();
          
          case "get_path_reuse":
            return this.getPathReuse();
          
          case "get_all_schemas":
            return this.getAllSchemas();
          
          case "get_schema_reuse":
            return this.getSchemaReuse(args);
          
          case "get_complete_catalog":
            return this.getCompleteCatalog();
          
          case "search_paths":
            return this.searchPaths(args);
          
          case "search_schemas":
            return this.searchSchemas(args);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`
            }
          ],
          isError: true
        };
      }
    });
  }

  getAllPaths() {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            paths: catalogData.paths.all,
            total: catalogData.paths.all.length
          }, null, 2)
        }
      ]
    };
  }

  getPathReuse() {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            reuse: catalogData.paths.reuse,
            total: catalogData.paths.reuse.length
          }, null, 2)
        }
      ]
    };
  }

  getAllSchemas() {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            schemas: catalogData.schemas.all,
            total: catalogData.schemas.all.length
          }, null, 2)
        }
      ]
    };
  }

  getSchemaReuse(args) {
    const minCount = args?.min_count || 1;
    const filtered = catalogData.schemas.reuse.filter(item => item.count >= minCount);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            reuse: filtered,
            total: filtered.length,
            filter: { min_count: minCount }
          }, null, 2)
        }
      ]
    };
  }

  getCompleteCatalog() {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            paths: catalogData.paths,
            schemas: catalogData.schemas,
            summary: {
              total_paths: catalogData.paths.all.length,
              reused_paths: catalogData.paths.reuse.length,
              total_schemas: catalogData.schemas.all.length,
              reused_schemas: catalogData.schemas.reuse.length
            }
          }, null, 2)
        }
      ]
    };
  }

  searchPaths(args) {
    const pattern = args.pattern.toLowerCase();
    const matches = catalogData.paths.all.filter(path => 
      path.toLowerCase().includes(pattern)
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            query: pattern,
            matches: matches,
            total: matches.length
          }, null, 2)
        }
      ]
    };
  }

  searchSchemas(args) {
    const query = args.query.toLowerCase();
    const matches = catalogData.schemas.all.filter(schema => 
      schema.toLowerCase().includes(query)
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            query: query,
            matches: matches,
            total: matches.length
          }, null, 2)
        }
      ]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("API Catalog Analytics MCP server running on stdio");
  }
}

// Start the server
const server = new ApiCatalogServer();
server.run().catch(console.error);
