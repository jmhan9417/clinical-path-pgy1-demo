# Clinical calculator evidence register

Last clinical review: 2026-07-22

This register governs the five advanced educational calculators in `demo.html`. ClinCalc was used to inventory common calculator workflows and to cross-check transparent equations. It is not the controlling clinical authority. Current US guidelines, government sources, original derivation papers, and FDA labeling take priority.

## Evidence hierarchy

1. Current US professional-society guideline or federal guidance
2. Official government or society implementation material
3. FDA prescribing information
4. Original derivation or validation paper
5. Transparent secondary calculator used only for implementation comparison

When sources conflict, the current guideline controls the recommendation layer. The app preserves older workflows only when they remain operationally relevant and clearly labels their current status.

## PREVENT-ASCVD and statin decisions

**Current status:** The 2026 ACC/AHA Multisociety Dyslipidemia Guideline replaces Pooled Cohort Equations with PREVENT-ASCVD for primary-prevention lipid decisions in adults age 30–79 without clinical or known subclinical ASCVD and with LDL-C 70–189 mg/dL.

- Low: <3%
- Borderline: 3% to <5%
- Intermediate: 5% to <10%
- High: ≥10%
- For age 30–59 with 10-year PREVENT-ASCVD risk <3%, 30-year PREVENT-ASCVD risk ≥10% makes moderate-intensity statin therapy reasonable.
- Adults age 40–75 with HIV receiving stable combination antiretroviral therapy have a statin recommendation independent of the raw PREVENT score.
- Groups such as clinical ASCVD, LDL-C ≥190 mg/dL or confirmed familial hypercholesterolemia, and adults age 40–75 with diabetes, confirmed CKD stage 3–4, or HIV follow separate treatment pathways rather than a raw score alone. A single low eGFR does not establish CKD; the app requires chronicity confirmation and suppresses PREVENT during AKI or nonsteady renal function.
- CAC 0 may support deferral only when no exception applies. Diabetes after age 40, current smoking, or a strong premature family history returns the user to the applicable treatment pathway.
- PREVENT-ASCVD does not use BMI. BMI is a predictor in PREVENT heart-failure and total-CVD models.
- Equation inputs are validated against the documented application ranges, including eGFR 15–140 mL/min/1.73 m². General physiologic plausibility is checked before any bypass pathway; LDL-C materially above non-HDL-C is rejected with a 5 mg/dL analytic-tolerance allowance, and values are never silently clamped.

Primary sources:

