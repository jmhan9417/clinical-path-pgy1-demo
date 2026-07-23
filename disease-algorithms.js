/*
 * Disease-State Algorithms
 * Original educational pathways based on current guideline sources.
 * Last clinical review: 2026-07-22
 */
const DISEASE_ALGORITHMS={
  hypertension:{
    title:'Adult Hypertension',category:'Cardiovascular',summary:'Confirm the blood-pressure phenotype, identify urgency and risk, then match treatment intensity and follow-up.',reviewed:'2026-07-22',
    stages:[
      {label:'Confirm',nodes:[['Accurate measurement','Use validated technique and average repeated readings. Confirm with home or ambulatory monitoring when appropriate.'],['Emergency screen','Acute target-organ injury with severe hypertension exits to emergency evaluation; do not use this ambulatory pathway.']]},
      {label:'Classify',nodes:[['Normal or elevated','Normal <120/<80. Elevated BP is 120–129 and <80 mmHg.'],['Stage 1','130–139 systolic or 80–89 diastolic mmHg.'],['Stage 2','≥140 systolic or ≥90 diastolic mmHg.']]},
      {label:'Risk',nodes:[['Baseline evaluation','Assess CVD, diabetes, CKD, pregnancy, medications, secondary causes, labs, UACR, and ECG when indicated.'],['Stage 1 risk split','Established CVD, diabetes, CKD, or elevated 10-year cardiovascular risk supports medication plus lifestyle; otherwise begin lifestyle and reassess.']]},
      {label:'Treat',nodes:[['Lifestyle for all','Address sodium, dietary pattern, activity, weight, alcohol, tobacco, sleep, and adherence.'],['Medication intensity','Use a first-line class when indicated; Stage 2 commonly starts two complementary first-line agents. Pregnancy requires a separate medication pathway.']]},
      {label:'Follow',nodes:[['Goal and reassessment','General goal is <130/80 mmHg when tolerated. Reassess response, orthostasis, kidney function, potassium, adherence, and adverse effects.']]}
    ],
    sources:[
      ['2025 AHA/ACC High Blood Pressure Guideline','https://professional.heart.org/en/science-news/2025-high-blood-pressure-guideline'],
      ['AHA Professional Heart Daily guideline hub','https://professional.heart.org/en/guidelines-and-statements']
    ]
  },
  ascvd:{
    title:'Primary-Prevention ASCVD and Statins',category:'Cardiovascular',summary:'Check treatment groups that bypass calculated risk, then use PREVENT, risk enhancers, and selective CAC.',reviewed:'2026-07-22',
    stages:[
      {label:'Eligibility',nodes:[['Clinical or subclinical ASCVD','Use the disease-burden pathway; PREVENT is not the treatment gate.'],['LDL-C ≥190 or familial hypercholesterolemia','Use the severe-hypercholesterolemia pathway regardless of a low calculated risk.']]},
      {label:'Independent paths',nodes:[['Age 40–75','For adults age 40–75, diabetes, confirmed CKD stage 3–4, or HIV on stable ART carries a recommendation for lipid-lowering independent of the raw PREVENT threshold.']]},
      {label:'Calculate',nodes:[['PREVENT-ASCVD','For validated adults age 30–79, calculate 10-year risk; add 30-year risk at age 30–59. Do not calculate during AKI or with implausible inputs.'],['Risk bands','Low <3%; borderline 3–<5%; intermediate 5–<10%; high ≥10%.']]},
      {label:'Refine',nodes:[['Risk enhancers','Premature family history, inflammatory disease, elevated Lp(a), apoB, triglycerides, and other enhancers can change a borderline decision.'],['Selective CAC','When uncertainty remains, CAC can reclassify risk. CAC 0 does not support deferral with diabetes after age 40, current smoking, or strong premature family history.']]},
      {label:'Treat',nodes:[['Match intensity to pathway','Use the controlling pathway to select statin intensity, percent LDL-C reduction, and LDL-C/non-HDL-C goal; check interactions and tolerance.']]}
    ],
    sources:[
      ['2026 ACC/AHA Multisociety Dyslipidemia Guideline','https://professional.heart.org/en/science-news/2026-guideline-on-the-management-of-dyslipidemia'],
      ['AHA PREVENT official overview','https://professional.heart.org/en/guidelines-and-statements/about-prevent-calculator']
    ]
  },
  diabetes:{
    title:'Adult Type 2 Diabetes Therapy',category:'Endocrine',summary:'Confirm scope and crisis status, prioritize cardiorenal benefit, then individualize glucose lowering and monitoring.',reviewed:'2026-07-22',
    stages:[
      {label:'Confirm',nodes:[['Type and urgency','Suspected type 1 diabetes, DKA/HHS, pregnancy, pediatrics, ICU, or marked catabolism exits this ambulatory type 2 pathway.'],['Individualize goal','Set the A1C goal using comorbidity, hypoglycemia risk, treatment burden, and patient preference.']]},
      {label:'Cardiorenal first',nodes:[['ASCVD or high risk','Use a GLP-1 RA and/or SGLT2 inhibitor with demonstrated cardiovascular benefit irrespective of A1C or metformin.'],['Heart failure','Prioritize an SGLT2 inhibitor with proven HF benefit.'],['CKD or albuminuria','Use a proven-benefit SGLT2 inhibitor and/or GLP-1 RA according to eGFR, albuminuria, and tolerability.']]},
      {label:'Severe glucose',nodes:[['Symptoms, catabolism, A1C >10%, or glucose ≥300','Consider insulin after crisis and diabetes type are assessed. Do not auto-prescribe from a calculator.']]},
      {label:'Choose therapy',nodes:[['No dominant comorbidity','Match efficacy, weight effect, hypoglycemia, organ function, cost, route, and preference. Avoid combining GLP-1–based therapy with a DPP-4 inhibitor.'],['Injectable choice','When appropriate and severe hyperglycemia is absent, consider GLP-1–based therapy before insulin.']]},
      {label:'Reassess',nodes:[['Close the loop','Review A1C and BGM/CGM patterns, hypoglycemia, weight, cardiorenal benefit, adherence, access, and therapeutic inertia.']]}
    ],
    sources:[
      ['ADA Standards of Care 2026: Pharmacologic Approaches','https://pmc.ncbi.nlm.nih.gov/articles/PMC12690185/'],
      ['ADA Standards of Care 2026: Glycemic Goals and Hypoglycemia','https://pmc.ncbi.nlm.nih.gov/articles/PMC12690178/'],
      ['ADA Standards of Care 2026: Cardiovascular Disease','https://pmc.ncbi.nlm.nih.gov/articles/PMC12690187/']
    ]
  },
  hfrEF:{
    title:'Chronic HFrEF Guideline-Directed Therapy',category:'Cardiovascular',summary:'Confirm phenotype and congestion, establish the four foundational therapies, then titrate and reassess.',reviewed:'2026-07-22',
    stages:[
      {label:'Confirm',nodes:[['HFrEF phenotype','Confirm symptoms/signs and LVEF ≤40%; identify ischemia, rhythm, valve disease, blood pressure, kidney function, potassium, and reversible causes.'],['Decompensation screen','Shock, hypoperfusion, severe congestion, or acute organ injury exits to an acute-care pathway.']]},
      {label:'Stabilize',nodes:[['Treat congestion','Use diuretics for fluid retention and establish euvolemia while monitoring weight, symptoms, kidney function, and electrolytes.']]},
      {label:'Four pillars',nodes:[['ARNI/ACEI/ARB','Use one renin-angiotensin system pathway; never combine ARNI with an ACE inhibitor.'],['Evidence-based beta-blocker','Use carvedilol, metoprolol succinate, or bisoprolol when clinically stable.'],['MRA','Use when kidney function and potassium permit, with close laboratory monitoring.'],['SGLT2 inhibitor','Use for HFrEF benefit regardless of diabetes status when appropriate.']]},
      {label:'Titrate',nodes:[['Build early, then optimize','Start low as needed and titrate toward evidence-based doses while monitoring BP, heart rate, potassium, kidney function, congestion, and adherence.']]},
      {label:'Escalate',nodes:[['Persistent risk','Consider hydralazine/isosorbide, ivabradine, devices, iron evaluation, specialty referral, and advanced-HF assessment when indicated.']]}
    ],
    sources:[
      ['2022 AHA/ACC/HFSA Heart Failure Guideline','https://pubmed.ncbi.nlm.nih.gov/35363499/'],
      ['ACC Heart Failure Guideline Hub','https://www.acc.org/guidelines']
    ]
  },
  kidney:{
    title:'AKI Recognition and CKD Classification',category:'Renal',summary:'Identify acute nonsteady kidney function first; only then classify chronic kidney disease and drug-dosing implications.',reviewed:'2026-07-22',
    stages:[
      {label:'Acute screen',nodes:[['KDIGO AKI criteria','SCr rise ≥0.3 mg/dL within 48 h, SCr ≥1.5× measured baseline within 7 days, or urine output <0.5 mL/kg/h for 6 h.'],['Stage by highest component','Use the highest SCr, urine-output, or new-RRT stage. A missing baseline is not silently back-calculated.']]},
      {label:'Respond to AKI',nodes:[['Stop false precision','Do not treat CKD-EPI or Cockcroft–Gault as stable dosing endpoints during rapidly changing SCr.'],['Immediate review','Assess volume, perfusion, obstruction, nephrotoxins, infection, drug accumulation, urine output, electrolytes, acid-base status, and need for specialist care.']]},
      {label:'Chronicity',nodes:[['CKD requires persistence','Confirm kidney-structure/function abnormality for ≥3 months; a single low eGFR does not diagnose CKD.']]},
      {label:'Classify CGA',nodes:[['Cause, GFR, albuminuria','Assign cause, G1–G5 GFR category, and A1–A3 albuminuria category. Use validated kidney-failure risk tools when appropriate.']]},
      {label:'Manage and refer',nodes:[['Risk reduction','Control BP, use ACEI/ARB for indicated albuminuria, consider SGLT2 therapy, avoid nephrotoxins, and dose drugs with the label-specified kidney metric.'],['Referral triggers','Refer for advanced/progressive disease, high kidney-failure risk, severe albuminuria, resistant hypertension, persistent electrolyte/acid-base problems, or uncertain cause.']]}
    ],
    sources:[
      ['KDIGO 2012 Acute Kidney Injury Guideline','https://kdigo.org/wp-content/uploads/2016/10/KDIGO-2012-AKI-Guideline-English.pdf'],
      ['KDIGO 2024 CKD Guideline','https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf']
    ]
  },
  af:{
    title:'Atrial Fibrillation Assessment and Treatment',category:'Cardiovascular',summary:'Stabilize first, prevent stroke by validated risk, then individualize rate or rhythm control.',reviewed:'2026-07-22',
    stages:[
      {label:'Confirm',nodes:[['Document AF','Confirm the rhythm and assess onset, symptoms, hemodynamics, triggers, thyroid status, structural disease, kidney function, and medications.'],['Unstable AF','Hypotension, ischemia, shock, or pulmonary edema requires urgent synchronized cardioversion.']]},
      {label:'Stroke risk',nodes:[['Estimate annual thromboembolic risk','Use a validated score such as CHA₂DS₂-VASc and consider risk modifiers. Do not base anticoagulation on apparent rhythm control alone.'],['Bleeding review','Identify modifiable bleeding risks and interactions; bleeding scores do not by themselves deny indicated anticoagulation.']]},
      {label:'Anticoagulate',nodes:[['Eligible patients','DOACs are generally preferred over warfarin except in mechanical valves or moderate-to-severe rheumatic mitral stenosis. Verify label dose, kidney function, age, weight, and interactions.']]},
      {label:'Control symptoms',nodes:[['Rate control','Select a beta-blocker or nondihydropyridine calcium-channel blocker when appropriate; avoid harmful agents in HFrEF.'],['Rhythm control','Consider early rhythm control, cardioversion, antiarrhythmic therapy, or ablation according to symptoms, HF, AF duration, and patient goals.']]},
      {label:'Modify risk',nodes:[['Long-term care','Address weight, exercise, BP, sleep apnea, alcohol, tobacco, diabetes, and HF; reassess stroke risk and therapy over time.']]}
    ],
    sources:[
      ['2023 ACC/AHA/ACCP/HRS Atrial Fibrillation Guideline','https://pubmed.ncbi.nlm.nih.gov/38033089/'],
      ['ACC Atrial Fibrillation Guideline Hub','https://www.acc.org/guidelines']
    ]
  },
  vte:{
    title:'Venous Thromboembolism',category:'Anticoagulation',summary:'Estimate pretest probability, confirm DVT/PE efficiently, identify instability, then select anticoagulation and duration.',reviewed:'2026-07-22',
    stages:[
      {label:'Suspect',nodes:[['DVT or PE features','Estimate validated pretest probability and evaluate alternative diagnoses. Hemodynamic instability or severe hypoxemia requires emergency PE assessment.']]},
      {label:'Test',nodes:[['Low probability','A validated rule and high-sensitivity D-dimer can avoid imaging in appropriate patients.'],['Higher probability','Proceed to compression ultrasonography for DVT or CT pulmonary angiography/VQ strategy for PE as appropriate.']]},
      {label:'Risk',nodes:[['Confirmed PE','Stratify hemodynamics, right-ventricular strain, biomarkers, bleeding risk, and suitability for outpatient care.']]},
      {label:'Treat',nodes:[['Anticoagulation','Choose a label-appropriate anticoagulant using kidney/liver function, cancer, pregnancy, antiphospholipid syndrome, interactions, adherence, and access.'],['Reperfusion','High-risk PE with instability requires urgent multidisciplinary reperfusion evaluation; do not derive this from a dosing calculator.']]},
      {label:'Duration',nodes:[['Minimum treatment and reassessment','Treat the acute event for the guideline-defined primary phase, then reassess transient versus persistent provoking factors, recurrence risk, bleeding risk, and patient preference before extended therapy.']]}
    ],
    sources:[
      ['CHEST Antithrombotic Therapy for VTE Disease Compendium','https://pubmed.ncbi.nlm.nih.gov/38458430/'],
      ['ASH VTE Guidelines','https://www.hematology.org/education/clinicians/guidelines-and-quality-care/clinical-practice-guidelines/venous-thromboembolism-guidelines']
    ]
  },
  stroke:{
    title:'Acute Ischemic Stroke',category:'Emergency',summary:'Establish time and imaging, evaluate reperfusion without delay, then manage antithrombotics and secondary prevention safely.',reviewed:'2026-07-22',
    stages:[
      {label:'Activate',nodes:[['Last known well and deficit','Activate the stroke pathway, document time, NIHSS elements, glucose, weight, anticoagulants, BP, and contraindications.']]},
      {label:'Image',nodes:[['Noncontrast head CT','Exclude hemorrhage immediately; obtain vascular imaging for suspected large-vessel occlusion without delaying eligible thrombolysis.']]},
      {label:'Thrombolysis',nodes:[['Eligible disabling deficit','Evaluate IV thrombolysis within the guideline time window using agent-specific dose and BP requirements.'],['Safety stop','Do not treat a calculator result as eligibility; bleeding risk, imaging, anticoagulants, recent procedures, labs, and institutional protocol control.']]},
      {label:'Thrombectomy',nodes:[['Large-vessel occlusion','Evaluate endovascular thrombectomy rapidly; selected patients may remain eligible in an extended window using imaging and clinical criteria.']]},
      {label:'Aftercare',nodes:[['Post-reperfusion monitoring','Follow BP and antithrombotic timing rules, assess swallowing, manage complications, identify mechanism, and start secondary prevention.']]}
    ],
    sources:[
      ['2026 AHA/ASA Acute Ischemic Stroke Guideline','https://pubmed.ncbi.nlm.nih.gov/41582814/'],
      ['AHA Stroke Guideline Hub','https://professional.heart.org/en/guidelines-and-statements']
    ]
  },
  sepsis:{
    title:'Adult Sepsis and Septic Shock',category:'Critical Care',summary:'Recognize organ dysfunction, begin parallel resuscitation and source control, then reassess perfusion and de-escalate.',reviewed:'2026-07-22',
    stages:[
      {label:'Recognize',nodes:[['Suspected infection plus organ dysfunction','Assess mental status, lactate, perfusion, oxygenation, urine output, cultures, and likely source. qSOFA alone is not a screening rule-out.'],['Septic shock','Persistent hypotension requiring vasopressors to maintain MAP and elevated lactate despite adequate volume requires critical-care management.']]},
      {label:'First actions',nodes:[['Parallel work','Obtain cultures when this does not meaningfully delay therapy, measure lactate, start appropriate antimicrobials promptly, and begin source-control planning.']]},
      {label:'Resuscitate',nodes:[['Fluids','Use balanced crystalloids as appropriate and reassess fluid responsiveness, pulmonary status, and perfusion rather than giving unbounded volume.'],['Vasopressors','Use norepinephrine first line for septic shock; target an initial MAP around 65 mmHg and individualize.']]},
      {label:'Source and drugs',nodes:[['Source control','Drain, remove, debride, or operate as soon as medically and logistically practical.'],['Antimicrobial reassessment','Use local epidemiology, organ function, allergy, and exposure history; narrow or stop therapy as cultures and diagnosis evolve.']]},
      {label:'Reassess',nodes:[['Close the loop','Trend perfusion, lactate context, urine output, organ support, glucose, thrombosis prevention, nutrition, goals of care, and treatment toxicity.']]}
    ],
    sources:[
      ['Surviving Sepsis Campaign International Guidelines 2026','https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026'],
      ['SCCM Sepsis Guidelines Hub','https://www.sccm.org/clinical-resources/guidelines']
    ]
  },
  cap:{
    title:'Adult Community-Acquired Pneumonia',category:'Infectious Diseases',summary:'Confirm pneumonia, determine site and severity, select empiric therapy by risk, then reassess stability and duration.',reviewed:'2026-07-22',
    stages:[
      {label:'Confirm',nodes:[['Compatible syndrome plus imaging','Use symptoms, examination, oxygenation, and chest imaging; consider viral testing and alternative diagnoses.']]},
      {label:'Site and severity',nodes:[['Outpatient versus inpatient','Use clinical judgment with a validated severity tool; identify hypoxemia, inability to take oral therapy, decompensated comorbidity, or social barriers.'],['Severe CAP','Apply major/minor severe-CAP criteria and evaluate ICU-level support.']]},
      {label:'Risk factors',nodes:[['MRSA or Pseudomonas risk','Use validated local risk factors such as prior respiratory isolation or recent hospitalization with parenteral antibiotics; obtain cultures when broad coverage is used.']]},
      {label:'Empiric treatment',nodes:[['Match setting and comorbidity','Select the guideline regimen using allergy, renal/hepatic function, interactions, QT risk, local resistance, and recent antibiotics. Avoid automatic anaerobic coverage without a specific indication.']]},
      {label:'Reassess',nodes:[['Clinical stability and de-escalation','Review cultures and response at 48–72 hours, narrow therapy, switch IV to oral when stable, and use the minimum effective duration with follow-up for nonresponse.']]}
    ],
    sources:[
      ['ATS/IDSA Community-Acquired Pneumonia Guideline','https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults/'],
      ['IDSA Clinical Practice Guidelines','https://www.idsociety.org/practice-guidelines/']
    ]
  }
};

