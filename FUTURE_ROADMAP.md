# Future Roadmap

`PRODUCT-SPEC.md` is the canonical record of what is implemented now. This file contains only deferred institutional work, prerequisites, and guardrails. When an item ships or changes scope, update both files in the same pull request.

This list is intentionally separate from the public PGY-1 demo. Build items only when a real residency program provides the required institutional content and review process.

## 1. Institution-specific content pack

**Admin Demo implemented:** The prototype now includes a Preceptor Dashboard-only Institution Pack flow with an explicit UI-demo gate. It uses fictional St. Aurelia formulary positions, protocol metadata, laboratory mappings, rotation ownership, version status, and a downloadable demo manifest. It does not save edits or represent real access control.

**Goal for institutional integration:** Adapt the learning experience to a participating hospital without presenting local material as universal guidance.

- Approved local formulary links and medication-use policies
- Site-specific protocols and escalation pathways
- Institution-specific laboratory reference ranges
- Local rotation schedules, preceptor names, and competency language
- Versioning, pharmacist/preceptor review, and an explicit content owner for every local source

**Guardrail:** Do not publish hospital-specific content until the institution supplies, approves, and owns the source material. A real admin workspace requires institution-managed SSO, backend authorization, audit logging, and retention rules.

## 2. Preceptor dashboard

**Demo implemented:** The public prototype now includes a clearly labeled, fictional five-resident cohort dashboard. It demonstrates roster selection, rotation/case progress, competency-area practice patterns, critical-safety remediation flags, next coaching activity, and CSV export.

**Goal for institutional integration:** Give a preceptor a concise coaching view across assigned residents.

- Rotation progress and completion status
- Missed-case patterns by learning area
- Critical-safety remediation status
- Suggested next practice activity
- Exportable formative coaching summary

**Guardrail:** Keep this formative. It must not claim credentialing, residency completion, or independent-practice validation. Do not connect the demo cohort to real resident records until an institution defines access, retention, review, and privacy requirements.

## Deliberately out of scope for the public demo

- Drug interaction checker: requires a licensed, maintained clinical database
- Patient-specific dosing recommender: requires validated patient inputs, institutional governance, and clinical oversight
- Hospital formulary/protocol simulator: requires site-owned, current content
- Generic guideline library: duplicates the focused source links already attached to concepts and monographs
