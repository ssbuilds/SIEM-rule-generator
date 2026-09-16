# Contributing

Contributions are welcome when they keep the project reproducible, safe, and honest about its limits.

## Before starting

For a substantial change, open a focused proposal describing the problem, intended behavior, tests, and data provenance. Check existing issues first. Small documentation and test fixes may go directly to a pull request.

## Development

```bash
git clone https://github.com/ssbuilds/SIEM-rule-generator.git
cd SIEM-rule-generator
npm install
cp .env.example .env
npm run check
npm run dev
```

`DATABASE_URL` is currently required during server import. Use only local test infrastructure and restricted provider keys.

## Pull requests

Keep each pull request narrow. Include:

- the problem and scope;
- current and expected behavior;
- tests or a reason tests cannot yet be added;
- screenshots for visible changes;
- security/privacy impact;
- data and IP provenance for fixtures; and
- limitations or follow-up work.

Do not claim production readiness from generated examples or a small benchmark.

## Detection and benchmark contributions

All examples must follow [the portfolio data and IP policy](docs/portfolio-data-policy.md). Benchmark cases must have stable IDs, versions, synthetic/public provenance, expected properties, positive and negative fixtures, and a reviewer rubric. Keep benchmark labels out of the generation prompt unless the case explicitly tests label exposure.

The initial benchmark is limited to Entra ID and Windows/Sysmon. Discuss AWS CloudTrail, Microsoft 365, or other families before adding them so the first result remains frozen and comparable.

## Testing expectations

At minimum:

- run `npm run check`;
- add deterministic tests for changed parsing, validation, or storage behavior;
- test success and failure paths;
- avoid real credentials and live client systems; and
- label model/provider failures and fallbacks rather than dropping them.

Model-based features need repeated trials and a fixed evaluation rubric. A single plausible output is not a test.

## Security

Never commit secrets. Do not put vulnerability details in a public issue. Follow [SECURITY.md](SECURITY.md).

## Conduct

Be specific, respectful, and open about uncertainty. Review the repository [LICENSE](LICENSE) before contributing.
