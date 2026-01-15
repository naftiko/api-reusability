# Define, Report, and Incentivize API Reusability
This is an exploratory proof of concept to quantify what API reuse is across a catalog of APIs for a domain, report it to the rest of the company using existing services, and then incentivize API reuse in VSCode, encouraging developers to reuse existing patterns across the APIs they are producing and consuming.

API reusaability has been identified as a need across multiple conversations Naftiko is having with companies, and this repository is mean to explore what is possible across many different providers, helping better understand what API reuse means in way that others can use.

## Use Case
This is an implementation of the [API Reusability use case](https://github.com/naftiko/schema/blob/main/secondary/use-case/examples/use-case-example-api-reusability.yml) based upon feedback from multiple design partners and leveraging the use case schema being developed to drive use case conversations, as well as how they are applied to each individual capability.

## Capabilities
This end-to-end use cases has six separate capabilities, providing five individual capabilities that can be applied individually, as well as an aggregate capability that brings them all together to provide the right-size context window for an MCP server incentivizing reuse in VSCode, while also updating leadership and other teams of the reuse.

- [API Reusability](capability-api-reusability.yml) - An aggregate capability to help manage API reusability for a domain.
    - [Establish API Catalog](capability-api-reusability-catalog.yml) - An individual capability to establish an API catalog being assessed.
    - [Define API Reuse](capability-api-reusability-definition.yml) - An individual capability to define the state of API reuse.
    - [Communicate API Reuse](capability-api-reusability-communicate.yml) - An individual capability to communicate API reusability to different audiences.
    - [Incentivize API Reuse](capability-api-reusability-incentivize.yml) - An individual capability to incentivize the reuse of APIs during development.

As many of the steps as possible are executed and validated using Bruno, when an HTTP adapter is used, which was pushed further with this iteration, using Bruno pre and post request scripts to calculate the API reuse definition using API catalog data gathered.

## Image
This is an image of this aggregate events AI context capability to try and capture everything going on in the visual language we already use for our deck.

![Alt text](diagrams/api-reusability.png "API Resuability")

## Folders
This repository is currently broken down into the following folders that help support references made within each capability, providing different layers of the capabilities using existing standards that our customers are using.

- agent-2-agent - Using A2A cards for any of the individual agents.
- api-commons - Using two API commons schema for plans and rate limits.
- arazzo - Using Arazzo for the oauth workflows and eventually events.
- backstage - Backstage software catalog system and APIs artifacts.
- bruno - Every HTTP adapter is setup and tested using Bruno client.
- diagrams - Produced a diagram to help illustrate how capability works.
- model-context-protocol - Generating MCP servers from each OpenAPI.
- openapi - Providing all of the OpenAPI needed for each HTTP adapter.
- postman - Alternatively using Postman instead of Bruno for a client.

In this exercise, a capabilities is just an aggregate of pointers to existing standards that provide abstractions for schema, interfaces, use cases, plans, rate limits, workflows, and governance, bundling up all the moving parts.

## Schemas
All of the JSON Schema are stored centrally via the [schema repository](https://github.com/naftiko/schema) to ensure their reuse across each of the capabilities and use cases being developed as part of this work.

## Rules
All of the Spectral and Vacuum are stored centrally via the [rules repository](https://github.com/naftiko/rules) to ensure their reuse across each of the capabilities and use cases being developed as part of this work.

## Services
These are the different types of services in use across these capabilities, providing the different layers of integration needed to deliver this capbility.

- **Fleet** - The different services produced from this capability.
    - **API Reusability (HTTP)** - The aggregate HTTP JSON API produced.
    - **API Reusability (MCP)** - The aggregate HTTP MCP produced.
    - **API Reusability (A2A)** - The aggregate A2A produced.        
- **Rigging** - The different services needed to deliver business value.
    - **Amazon API Gateway (HTTP)** - Pulling of API paths.
    - **Amazon API Gateway (HTTP)** - Pulling of API schema
    - **GitHub Authentication (HTTP)** - Authenticating with GitHub.
    - **GitHub Repository OpenAPI Contents (HTTP)** - Pulling OpenAPI from GitHub.
    - **Notion Authentication (HTTP)** - Authenticating with Notion.
    - **Notion Page (HTTP)** - PUblishing a notion page.
    - **Splunk Authentication (HTTP)** - Authenticating with Splunk.
    - **Splunk HTTP Event Colelctor (HTTP)** - Publishing to Splunk dashboard.
- **Hull** - The different services needed to deliver operational value.
    - **New Relic Logs (HTTP)** - Logging of capbility activity via New Relic.
    - **New Relic Tracing (HTTP)** - Tracing of capbility activity via New Relic.
    - **Hashicorp Vault (HTTP)** - Management of secrets and keys.

## Tools
This capability possesses the common artifacts that other open-source tooling already speak, and can power the following tools:

- [**Bruno**](https://naftiko.github.io/technology/docs/tooling/bruno/) - Use Bruno collections and enviroments to work with each individual API used as part of this capbility.
- [**Microcks**](https://naftiko.github.io/technology/docs/tooling/microcks/) - Use Microcks for turning OpenAPI + Examples into sandboxes for all the API used in this collection.
- [**Backstage**](https://naftiko.github.io/technology/docs/tooling/backstage/) - Distribute capabilities and APIs used as part of the capabilities to any Backstage instance.

This capability will eventually run using the Naftiko engine, but also simulatneoulsy work across these open-source tools.

![Artifact and Tooling Workflow](diagrams/capability-artifact-tooling-flow.png "Artifact and Tooling Workflow")

## Changes
I am rapidly iterating upon this set of capabilities as part of ongoing pilot customer conversations and GTM storytelling, helping evolve and strengthen our API reusability use case. To help capture the changes I will try to do bulk updates via commits and PRs, but will wrap with an issue for logging purposes.

- [API Reusability Change Log #1](https://github.com/naftiko-capabilities/api-reusability/issues/1)
- [API Reusability Thoughts #2](https://github.com/naftiko-capabilities/api-reusability/issues/2)
- [Complexity #3](https://github.com/naftiko-capabilities/api-reusability/issues/3)
- [API Resuability Improvements #4](https://github.com/naftiko/api-reusability/issues/4)

## Contributions
I need your feedback. Please leave via [issues](https://github.com/naftiko-capabilities/api-reusability/issues) or in [Slack](https://naftiko.slack.com/archives/C09LLFZDLL9), but also don't hesitate submitting pull requests to fix any problems encountered and leave feedback to help contribute to this work as it happening.
