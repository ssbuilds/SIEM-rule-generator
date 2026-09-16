# Security policy

## Supported versions

This project is experimental and does not currently publish supported release lines or a response SLA.

## Reporting a vulnerability

Do not include secrets, client data, production logs, exploit details affecting a live third party, or other sensitive material in a public issue.

The repository does not yet publish a private vulnerability-reporting route. Until one is configured, disclose only a minimal, non-sensitive notice through the repository's public issue tracker stating that a private contact route is needed. Do not post reproduction details publicly.

Maintainers should add GitHub private vulnerability reporting or a dedicated security address before presenting the project as production-ready.

## Current security limitations

- browser configuration, including provider API keys, is stored in `localStorage`;
- provider keys are sent to the Express server;
- user prompt content is sent to the selected provider;
- no authentication or rate limiting is visible in the current server;
- generated Sigma, KQL, and ATT&CK mappings are not independently validated; and
- generated records are held in process memory.

Use restricted test credentials and synthetic/public content only. Do not expose the current application as a public production service.
