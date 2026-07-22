# The Clinical Path — PGY-1

A pharmacy residency onboarding sim, told like a visual novel.

You are a new PGY-1 resident at the fictional **St. Aurelia Medical Center**. Pick your resident, pick your preceptor, and work through a full residency year, one clinical decision at a time. Patient vignettes are used only when patient-specific data are actually provided; systems and workflow items are labeled separately.

**Play it now:** [Landing page](https://clinicalpharmacistmaker.vercel.app/) · [Full-screen demo](https://clinicalpharmacistmaker.vercel.app/demo.html)

![Title screen](docs/title.png)

## What's inside

**The clinical content**
- 69 guided rotations that mirror a real PGY-1 year, from Badge Day to precepting a student
- 1,026 original clinical cases across nine formats: case decisions, chart review, SBAR building, verification queues, dose calculations, code blue, journal club, sequencing, and consult-style essays
- 168 concept and drug study cards with spaced review and Quizlet-compatible export; case stems, dialogue, and individual distractors are excluded
- A mock EHR chart-review window: patient banner, Orders/MAR, Labs, and Snapshot tabs, with flag-based pharmacist verification; every MAR exercise includes patient context and explicit review criteria
- An engine-specific Clinical Review after every case, including the full context, correct principle, patient reasoning when applicable, monitoring/follow-up, and references

![EHR chart review](docs/ehr.png)

**The story around it**
- Two anchor preceptor routes: Dr. Harlin (ICU) or Dr. Daniel Park (EM), each with their own voice, portrait, role-labeled nameplate, and break-room backstories
- A broader multidisciplinary teaching cast: Dr. Amina Shah (ID/oncology), Dr. Mateo Ortega (ambulatory care), Dr. Belle Deans (RPD), Nurse Vance, and Dr. Chen enter the rotations that match their clinical lens
- A bond system that unlocks real gameplay: case hints at *Warming up*, personal stories at *Trusted partner*
- A rival: co-resident Dr. Elliot Kang, who challenges you to quick-fire rounds face-offs all year and slowly becomes a friend
- Three longitudinal patient journeys that follow Mr. Alvarez, Ms. Chen, and Baby Kim across rotations, from crisis to discharge
- Pip, a local clinical copilot that briefs the current case without revealing the answer, offers role-specific team consults, builds a study plan from missed cases, tracks progress, saves rotation notes, finds references, and opens the right tool
- 15 achievements, streak tracking, chapter title cards, a simulated pre-rounding shift board, a preceptor review debrief, graduation epilogues, and ending credits
- A separate fictional-cohort Preceptor Dashboard that demonstrates formative roster coaching, remediation flags, competency-area patterns, and CSV export without using real resident records
- A Preceptor Dashboard-only Institution Pack Admin Demo with fictional formulary, protocol, laboratory, rotation, ownership, and version metadata; its UI gate is explicitly not presented as real authentication

**Quality-of-life**
- Three save slots ("Residency files") with automatic migration of older saves
- Text speed, auto-advance, and sound settings
- Keyboard play: number keys choose answers, Space or Enter triggers the visible primary action, and H calls Pip
- Progress autosaves locally in the browser — no accounts, no servers, no data collection

![Save slots](docs/slots.png)

## Honest scope

This is an **educational simulation and a design prototype**, not a certified training product.

- Every patient, clinician, and hospital in the game is fictional
- Case rationales reference real clinical reasoning patterns, but any institutional use should include licensed-pharmacist review of content and local policy
- Progress feedback is formative simulation evidence, not certification, and is stored only in the player's browser

## Tech notes

- The whole game is a single self-contained `demo.html` (no build step, no dependencies) plus a sprite folder
- Character sprites are AI-generated anime-style art created for this project; hospital backgrounds are Unsplash photography
- The landing page is a single `index.html`
- Local audit scripts cover catalog integrity, clinical accuracy, full interaction flow, all 1,026 terminal-review paths, and documentation currentness

## Product documentation

- [`PRODUCT-SPEC.md`](PRODUCT-SPEC.md) — canonical current product: foundation, scale, features, content, layout, safety, QA, and deployment
- [`DESIGN-NOTES.md`](DESIGN-NOTES.md) — visual system and component rules
- [`FUTURE_ROADMAP.md`](FUTURE_ROADMAP.md) — deferred institutional work and guardrails
- [`docs/clinical-audit-report.md`](docs/clinical-audit-report.md) — dated clinical-audit snapshot

Material changes must update the relevant documentation in the same pull request. The product-quality GitHub Action checks canonical product counts and required documentation on every pull request and push to `main`.

© The Clinical Path. Educational simulation — not medical advice.
