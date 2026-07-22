# The Clinical Path — current product specification

- **Product:** The Clinical Path: PGY-1
- **Repository:** `jmhan9417/clinical-path-pgy1-demo`
- **Production:** <https://clinicalpharmacistmaker.vercel.app/>
- **Implementation:** `demo.html` plus local assets, with `index.html` as the marketing site
- **Document role:** Canonical source of truth for the product as implemented

This document supersedes older prototype and handoff specifications when they conflict with the current repository. Update it in the same pull request as any material product, UI, architecture, content, safety, or deployment change.

## 1. Product definition

The Clinical Path is an English-language, pharmacy-only PGY-1 residency onboarding simulation presented through a visual-novel narrative and clinical-workstation practice interface.

### Primary users

- PGY-1 pharmacy residents and advanced pharmacy learners
- Residency program directors and preceptors evaluating the demo
- Hospital pharmacy education leaders considering a future institutional pilot

### Product promise

- Put clinical decisions in a memorable hospital story.
- Connect practice to Core and ASHP R1–R4 learning areas.
- Give residents immediate rationale and targeted review.
- Give preceptors a formative coaching view without implying credentialing.

### Hard scope boundaries

- Pharmacy residency onboarding only
- Fictional hospital, patients, clinicians, cohort, and institutional content
- Educational simulation, not medical advice
- Formative practice evidence, not residency completion, credentialing, board eligibility, or independent-practice validation
- No patient data, PHI, real resident records, accounts, server database, or analytics collection
- No drug-interaction checker or patient-specific dosing recommender

## 2. Current product scale

| Element | Current value |
|---|---:|
| Guided rotations | 69 |
| Original clinical cases | 1,026 |
| Study cards | 168 |
| Canonical clinical concepts | 68 |
| Drug monographs | 100 |
| BGM tracks | 22 |
| Preceptor routes | 2 |
| Longitudinal patient journeys | 3 |
| Demo dashboard residents | 5 fictional residents |
| Institution Pack sections | 5 |

### Case-engine distribution

- 828 multiple-choice decisions
- 53 sequencing exercises
- 68 chart-hunt exercises
- 40 SBAR builders
- 23 calculations
- 7 timed code cases
- 6 journal-club exercises
- 1 consult-style case packet

## 3. Technical foundation

### Runtime architecture

- Static web application with no build step or runtime framework
- `index.html`: marketing site and embedded-demo entry
- `demo.html`: simulation engine, content catalog, UI, state, and screens
- `assets/`: character sprites, audio, and supporting media
- Vercel: required public production deployment
- GitHub: version control and pull-request review

### Client-side state

Progress is stored only in the browser with `localStorage`. It covers save slots, resident progress, route selection, paused-case state, navigation return state, Study Card progress, pinned drugs, Pip chat, settings, sound, volume, and BGM position. There is no backend, account identity, database, institutional tenant, or real authorization layer.

### Deployment workflow

1. Edit the real local repository folder.
2. Run syntax, documentation, and product regression audits.
3. Review rendered 390px, 768px, and 1440px states for UI changes.
4. Commit the exact verified files to a feature branch.
5. Push and open a GitHub pull request.
6. Verify the Vercel Preview URL.
7. Obtain final merge confirmation.
8. Merge to `main` and verify the production URL.

## 4. Design system

The product deliberately has two visual layers.

### Narrative layer

Used for the title, resident introduction, character dialogue, break-room stories, chapter transitions, graduation, and ending scenes. It uses visual-novel composition, hospital photography, character sprites, expressive states, role-labeled nameplates, and story controls.

### Clinical workstation layer

Used for the Roadmap, case workspace, EHR exercises, Study Cards, Clinical Review, Progress Review, tools, references, Preceptor Dashboard, and Institution Pack.

- Neutral hospital-workstation shell
- Navy headings, teal primary actions, white surfaces, and gray borders
- Restrained shadows and 12–16px panel radii
- Yellow reserved for review-due states
- Red reserved for critical remediation or unsafe outcomes
- No decorative pink gradients, glossy cards, oversized controls, or one-sided accent rails

### Canonical workstation tokens

| Token | Value |
|---|---|
| Ink | `#17313b` |
| Navy heading | `#102a43` |
| Primary teal | `#0f766e` |
| Teal status background | `#edf7f5` |
| Border | `#d7e1e5` |
| Shell | `#eef2f4` |
| Muted text | `#64748b` |
| Surface | `#ffffff` |

