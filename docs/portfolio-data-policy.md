# Portfolio data and intellectual-property policy

## Rule

Only independently created synthetic data or clearly licensed public material may enter this repository, its issues, pull requests, benchmarks, screenshots, demos, or published results.

## Never use

- client or customer logs, detections, queries, rules, reports, tickets, architecture, or incident details;
- employer-confidential material, internal methods, non-public code, templates, prompts, benchmarks, or documentation;
- real credentials, tokens, tenant IDs, hostnames, user identities, email addresses, IP addresses, or other environment identifiers;
- sanitized, paraphrased, sampled, aggregated, or transformed private material if it remains derived from a private source;
- data copied from tools, repositories, or publications without compatible terms and attribution; or
- benchmark examples whose origin cannot be explained and recorded.

Changing names is not enough. Rebuild examples from public specifications and invented scenarios.

## Allowed sources

1. **Synthetic:** authored from scratch, with invented organizations, identities, infrastructure, and events.
2. **Public specifications:** vendor or standards documentation used to learn an event schema or behavior, cited in the case metadata.
3. **Openly licensed data/code:** used within its license, with required attribution and notices.

Public availability alone does not grant reuse rights.

## Required provenance record

Every fixture or case must record:

- author;
- creation date;
- source class: synthetic, public specification, or licensed public artifact;
- source URLs and license/terms where applicable;
- statement that no client or employer-confidential material was used;
- transformation or generation method; and
- reviewer and review date.

If provenance is missing or disputed, exclude the material until resolved.

## Synthetic-data review

Before publication, a reviewer checks that:

- names, IDs, domains, IPs, keys, and events are invented or reserved for examples;
- no private source was used as a template;
- the case is technically plausible based on cited public documentation;
- any attack text is bounded to defensive testing; and
- credential and sensitive-data scans pass.

Use reserved domains such as `example.com` and documentation IP ranges where applicable. Synthetic credentials must be unmistakably fake and must never authenticate.

## AI-assisted content

Record material AI assistance when it creates fixtures, rules, prose, or labels. Human review is required for correctness, originality, licensing, sensitive-data leakage, and unsupported claims. Model output does not establish provenance or ownership.

## Claims

Do not imply that synthetic results reproduce a client environment, that generated rules are deployed, or that the work represents an employer or customer. Company and Website profile fields remain blank unless the owner later chooses otherwise.
