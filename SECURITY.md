# Security Policy For RSI Atlas

Safety is part of the architecture, not an appendix. This file names the boundary, the threat notes, and the reporting path in plain paragraphs.

## Boundary In Paragraphs

The loop may edit worker code, prompts, tools, memory format, and workflow order within a branch. The loop may never edit judge code, gate code, entry points, secrets handling, or sandbox policy without human approval. Frozen paths are enforced by code, not by prompt text alone. Any candidate that touches a frozen path is rejected by rule and stored with a reason.

## Runtime Rules In Paragraphs

Loop runs execute in a sandbox with writes limited to the working branch folder. Network access stays off by default. Secrets stay out of prompts, traces, and diaries. High risk patches wait for human review. A kill switch halts the scheduler at once and leaves the last kept mainline intact. Rollback restores that mainline without manual surgery.

## Threat Notes In Paragraphs

Prompt injection through task text is treated as hostile input. The planner quotes untrusted text as data and never as instruction. Trace poisoning through crafted tool output is treated with the same care. The evaluator favors deterministic tests over model opinion when the two disagree. Judge drift is watched with calibration sets. Metric gaming is watched with held out transfer cases and cost trends. Dependency changes are reviewed with extra care because they can widen the blast radius.

## Reporting Path In Paragraphs

When a safety gap is found, open a private report with steps to reproduce, observed behavior, expected boundary behavior, and affected files. Include logs with secrets redacted. Allow time for a fix and a regression test before public discussion. Credit is given with thanks in release notes when the reporter wishes to be named.

## Safe Reuse In Paragraphs

Teams that reuse the engine in new settings should keep full suite promotion, keep frozen judges, keep branch isolation, keep cost tracking, and keep human checkpoints for high risk edits. Small budgets and narrow scopes make early experiments safer. Publish quality trends beside cost trends so trade choices stay visible.
