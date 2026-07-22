# Clinical Path PGY-1 Clinical Content Audit — historical snapshot

> This report preserves the July 11, 2026 RPD2 audit baseline. Its figures describe that dated content architecture, not the current runtime catalog. See [`../PRODUCT-SPEC.md`](../PRODUCT-SPEC.md) for current product scale and the executable audits for the active release gate.

- **Version:** 2026.07-RPD2
- **Audit date:** July 11, 2026
- **Historical scope:** 69 learning experiences, 457 curated cases, 1,495 generated study cards

## Release checks

- 0 exact duplicate case stems
- 0 repeated eight-word stem groups
- 0 malformed multiple-choice questions
- 0 short feedback rationales under the audit threshold
- 0 runtime-generated template/filler cases
- Correct-option distribution: 85 / 85 / 85 across positions 1–3
- 148 advanced-interaction cases (chart review, SBAR, calculation, timed code, journal club, consult packet)
- 113 case stems containing clinical numbers
- Minimum four cases per learning experience
- Study-card daily queue capped at 20
- Critical emergency-checkoff misses block the final readiness result

## Material corrections completed

The audit corrected or clarified the following high-risk areas:

- DKA: potassium threshold, dextrose initiation below 250 mg/dL, and ketone/acid-base resolution rather than anion gap alone
- Sepsis: parallel initial resuscitation rather than a rigid serial “hour-1” sequence
- Polymorphic VT/torsades: immediate unsynchronized shock priority and magnesium’s narrower role
- Beta-blocker poisoning: high-dose insulin and vasopressor support, with glucagon as an adjunct
- Factor-Xa inhibitor bleeding: U.S. andexanet withdrawal and current institutional 4-factor PCC pathways
- Anticoagulation: indication-specific INR targets and renal enoxaparin-monitoring nuance
- Kidney function: label/evidence-specific use of eGFR versus Cockcroft–Gault
- Vancomycin: early AUC-guided monitoring and Bayesian non-steady-state sampling
- Phenytoin and calcium corrections: estimates only, with free phenytoin/ionized calcium caveats
- Infectious diseases: syndrome-specific MRSA therapy, CDI preference hierarchy, and asymptomatic-bacteriuria procedural exceptions
- USP <797>/<800>: Category 1/2 engineering controls, PPE, and CSTD compounding-versus-administration wording
- Oncology: qualified independent verification, TLS/G6PD safety, four-drug highly emetogenic CINV prophylaxis, febrile-neutropenia timing, and ICI colitis grading
- Pediatrics, pregnancy, and immunization: drug-specific pediatric maximums, pregnancy exceptions, iPLEDGE pathways, and route-specific live-vaccine spacing
- Federal controlled-substance law: Schedule II exceptions, Schedule III–IV refill limits, Schedule V distinction, PDMP variability, and buprenorphine authority/MATE requirements
- Research and informatics: QI-versus-research determination, PRISMA reporting role, and CPOE limitations

## Primary evidence families

- AHA CPR/ECC and acute ischemic stroke guidance: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines
- 2024 Hyperglycemic Crises Consensus Report: https://diabetesjournals.org/care/article/47/8/1257/156808/
- SCCM guidelines and 2025 PADIS focused update: https://www.sccm.org/clinical-resources/guidelines
- Surviving Sepsis Campaign: https://www.sccm.org/SurvivingSepsisCampaign/Guidelines
- KDIGO guidance: https://kdigo.org/guidelines/
- FDA labeling and safety communications: https://dailymed.nlm.nih.gov/dailymed/ and https://www.fda.gov/drugs
- IDSA practice guidelines: https://www.idsociety.org/practice-guideline/alphabetical-guidelines/
- USP <797>/<800>: https://www.usp.org/compounding
- CDC/ACIP: https://www.cdc.gov/vaccines/hcp/acip-recs/index.html
- DEA/eCFR: https://www.deadiversion.usdoj.gov/ and https://www.ecfr.gov/current/title-21/chapter-II
- ASHP/ISMP medication-use safety resources: https://www.ashp.org/ and https://www.ismp.org/

Case-level evidence for the 34 independently rewritten high-risk checkoffs is retained in `reviewed-case-evidence.json`. Sources for the 19 minimum-depth cases are retained in `curated-depth-evidence.json`.

## Institutional adoption boundary

This audit supports a commercial pilot and learner-facing educational release. It does not replace local approval. Before a hospital assigns the simulation for formal training, the program must map local formulary, order sets, emergency protocols, EHR workflows, state law, competency checkoffs, and escalation pathways. Simulation scores remain formative coaching evidence and do not confer residency completion, board eligibility, credentialing, or independent-practice validation.
