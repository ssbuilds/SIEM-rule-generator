# Threat model

## Scope

This threat model covers the current browser, Express API, selected model provider, and generated detection content. It does not certify any deployment as secure.

## Assets

- provider API keys;
- rule descriptions and detection context;
- generated Sigma and KQL;
- integrity of ATT&CK mappings and field mappings;
- benchmark fixtures and results; and
- contributor and project reputation.

## Trust boundaries

1. User input enters the browser form.
2. The browser sends the request and provider key to the Express server.
3. The server sends a composed prompt to the selected model provider.
4. Model output returns to the server and is parsed or replaced by fallback text.
5. Generated metadata is placed in in-process memory and output is displayed in the browser.

## Main threats and controls

| Threat | Current exposure | Required control or safe practice |
|---|---|---|
| API-key disclosure | Key is saved in browser `localStorage` and sent to the server | Use restricted test keys; trusted local deployment only; never log keys; remove saved configuration; redesign key handling before hosted use |
| Sensitive-data disclosure | Descriptions/context are sent to the server and model provider | Public/synthetic inputs only; no client, production, tenant, credential, or incident data |
| Prompt injection in source text | User-provided context is inserted into the model prompt | Treat context as data; constrain output; validate independently; do not let supplied text redefine validation or tool use |
| Invalid or invented rule syntax | Model text is parsed only as JSON, not as Sigma or KQL | Add parsers and deterministic checks; test in an isolated non-production environment |
| Incorrect ATT&CK mapping | ATT&CK is unvalidated free text | Validate identifier format and mapping against a pinned ATT&CK release; require reviewer evidence |
| Hallucinated fields/log sources | No target-schema validation exists | Use versioned synthetic schemas and expected-field assertions per case |
| False negatives | Plausible output may miss required behavior | Positive and negative fixtures, mutation cases, repeated trials, and human review |
| False positives/noise | Broad predicates can create alert floods | Negative fixtures, selectivity review, bounded performance testing, and deployment tuning |
| Availability/cost abuse | No visible authentication or rate limit | Keep deployment private; add authentication, size limits, rate limits, quotas, and timeouts before hosted use |
| Misleading evaluation | Small or selectively reported samples can overstate quality | Freeze cases, record failures, report denominators, repeat runs, retain per-case results, and publish limitations |
| IP or confidentiality contamination | Real client or employer materials could enter examples | Follow the [portfolio data and IP policy](portfolio-data-policy.md); reject non-public inputs |
| Unsafe benchmark execution | Detection test fixtures may contain attack-like text | Use synthetic data in an isolated environment with no production credentials or connections |

## Model-assisted review boundary

A model can help classify or explain an output, but its judgment is not independent proof. Deterministic checks run first. Model-assisted review is recorded as model output and configuration, and ambiguous or high-impact cases go to a human reviewer. This is a staged review pattern, not an agentic response system.

## Out of scope

- production deployment assurance;
- live incident response;
- processing customer telemetry;
- autonomous deployment of generated detections; and
- claims that a generated rule detects a real threat without target-environment validation.