- [2026 ACC/AHA Multisociety Guideline on the Management of Dyslipidemia](https://www.ahajournals.org/doi/10.1161/CIR.0000000000001423), sections 4.2.3.2, 4.2.3.3, 4.2.3.6, and 4.2.3.7.
- [Khan et al. Development and Validation of the AHA PREVENT Equations](https://pmc.ncbi.nlm.nih.gov/articles/PMC10910659/), including the published coefficient supplement and Table S25 validation vector.
- [AHA PREVENT official overview](https://professional.heart.org/en/guidelines-and-statements/about-prevent-calculator).
- [ACC CVD Risk Estimator Plus](https://tools.acc.org/cvd-risk-estimator-plus/), which states that PCE risk is no longer supported by current ACC clinical policy for this purpose.
- Secondary comparison: [ClinCalc PREVENT](https://clincalc.com/cardiology/PREVENT/), updated April 15, 2026.

Implementation parity vectors:

- Female age 50, SBP 160 treated, TC 200, HDL 45, no statin, diabetes, nonsmoker, eGFR 90 → 10-year PREVENT-ASCVD 9.2% and 30-year PREVENT-ASCVD 35.4%.
- The 30-year base equation is displayed only for ages 30–59 and uses the published sex-specific squared-age term in addition to the centered predictors and interactions.
- Male age 66, SBP 148 untreated, TC 188, HDL 52, statin, diabetes, smoker, eGFR 67 → 14.2%.

The browser equation is translated from the published PREVENT base-model coefficients and cross-checked against the official published vectors. The supporting MIT-licensed `preventr` and `pyprevent` implementations were used as independent code-level parity checks, not as clinical authorities.

## Type 2 diabetes medication decisions and insulin teaching

**Current status:** ADA Standards of Care in Diabetes 2026 controls the adult ambulatory type 2 diabetes pathway.

- Established ASCVD/high risk supports a GLP-1 RA and/or SGLT2 inhibitor with demonstrated cardiovascular benefit irrespective of A1C or metformin use.
- HFrEF or HFpEF supports an SGLT2 inhibitor with proven HF benefit irrespective of A1C; TZDs are avoided in HF.
- Confirmed CKD with eGFR 20–60 and/or albuminuria supports a proven-benefit SGLT2 inhibitor or GLP-1 RA. SGLT2 initiation is supported at eGFR ≥20, while glycemic effect is reduced below 45. At eGFR <30, an appropriate nonrenally cleared GLP-1 RA is preferred for additional glucose lowering.
- Insulin is considered for symptomatic or catabolic hyperglycemia, A1C >10%, glucose ≥300 mg/dL, or suspected marked insulin deficiency. Without severe hyperglycemia or crisis, GLP-1–based therapy is preferred to insulin as the initial injectable when appropriate.
- Basal initiation is displayed as 10 units/day or 0.1–0.2 units/kg/day. Example titration is +2 units every 3 days only when unexplained hypoglycemia is absent.
- Unexplained hypoglycemia is a safety stop: the worksheet suppresses insulin-initiation and first-prandial dose arithmetic, prioritizes treatment and pattern review, and leaves deintensification to clinician judgment.
- When no hypoglycemia safety stop is present, first prandial insulin is displayed as 4 units or 10% of basal. When A1C is <8%, the worksheet also describes a possible basal reduction of 4 units or 10%.
- The worksheet excludes pediatrics, pregnancy, type 1 dosing, pumps/AID, DKA/HHS, ICU, and inpatient protocol selection.

Primary sources:

- [ADA 2026 Pharmacologic Approaches](https://pmc.ncbi.nlm.nih.gov/articles/PMC12690185/), Recommendations 9.5–9.30 and Figures 9.4–9.5.
- [ADA 2026 type 2 medication algorithm](https://pmc.ncbi.nlm.nih.gov/articles/PMC12690185/figure/F4/).
- [ADA 2026 injectable intensification algorithm](https://pmc.ncbi.nlm.nih.gov/articles/PMC12690185/figure/F5/).
- [ADA 2026 Glycemic Goals and Hypoglycemia](https://pmc.ncbi.nlm.nih.gov/articles/PMC12690178/).
- [ADA 2026 Cardiovascular Disease](https://pmc.ncbi.nlm.nih.gov/articles/PMC12690187/).
- [ADA 2026 Chronic Kidney Disease](https://doi.org/10.2337/dc26-S011).

## Vancomycin AUC and trough workflows

**Current status:** The 2020 ASHP/IDSA/PIDS/SIDP consensus guideline remains the current US national guidance found as of the review date.

- For serious invasive MRSA, AUC-guided monitoring is preferred. Target AUC24/MIC is 400–600 mg·h/L when MIC by broth microdilution is 1 mg/L.
- The target should be reached within 24–48 hours.
- Trough-only targeting of 15–20 mg/L is no longer recommended for serious MRSA because it may create excess exposure and nephrotoxicity.
- Trough concentrations remain operationally relevant as Bayesian inputs, facility-defined monitoring for other indications, individualized surrogates after an AUC is established, and predialysis monitoring in intermittent hemodialysis.
- The app implements a transparent two-level, near-steady-state, first-order PK estimate. It is not labeled Bayesian.
- Static regimen projection is suppressed when renal function is unstable.

Implemented one-compartment, near-steady-state equations:

- `k = ln(C1/C2) / (t2 - t1)` and `t½ = 0.693 / k`, where `t1` and `t2` are hours after the infusion ends.
- `Cmax = C1 × e^(k×t1)` and `Cmin = C2 × e^[-k×(τ - tinf - t2)]`.
- With infusion rate `R0 = dose/tinf`, `Vd = [R0 × (1 - e^(-k×tinf))] / {k × [Cmax - Cmin × e^(-k×tinf)]}`.
- `CL = k × Vd`; `AUC24 = (dose × 24/τ) / CL`; `AUC24/MIC = AUC24 / MIC`.

These equations are disclosed for reproducibility and teaching. They do not replace a validated Bayesian platform, exact administration and sampling records, or patient-specific pharmacist review.

Primary sources:

- [ASHP/IDSA/PIDS/SIDP Vancomycin Consensus Guideline](https://www.idsociety.org/practice-guideline/vancomycin/), especially recommendations 1–5 and 8–16.
- [ASHP full guideline PDF](https://www.ashp.org/-/media/assets/policy-guidelines/docs/therapeutic-guidelines/therapeutic-guidelines-monitoring-vancomycin-ASHP-IDSA-PIDS.pdf).
- [Sawchuk–Zaske original two-level PK method](https://pubmed.ncbi.nlm.nih.gov/950590/).
- Secondary comparison: [ClinCalc Vancomycin Calculator](https://clincalc.com/vancomycin/).

## Creatinine clearance and GFR

**Current status:** The default adult GFR estimate is the race-free 2021 CKD-EPI equation. Cockcroft–Gault remains relevant when a drug label or institutional protocol explicitly requires creatinine clearance.

- CKD-EPI 2021 creatinine eGFR is the main adult CKD/GFR output.
- CKD-EPI 2021 creatinine-cystatin C is preferred near consequential dosing thresholds or when creatinine is unreliable.
- Absolute, de-indexed eGFR is shown when height and weight are available.
- Cockcroft–Gault defaults to “show all” and never chooses a dosing weight automatically. Ideal weight is available only when actual weight is at least IBW; AdjBW0.4 is available only when BMI is ≥30 kg/m². Any explicit selection is labeled as a drug-label or local-protocol choice.
- A GFR category alone is not labeled as a CKD diagnosis; chronicity, cause, and albuminuria complete KDIGO CGA classification.
- Static equations are not treated as reliable dosing endpoints during AKI, pregnancy, or other nonsteady states.
- Race-based 2009 CKD-EPI, MDRD, Jelliffe, and Salazar–Corcoran are not implemented as current defaults.

Primary sources:

- [KDIGO 2024 CKD Guideline](https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf), practice points 1.2.2 and 4.2.1–4.2.5 and Table 8.
- [NIDDK adult GFR equations](https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/glomerular-filtration-rate-equations/adults).
- [NIDDK drug dosing in CKD](https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/ckd-drug-dosing-providers).
- [FDA renal-impairment pharmacokinetic guidance](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/pharmacokinetics-patients-impaired-renal-function-study-design-data-analysis-and-impact-dosing).
- [Inker et al. 2021 race-free CKD-EPI equations](https://pubmed.ncbi.nlm.nih.gov/34554658/).
- [Cockcroft and Gault 1976](https://pubmed.ncbi.nlm.nih.gov/1244564/).
- Secondary comparison: [ClinCalc Creatinine Clearance](https://clincalc.com/kinetics/crcl.aspx).

## KDIGO acute kidney injury recognition and staging

**Current status:** KDIGO 2012 remains the current finalized AKI guideline as of July 22, 2026. The 2026 AKI/AKD update is still a draft and is not implemented.

- AKI is detected by SCr increase ≥0.3 mg/dL within 48 hours, SCr ≥1.5× measured stable baseline within 7 days, or urine output <0.5 mL/kg/h for 6 hours.
- Stage 1: SCr 1.5–1.9× or rise ≥0.3 mg/dL; UO <0.5 for 6–<12 hours.
- Stage 2: SCr 2.0–2.9×; UO <0.5 for ≥12 hours.
- Stage 3: SCr ≥3×, qualifying acute SCr ≥4.0 mg/dL, UO <0.3 for ≥24 hours, anuria ≥12 hours, or new RRT for the acute episode.
- Component stages are shown separately; the highest SCr, UO, or RRT stage controls.
- A missing baseline is never silently back-calculated. Static CKD-EPI and Cockcroft–Gault dosing precision is suppressed when AKI criteria are met.

Primary sources:

- [KDIGO 2012 AKI Guideline](https://kdigo.org/wp-content/uploads/2016/10/KDIGO-2012-AKI-Guideline-English.pdf), Recommendation 2.1.1 and Table 2.
- [KDIGO definition and classification section](https://pmc.ncbi.nlm.nih.gov/articles/PMC4089595/).
- [Adult baseline-creatinine estimation review](https://pmc.ncbi.nlm.nih.gov/articles/PMC9325517/).
- [Urine-output assessment review](https://pmc.ncbi.nlm.nih.gov/articles/PMC6985265/).

## Opioid MME, dosing scope, and rotation teaching

**Current status:** CDC 2022 controls outpatient opioid principles and MME risk context; current FDA labels control product-specific use. MME must not be reversed into a rotation dose.

- Opioid-naive initiation is never auto-dosed. Acute pain routes to immediate-release, lowest-effective-dose, shortest-necessary-duration principles; subacute or chronic pain routes to a manual benefit–risk and functional-goal process.
- ER/LA initiation, methadone, fentanyl, buprenorphine, OUD, parenteral/PCA/neuraxial therapy, pediatrics, pregnancy, cancer/sickle-cell/palliative pain, co-sedatives, respiratory red flags, organ impairment, and unstable use stop automated dose math.
- ≥50 MME/day is a reassessment, follow-up, overdose-education, and naloxone guidepost, not a rigid ceiling or forced-taper trigger.
- The bounded rotation worksheet accepts only one stable oral immediate-release morphine, oxycodone, or hydromorphone source. It uses actual representative 24-hour consumption, the Merck oral single-dose table, and a 50% educational cross-tolerance estimate.
- Every scope-control change invalidates prior approval, replaces any stale MME display, and the rotation function re-evaluates current scope again at execution time. MME output is blocked for excluded populations, non-outpatient settings, unsupported routes, or unstable organ function.
- No final tablet schedule, interval, rescue dose, quantity, taper, or prescription is generated.

Primary sources:

- [CDC Clinical Practice Guideline for Prescribing Opioids for Pain, 2022](https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm), Recommendations 1–5 and the MME table.
- [Merck Manual Professional equianalgesic table](https://www.merckmanuals.com/professional/multimedia/table/equianalgesic-doses-of-opioid-analgesics).
- [FDA morphine immediate-release labeling](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5ceb3205-2f8d-4ba3-9f27-dc328bab4fa1).
- [FDA oxycodone immediate-release labeling](https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e73897d6-b920-4300-a564-5dbc9c8e9fe9).
- [FDA hydromorphone immediate-release labeling](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d6b40e39-a57e-402c-b4f6-7041e832f837).

## Maintenance rule

Any future update must re-check the controlling guideline, original equation or label, calculator parity vectors, and every linked case. The visible calculator status line and this register’s review date must be updated together.
