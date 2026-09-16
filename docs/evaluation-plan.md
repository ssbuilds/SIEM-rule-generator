# Evaluation plan

## Purpose

Measure whether the generator produces reviewable draft detections for defined synthetic cases. The benchmark does not prove production effectiveness.

## Phase 1 corpus

Freeze 20 versioned cases before scoring:

- 10 Microsoft Entra ID cases;
- 10 Windows/Sysmon cases.

Each family should include malicious and benign scenarios, common false-positive conditions, missing/ambiguous fields, and at least one mutation that tests whether the rule relies on the intended signal. The next expansion adds AWS CloudTrail and Microsoft 365 without changing Phase 1 results.

Each case records:

- case ID and version;
- synthetic/public provenance;
- log-source family and schema version;
- plain-English request and bounded context;
- expected output formats;
- required and forbidden fields/operators;
- expected ATT&CK mapping with rationale, when applicable;
- positive and negative fixtures;
- reviewer rubric; and
- known limitations.

No client logs, customer detections, employer documents, private incident details, or transformed confidential data are allowed.

## Frozen run configuration

Record for every run:

- repository commit;
- benchmark version and case IDs;
- provider and exact model identifier;
- date/time;
- generation parameters exposed by the application;
- prompt/template version;
- validator versions;
- trial number; and
- success, fallback, refusal, timeout, or parse-failure state.

Use at least five independent trials per case/model configuration. Never discard failed trials from the denominator.

## Staged evaluation

### Tier 1: deterministic checks for every output

1. Output was returned without silently substituting an unlabelled fallback.
2. Sigma parses and meets the pinned schema/profile.
3. KQL passes the selected parser or bounded syntax checks.
4. Required fields and operators are present; forbidden or invented fields are absent.
5. ATT&CK IDs have valid syntax and match the case's evidence/rationale.
6. Secrets and disallowed portfolio data are absent.
7. Positive and negative synthetic fixtures meet the case assertions where execution is available.

Any missing, malformed, or inconsistent result fails closed into deeper review. It is not counted as a pass.

### Tier 2: deeper review

Run model-assisted critique only on outputs that need semantic judgment or fail/straddle deterministic assertions. Give the reviewer the frozen rubric, not benchmark labels hidden inside prompt text. Record the critique as evidence, not ground truth.

A human reviewer decides semantic correctness, expected coverage, likely false positives, field/log-source fit, ATT&CK fit, explainability, and deployment caveats. High-impact or ambiguous cases require human review even when Tier 1 passes.

This cost-aware staging is informed by the high-recall triage followed by deeper reasoning described in Uber's ADR detector. The analogy is limited: this project evaluates generated SIEM content, does not inspect live agent sessions, and does not reuse ADR code, fixtures, labels, or results.

Primary sources:

- Uber ADR repository: https://github.com/uber/ADR
- ADR paper: https://arxiv.org/abs/2605.17380
- ADR reproducibility guide: https://github.com/uber/ADR/blob/main/docs/REPRODUCIBILITY.md

## Metrics

Report overall and per log-source family:

- generation completion rate;
- labelled fallback/refusal/timeout/parse-failure rate;
- deterministic pass rate by check;
- semantic pass rate after human review;
- positive-fixture detection rate;
- negative-fixture pass rate;
- ATT&CK mapping agreement;
- field hallucination rate;
- trial-to-trial consistency;
- median and tail latency when measured; and
- estimated provider cost when available.

Always publish counts with rates. Do not rank models from differences smaller than observed trial variance.

## Failure taxonomy

- transport/provider failure;
- refusal;
- malformed provider response;
- unlabelled fallback;
- Sigma syntax/schema failure;
- KQL syntax failure;
- invented or wrong field;
- wrong log-source assumption;
- ATT&CK mismatch;
- missed required behavior;
- overbroad/noisy behavior;
- unsafe content or sensitive-data finding;
- inconsistent repeated trials; and
- reviewer disagreement.

## Exit criteria for a first public result

A release candidate must:

- include all 20 frozen cases and all scheduled trials;
- expose every failure and denominator;
- pass credential and disallowed-data scans;
- have two-person review of benchmark labels and a documented disagreement process;
- provide machine-readable per-case results and a run manifest;
- make no production-effectiveness claim; and
- state model, benchmark, and validator versions.

Thresholds for any quality claim must be set before results are examined. Until then, results are descriptive.
