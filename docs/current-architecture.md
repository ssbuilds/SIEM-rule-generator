# Current architecture

This document describes the repository at commit `c16d172bfcc6b6601df2098ba7ccc592829455de`. It separates implemented behavior from planned work.

## Request path

1. `client/src/components/rule-generator-form.tsx` collects the rule request and attaches the selected provider and API key.
2. `client/src/lib/api-client.ts` posts the request to `/api/generate` or posts provider credentials to `/api/test-connection`.
3. `server/routes.ts` parses the request with schemas from `shared/schema.ts` and calls `server/services/ai-service.ts`.
4. The AI service builds a prompt that includes title, description, log source, severity, optional ATT&CK text, and optional detection context.
5. The selected provider returns text that the service attempts to parse as JSON. A fallback generator produces template text when provider generation fails.
6. `server/routes.ts` stores generated-rule metadata through `server/storage.ts` and returns the result.

## Components

| Area | Current implementation | Boundary or gap |
|---|---|---|
| Client | React/Vite form and output UI | No client-side rule parser or semantic validator |
| API configuration | Provider and key held in React state and saved to browser `localStorage` | Key is sent to the Express server for connection tests and generation |
| API | Express routes for generation, connection testing, listing, retrieval, and fallback generation | No authentication, rate limit, or request-size control is visible in the repository |
| Providers | Anthropic, OpenAI, and Groq branches in `ai-service.ts` | `azure` is accepted by schema/UI types but reaches the unsupported-provider error branch |
| Storage | `MemStorage` stores generated-rule metadata in process memory | Data is lost on restart; not a durable audit record |
| Database | Drizzle schema and PostgreSQL pool exist | `server/db.ts` requires `DATABASE_URL` at import even though generated records use `MemStorage` |
| ATT&CK | Optional free-text field is copied into prompts and outputs | No ATT&CK ID/tactic lookup or validation |
| Output quality | Provider JSON parse plus fallback templates | No Sigma parser, KQL parser, schema validator, test corpus, or execution test |
| Delivery | Development server and build scripts | No CI workflow or repository test suite is present |

## Trust boundaries

```text
Browser
  |  rule request + provider API key
  v
Express server
  |  composed prompt + provider API key
  v
Selected model provider
  |  generated text
  v
Express server -> MemStorage + browser response
```

The user's description, context, API key, and generated content cross the browser/server boundary. Prompt content crosses the server/provider boundary. Provider policies and deployment settings therefore matter to data handling.

## Planned direction, not current behavior

The following are roadmap items:

- a versioned, synthetic benchmark;
- syntax and schema validators;
- bounded ATT&CK mapping checks;
- repeated model trials and per-case result artifacts;
- human review rubrics;
- CI for deterministic checks; and
- clearer key handling and deployment controls.

No roadmap item should be described as shipped until code and tests land.
