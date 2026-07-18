import fs from 'node:fs';
const html=fs.readFileSync(new URL('../demo.html',import.meta.url),'utf8');
const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
let app=scripts.sort((a,b)=>b.length-a.length)[0].replace(/\nshowTitle\(\);/g,'\n/* boot skipped for audit */');
const stub=()=>new Proxy(function(){},{get:(t,p)=>p==='style'?stub():p==='classList'?{add(){},remove(){},toggle(){}}:stub(),set:()=>true,apply:()=>stub(),construct:()=>stub()});
globalThis.window=globalThis;globalThis.document={documentElement:{style:{setProperty(){}}},body:stub(),addEventListener(){},removeEventListener(){},getElementById(){return stub()},querySelector(){return null},querySelectorAll(){return[]},createElement(){let raw='';return{style:{},classList:{add(){},remove(){}},setAttribute(){},set innerHTML(v){raw=String(v||'')},get innerHTML(){return raw},get textContent(){return raw.replace(/<[^>]*>/g,' ')},get innerText(){return raw.replace(/<[^>]*>/g,' ')},appendChild(){},remove(){},click(){}}}};globalThis.localStorage={getItem(){return null},setItem(){},removeItem(){}};Object.defineProperty(globalThis,'navigator',{value:{},configurable:true});globalThis.location={reload(){}};globalThis.Image=class{};globalThis.Audio=class{};globalThis.requestAnimationFrame=()=>0;globalThis.cancelAnimationFrame=()=>{};globalThis.setTimeout=()=>0;globalThis.confirm=()=>false;globalThis.URL={createObjectURL(){return''},revokeObjectURL(){}};
const audit=`(()=>{const checks=[],add=(name,pass,detail='')=>checks.push({name,pass:Boolean(pass),detail});
const keys=Object.keys(CONCEPT_CONTENT);
add('Concept library covers 39 concepts',keys.length===39,'count='+keys.length);
const ruleTitles=CASE_REFERENCE_RULES.map(r=>r.title);
add('Every concept maps to a reference rule',keys.every(k=>ruleTitles.includes(k)));
const monoKeys=Object.keys(DRUG_MONOGRAPHS);
add('Every concept drug key is a real monograph',keys.every(k=>(CONCEPT_CONTENT[k].drugs||[]).every(d=>monoKeys.includes(d))));
add('Every related concept resolves',keys.every(k=>(CONCEPT_CONTENT[k].related||[]).every(r=>keys.includes(r))));
add('Concepts carry mechanism, key points, monitoring, pitfalls',keys.every(k=>{const v=CONCEPT_CONTENT[k];return v.oneLiner&&v.mechanism&&v.keyPoints.length>=3&&v.monitoring.length>=2&&v.pitfalls.length>=2;}));
let qt=null;for(const m of MODULES){for(let i=0;i<(m.cases||[]).length;i++){const c=m.cases[i];if(/QT-stacking/i.test(String(c.q||''))||/haloperidol.*ondansetron.*azithromycin/i.test(caseText(c))){qt={m,i,c};break;}}if(qt)break;}
add('QT stacking case found for verification',!!qt);
if(qt){const cs=caseConcepts(qt.c);add('QT case maps to the QT prolongation concept',cs.some(x=>x.title==='QT prolongation'));const panel=reviewLearnPanelHTML(qt.c);add('Learn panel renders mechanism and related drugs',panel.includes('Why it happens')&&panel.includes('Related drugs')&&panel.includes('Open full concept'));add('QT concept surfaces an authoritative source',conceptRefsFor('QT prolongation').some(r=>/crediblemeds\\.org/.test(r[1])));}
add('Learn tab is wired into the review panel',html.includes('reviewLearnPanelHTML(c)')&&html.includes("switchReviewTab(this,'learn')")&&html.includes('data-rpanel="learn"'));
add('Concept card and library are accessible dialogs',html.includes('function openConceptCard')&&html.includes('function showConceptLibrary')&&html.includes("ov.setAttribute('aria-modal','true')")&&html.includes('function conceptOverlayKeydown'));
add('Concept tools are wired into case, narrative, hub, and Pip',(html.match(/showConceptLibrary\\(event/g)||[]).length>=4);
add('QT reference points to the specific CredibleMeds drug list',html.includes('https://crediblemeds.org/druglist')&&!html.includes(\"'https://crediblemeds.org/'\"));
for(const c of checks)console.log((c.pass?'PASS':'FAIL')+'  '+c.name+(c.detail?' — '+c.detail:''));const failed=checks.filter(c=>!c.pass);console.log('\\n'+(checks.length-failed.length)+'/'+checks.length+' concept checks passed');if(failed.length)process.exitCode=1;})();`;
try{eval(app+'\n'+audit)}catch(e){console.error(e.stack);process.exit(1)}