### Component language

- Primary action: solid teal
- Secondary action: white surface with gray border
- Information card: full outline, restrained background, concise label
- Status: compact text and icon, not a decorative accent rail
- Horizontal overflow: allowed only inside its owning control, never at document level
- Copy: direct, plain English; clinical qualifiers and safety ownership stay visible

## 5. Information architecture

### Learner flow

1. Marketing page or direct demo
2. Title screen
3. Resident and preceptor selection
4. Residency file selection or creation
5. Narrative onboarding
6. Residency Roadmap
7. Rotation introduction
8. Case workspace
9. Clinical Review
10. Progress Review, Study Cards, tools, or the next rotation
11. Graduation and ending state

### Evaluator flow

1. Title screen
2. Preceptor Dashboard
3. Select a fictional resident
4. Review formative patterns and next coaching activity
5. Export a fictional coaching summary
6. Open the Institution Pack Admin Demo
7. Acknowledge the UI-only access disclosure
8. Review fictional source ownership and pack sections
9. Export the fictional demo manifest

## 6. Screen and layout specification

| Surface | Desktop layout | Narrow layout |
|---|---|---|
| Title | Centered hero, actions, utility tools | Single-column actions; safe-area-aware controls |
| Roadmap | Persistent year rail plus learning board | Compact navigation with stacked learning cards |
| Case workspace | Clinical context plus decision workspace | One reading column with controls kept near the active task |
| EHR chart review | Patient banner and tabbed Orders/MAR, Labs, Snapshot workspace | Tabs and tables scroll inside their own containers |
| Clinical Review | Outcome, principle, reasoning, monitoring, references | Same hierarchy in a single column |
| Study Cards | Review card plus compact queue/controls | One-column study flow; no centered paragraph text |
| Progress Review | Summary, competency evidence, and next actions | Stacked evidence blocks with preserved reading order |
| Preceptor Dashboard | 260px roster plus resident coaching workspace | Roster above coaching detail |
| Institution Pack | Header, five-tab workspace, summary/content split | Scrollable tabs; tables scroll internally |

### Responsive requirements

- Verify representative screens at 390px, 768px, and 1440px.
- The document must have zero horizontal overflow.
- Wide tables and tab rows own their own horizontal scrolling.
- Mobile controls remain reachable without covering the active decision.
- Learner HUD, Pip, and learner tools are hidden in Preceptor Dashboard and Institution Pack modes.

## 7. Feature inventory

### Learning and simulation

- 69 guided learning experiences across a full fictional PGY-1 year
- Nine case formats with engine-specific interaction and review
- Mock EHR with patient banner, Orders/MAR, Labs, and Snapshot tabs
- Simulated pre-rounding shift board
- Patient-specific vignettes only when patient data are supplied
- Systems and workflow scenarios labeled separately
- Engine-specific Clinical Review with context, principle, reasoning, monitoring/follow-up, and references
- True back-navigation that restores the originating surface when supported

### Story and progression

- Two anchor preceptor routes: Dr. Harlin and Dr. Daniel Park
- Multidisciplinary teaching cast
- Bond levels with hints and story unlocks
- Rival quick-fire rounds with Dr. Elliot Kang
- Three longitudinal patient journeys
- Chapter cards, streaks, 15 achievements, graduation epilogues, and credits

### Study and reference tools

- 168 concept and drug Study Cards
- Spaced review and Quizlet-compatible export
- Pinned concepts and drug monographs
- Related-drug navigation inside concept pages
- Clinical calculator and reference tools
- Pip, a local clinical copilot that briefs the current case without revealing answers, offers role-specific consult framing, builds a missed-case study plan, tracks progress, saves notes, finds references, and opens the relevant tool

### Preceptor Dashboard

- Separate fictional five-resident cohort
- Roster selection and resident detail
- Rotation and case progress
- Competency-area practice patterns
- Critical-safety remediation flags
- Suggested next coaching activity and preceptor note
- CSV coaching-summary export
- Explicitly formative language; no real resident data

### Institution Pack Admin Demo

- Reachable only from the Preceptor Dashboard in the UI
- Explicit modal disclosure before entry
- Fictional St. Aurelia Medical Center content only
- Overview, Formulary, Protocols, Lab ranges, and Rotation map tabs
- Source owner, version, review date, status, and learner-facing use metadata
- Downloadable JSON demo manifest
- No editable persistence and no real authentication
- Production requirement: institution-managed SSO, backend role authorization, audit logging, retention rules, and institution-owned source approval

