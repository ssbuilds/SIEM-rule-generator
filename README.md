# SIEM Rule Generator

SIEM Rule Generator is an experimental web application that turns a plain-English detection idea into a draft Sigma rule and a draft KQL query with a selected AI provider.

> **Research status:** generated rules are starting points for review, not production-ready detections. Validate syntax, field mappings, ATT&CK mappings, expected matches, false positives, and performance before deployment.

## Current scope

The current application:

- accepts a title, description, log source, severity, optional MITRE ATT&CK text, and optional detection context;
- supports Anthropic, OpenAI, and Groq in the server implementation;
- accepts `azure` in the request schema and interface, but the AI service does not implement it;
- sends the user's provider API key and rule request to the Express server;
- stores the API configuration, including the key, in browser `localStorage`;
- returns model-generated Sigma and KQL text; and
- stores generated-rule metadata in an in-process `MemStorage` instance.

The project does not yet include a Sigma/KQL parser, ATT&CK identifier validation, an automated benchmark, automated tests, or CI. See [Current architecture](docs/current-architecture.md) for the code-grounded inventory.

## Security and privacy warning

Do not enter client data, production logs, credentials, internal hostnames, tenant identifiers, incident details, or other sensitive information. Detection examples and benchmark fixtures for this public project must be synthetic or drawn from public sources under compatible terms.

API keys are sensitive. The current client stores its configuration in browser `localStorage` and sends the key to this application's server so the server can call the chosen provider. Use a restricted test key, run only in an environment you trust, and remove the saved configuration after testing. This project does not claim zero server exposure.

## Run locally

### Prerequisites

- Node.js 18 or later
- npm
- `DATABASE_URL` set to a PostgreSQL connection string
- an API key for Anthropic, OpenAI, or Groq

Although generated records use `MemStorage`, `server/db.ts` is imported at startup and requires `DATABASE_URL`.

```bash
git clone https://github.com/ssbuilds/SIEM-rule-generator.git
cd SIEM-rule-generator
npm install
cp .env.example .env
# Set DATABASE_URL in .env or your shell.
npm run dev
```

Open the local URL shown by the development server. Add a restricted test provider key in Settings.

## Evaluation roadmap

The first public benchmark will use 20 synthetic cases:

- 10 Microsoft Entra ID cases;
- 10 Windows/Sysmon cases.

AWS CloudTrail and Microsoft 365 are the next planned log-source families. The benchmark will freeze inputs and expected properties, repeat nondeterministic model runs, retain per-case results, separate syntax and semantic checks, and require human review before any quality claim.

The evaluation follows a staged principle: run cheap deterministic checks across every output, then spend model-assisted and human review on the smaller set that needs deeper judgment. This is technically analogous to the cost-aware triage-then-reasoning pattern described by Uber's Agentic AI Detection and Response work, but it is not an implementation of Uber ADR and does not reuse ADR code or benchmark data. See [Evaluation plan](docs/evaluation-plan.md).

## Documentation

- [Current architecture](docs/current-architecture.md)
- [Threat model](docs/threat-model.md)
- [Evaluation plan](docs/evaluation-plan.md)
- [Portfolio data and IP policy](docs/portfolio-data-policy.md)
- [Security policy](SECURITY.md)
- [Contributing](CONTRIBUTING.md)

## Responsible use

Generated rules can miss malicious activity or create noisy alerts. Do not deploy them without review and testing in the target SIEM. Do not use this project to process data you are not allowed to disclose to the selected model provider or to this application's server.

## License

See [LICENSE](LICENSE).