var DISEASE_ALGORITHM_RETURN_FOCUS=null,DISEASE_ALGORITHM_ACTIVE='hypertension';
function diseaseAlgorithmEscape(value){return String(value??'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function diseaseAlgorithmSourcesHTML(item){return `<section class="algorithm-sources"><div><b>Guideline sources</b><span>Last reviewed ${diseaseAlgorithmEscape(item.reviewed)}</span></div><ol>${item.sources.map(function(s){return `<li><a href="${s[1]}" target="_blank" rel="noopener">${diseaseAlgorithmEscape(s[0])}</a></li>`;}).join('')}</ol><p>Original educational pathway. Verify the complete guideline, patient-specific facts, and local protocol before clinical use.</p></section>`;}
function diseaseAlgorithmPathHTML(item){return `<div class="algorithm-path" aria-label="${diseaseAlgorithmEscape(item.title)} decision pathway">${item.stages.map(function(stage,index){return `<section class="algorithm-stage"><header><span>${String(index+1).padStart(2,'0')}</span><div><b>${diseaseAlgorithmEscape(stage.label)}</b><small>Decision stage</small></div></header><div class="algorithm-nodes">${stage.nodes.map(function(node){return `<article><h4>${diseaseAlgorithmEscape(node[0])}</h4><p>${diseaseAlgorithmEscape(node[1])}</p></article>`;}).join('')}</div></section>`;}).join('')}</div>`;}
function diseaseAlgorithmDetailHTML(key){const item=DISEASE_ALGORITHMS[key];if(!item)return '';return `<div class="algorithm-detail-head"><div><span class="concept-kicker">${diseaseAlgorithmEscape(item.category)} algorithm</span><h3 id="diseaseAlgorithmTitle">${diseaseAlgorithmEscape(item.title)}</h3><p>${diseaseAlgorithmEscape(item.summary)}</p></div><button class="btn ghost sm" id="diseaseAlgorithmClose" onclick="closeDiseaseAlgorithms()">Close</button></div>${diseaseAlgorithmPathHTML(item)}${diseaseAlgorithmSourcesHTML(item)}`;}
function diseaseAlgorithmLibraryRows(query){const q=String(query||'').trim().toLowerCase();return Object.keys(DISEASE_ALGORITHMS).filter(function(key){const item=DISEASE_ALGORITHMS[key];return !q||(item.title+' '+item.category+' '+item.summary).toLowerCase().includes(q);}).map(function(key){const item=DISEASE_ALGORITHMS[key];return `<button type="button" class="algorithm-library-item" onclick="openDiseaseAlgorithm('${key}')"><span>${diseaseAlgorithmEscape(item.category)}</span><b>${diseaseAlgorithmEscape(item.title)}</b><small>${diseaseAlgorithmEscape(item.summary)}</small></button>`;}).join('')||'<div class="abx-empty">No matching algorithm found.</div>';}
function filterDiseaseAlgorithms(){const host=document.getElementById('diseaseAlgorithmRows'),input=document.getElementById('diseaseAlgorithmSearch');if(host)host.innerHTML=diseaseAlgorithmLibraryRows(input?.value||'');}
function diseaseAlgorithmKeydown(e){const ov=document.getElementById('diseaseAlgorithmOv');if(!ov)return;if(e.key==='Escape'){e.preventDefault();closeDiseaseAlgorithms();return;}if(typeof trapCalculatorFocus==='function')trapCalculatorFocus(e,ov);}
function closeDiseaseAlgorithms(restoreFocus=true){const saved=DISEASE_ALGORITHM_RETURN_FOCUS,ov=document.getElementById('diseaseAlgorithmOv');if(ov)ov.remove();document.removeEventListener('keydown',diseaseAlgorithmKeydown);DISEASE_ALGORITHM_RETURN_FOCUS=null;if(restoreFocus&&saved)setTimeout(function(){const target=saved==='resident-tools'?document.querySelector('[aria-label="Resident tools"]'):saved;if(target&&target.isConnected)target.focus();},20);}
function showDiseaseAlgorithms(ev,returnFocus){if(ev){ev.preventDefault();ev.stopPropagation();}const target=returnFocus||DISEASE_ALGORITHM_RETURN_FOCUS||document.activeElement;closeDiseaseAlgorithms(false);DISEASE_ALGORITHM_RETURN_FOCUS=target;const ov=document.createElement('div');ov.className='lab-ref-ov';ov.id='diseaseAlgorithmOv';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-labelledby','diseaseAlgorithmLibraryTitle');ov.innerHTML=`<div class="lab-ref-card algorithm-library"><div class="algorithm-detail-head"><div><span class="concept-kicker">Independent clinical library</span><h3 id="diseaseAlgorithmLibraryTitle">Disease-State Algorithms</h3><p>Diagnosis, staging, risk stratification, treatment selection, and monitoring pathways with current guideline sources.</p></div><button class="btn ghost sm" id="diseaseAlgorithmClose" onclick="closeDiseaseAlgorithms()">Close</button></div><div class="algorithm-library-tools"><input id="diseaseAlgorithmSearch" class="abx-search" type="search" placeholder="Search disease state or specialty" aria-label="Search disease-state algorithms" oninput="filterDiseaseAlgorithms()"></div><div class="algorithm-library-grid" id="diseaseAlgorithmRows">${diseaseAlgorithmLibraryRows('')}</div></div>`;document.getElementById('app').appendChild(ov);ov.onclick=function(e){if(e.target===ov)closeDiseaseAlgorithms();};document.addEventListener('keydown',diseaseAlgorithmKeydown);setTimeout(function(){document.getElementById('diseaseAlgorithmSearch')?.focus();},20);}
function openDiseaseAlgorithm(key){const item=DISEASE_ALGORITHMS[key];if(!item)return;const existing=document.getElementById('diseaseAlgorithmOv');if(!existing)DISEASE_ALGORITHM_RETURN_FOCUS=document.activeElement;if(existing)existing.remove();DISEASE_ALGORITHM_ACTIVE=key;const ov=document.createElement('div');ov.className='lab-ref-ov';ov.id='diseaseAlgorithmOv';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-labelledby','diseaseAlgorithmTitle');ov.innerHTML=`<div class="lab-ref-card algorithm-card">${diseaseAlgorithmDetailHTML(key)}<footer class="algorithm-footer"><button class="btn ghost sm" onclick="showDiseaseAlgorithms(event)">Browse all algorithms</button></footer></div>`;document.getElementById('app').appendChild(ov);ov.onclick=function(e){if(e.target===ov)closeDiseaseAlgorithms();};document.addEventListener('keydown',diseaseAlgorithmKeydown);setTimeout(function(){document.getElementById('diseaseAlgorithmClose')?.focus();},20);}