## 8. Input, accessibility, and navigation

- Keyboard answers: number keys
- Primary action: Space or Enter when appropriate
- Pip shortcut: `H`
- Institution tabs: Left/Right arrows plus Home/End
- Admin disclosure: focus enters the modal, remains trapped, and Escape closes it
- Interactive controls use semantic buttons, tabs, regions, labels, and accessible names
- Visible focus and status contrast must remain intact
- Motion and audio follow the user settings and should not be required to understand clinical content

## 9. Content and safety governance

### Clinical content rules

- All cases are original educational content.
- Clinical rationale must distinguish universal evidence from local policy.
- Every terminal case path must produce a complete review.
- Medication safety statements, calculations, monitoring, and references remain audit targets.
- CI rejects exact and high-similarity question stems, repeated generic distractors, repeated six-word option phrases, strong correct-answer length cues, malformed option sets, and short feedback rationales.
- Any institutional adaptation requires licensed-pharmacist and local-policy review.

### Institutional rules

- Never use a real hospital name, policy, formulary, lab range, resident roster, or patient record without written institutional ownership and approval.
- The public Institution Pack remains a fictional UI pattern.
- A front-end modal or hidden navigation route is never described as security.

### Claims language

Use: practice, formative feedback, coaching pattern, suggested next activity.

Do not use: certified, credentialed, residency completed, independent-practice validated, or equivalent claims.

## 10. Quality gates

The current release gate includes:

| Audit | Current expected result |
|---|---:|
| Content quality | 30/30 |
| Flow smoke | 33/33 |
| RPD | 62/62 |
| Concept guide | 30/30 |
| Antibiotic/language/sound | 14/14 |
| Clinical accuracy | 41/41 |
| Review quality | 17/17 |
| Drug monograph | 25/25 |
| Pip/volume | 36/36 |
| Documentation currentness | Required to pass |

A UI change also requires manual browser review at 390px, 768px, and 1440px. A passing static audit alone is not sufficient visual evidence.

## 11. Documentation ownership

| File | Purpose | Update when |
|---|---|---|
| `PRODUCT-SPEC.md` | Canonical description of the implemented product | Any material architecture, feature, content, layout, safety, or deployment change |
| `DESIGN-NOTES.md` | Visual language, tokens, and component rules | Any design-system or interaction-pattern change |
| `README.md` | Public repository overview and headline capabilities | Public scope, scale, entry point, or headline feature changes |
| `FUTURE_ROADMAP.md` | Deferred institutional work and hard guardrails | A future item ships, changes, or is explicitly rejected |
| `docs/clinical-audit-report.md` | Dated clinical-content audit snapshot | A new formal clinical audit is performed |
| `scripts/docs-currentness-audit.mjs` | Machine guard for runtime/document agreement | A canonical metric or required product capability changes |

### Same-PR rule

A push does not magically rewrite Markdown. Documentation stays current because every material change must update the relevant file in the same pull request, and the product-quality GitHub Action runs the documentation currentness audit on pushes and pull requests.

At minimum:

- Count or catalog change: update `PRODUCT-SPEC.md`, `README.md`, and the audit expectation.
- Feature or flow change: update `PRODUCT-SPEC.md`; update `README.md` if public-facing.
- Style or layout change: update `PRODUCT-SPEC.md` and `DESIGN-NOTES.md`.
- Institutional or claims-boundary change: update `PRODUCT-SPEC.md` and `FUTURE_ROADMAP.md`.
- Architecture or deployment change: update `PRODUCT-SPEC.md` and `README.md`.

The audit is a guard, not a substitute for review. It verifies canonical counts, headings, feature markers, safety language, and the presence of the matching product functions; reviewers still confirm that the prose accurately describes the change.

## 12. Current non-goals and future integration

The public demo does not include:

- real institutional SSO or authorization
- real preceptor/resident accounts
- cross-device synchronization
- PHI or clinical-system integration
- production analytics
- real formulary or protocol editing
- credentialing, summative evaluation, or residency-completion decisions

A real institution pilot must define identity, roles, data ownership, privacy, retention, clinical review, source versioning, audit trails, evaluation ownership, accessibility acceptance, and incident response before any real data is connected.
