import fs from 'node:fs';

const root=new URL('../',import.meta.url);
const html=fs.readFileSync(new URL('demo.html',root),'utf8');
const read=name=>fs.readFileSync(new URL(name,root),'utf8');
const spec=read('PRODUCT-SPEC.md');
const readme=read('README.md');
const design=read('DESIGN-NOTES.md');
const roadmap=read('FUTURE_ROADMAP.md');
const clinicalReport=read('docs/clinical-audit-report.md');
const workflow=read('.github/workflows/product-quality.yml');

let app=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
app=app.replace(/\nshowTitle\(\);/g,'\n/* boot skipped for documentation audit */');
const els=new Map();
const makeEl=id=>{let raw='';return{id,style:{setProperty(){}},classList:{add(){},remove(){},toggle(){},contains(){return false}},set innerHTML(v){raw=String(v||'')},get innerHTML(){return raw},set textContent(v){raw=String(v||'')},get textContent(){return raw},appendChild(){},remove(){},click(){},focus(){},setAttribute(){},addEventListener(){},querySelector(){return null},querySelectorAll(){return[]},getBoundingClientRect(){return{width:100,height:30,top:0,left:0}}}};
const get=id=>{if(!els.has(id))els.set(id,makeEl(id));return els.get(id)};
globalThis.window=globalThis;globalThis.NodeFilter={SHOW_TEXT:4,FILTER_REJECT:2,FILTER_ACCEPT:1};
globalThis.document={documentElement:{style:{setProperty(){}}},body:get('body'),addEventListener(){},removeEventListener(){},getElementById:get,querySelector(sel){if(sel==='#app')return get('app');return null},querySelectorAll(){return[]},createElement(){return makeEl('tmp')},createTreeWalker(){return{nextNode(){return false},currentNode:null}},createDocumentFragment(){return makeEl('fragment')},createTextNode(v){const e=makeEl('text');e.textContent=v;return e}};
globalThis.localStorage={data:{},getItem(k){return this.data[k]??null},setItem(k,v){this.data[k]=String(v)},removeItem(k){delete this.data[k]}};
Object.defineProperty(globalThis,'navigator',{value:{},configurable:true});
globalThis.location={reload(){}};globalThis.Image=class{};globalThis.Audio=class{};globalThis.requestAnimationFrame=()=>0;globalThis.cancelAnimationFrame=()=>{};globalThis.setTimeout=()=>0;globalThis.confirm=()=>false;globalThis.URL={createObjectURL(){return''},revokeObjectURL(){}};

try{
  eval(app+`\n;globalThis.__DOC_METRICS=(()=>{const types={};MODULES.forEach(m=>(m.cases||[]).forEach(c=>types[c.type||'mcq']=(types[c.type||'mcq']||0)+1));return{rotations:MODULES.length,cases:MODULES.reduce((n,m)=>n+(m.cases||[]).length,0),cards:buildStudyCards().length,concepts:Object.keys(CONCEPT_CONTENT).length,drugs:Object.keys(DRUG_MONOGRAPHS).length,bgm:Object.keys(BGM_TRACKS).length,types};})();`);
}catch(error){console.error(error.stack);process.exit(1)}

const m=globalThis.__DOC_METRICS;
const checks=[];
const ok=(name,pass,detail='')=>checks.push({name,pass:Boolean(pass),detail});
const number=n=>n.toLocaleString('en-US');
const all=(text,needles)=>needles.every(x=>text.includes(x));

ok('PRODUCT-SPEC owns all required product domains',all(spec,['## 1. Product definition','## 2. Current product scale','## 3. Technical foundation','## 4. Design system','## 5. Information architecture','## 6. Screen and layout specification','## 7. Feature inventory','## 8. Input, accessibility, and navigation','## 9. Content and safety governance','## 10. Quality gates','## 11. Documentation ownership','## 12. Current non-goals and future integration']));
ok('Runtime scale matches PRODUCT-SPEC',all(spec,[`| Guided rotations | ${m.rotations} |`,`| Original clinical cases | ${number(m.cases)} |`,`| Study cards | ${m.cards} |`,`| Canonical clinical concepts | ${m.concepts} |`,`| Drug monographs | ${m.drugs} |`,`| BGM tracks | ${m.bgm} |`]),JSON.stringify(m));
ok('Case-engine distribution matches PRODUCT-SPEC',all(spec,[`${m.types.mcq} multiple-choice`,`${m.types.order} sequencing`,`${m.types.chartHunt} chart-hunt`,`${m.types.sbar} SBAR`,`${m.types.calc} calculations`,`${m.types.code} timed code`,`${m.types.journal} journal-club`,`${m.types.essay} consult-style`]));
ok('README headline counts match runtime',all(readme,[`${m.rotations} guided rotations`,`${number(m.cases)} original clinical cases`,`${m.cards} concept and drug study cards`]));
ok('README links the documentation set',all(readme,['PRODUCT-SPEC.md','DESIGN-NOTES.md','FUTURE_ROADMAP.md','docs/clinical-audit-report.md','documentation currentness']));
ok('Design notes preserve both visual layers and tokens',all(design,['Narrative layer','Clinical workstation layer','#0f766e','#eef2f4','390px, 768px, and 1440px','PRODUCT-SPEC.md']));
ok('Dashboard implementation and documentation stay paired',all(html,['function showPreceptorDashboard','PRECEPTOR_DEMO_COHORT'])&&all(spec,['### Preceptor Dashboard','five-resident cohort','CSV coaching-summary export'])&&all(readme,['Preceptor Dashboard','fictional-cohort']));
ok('Institution Pack implementation and documentation stay paired',all(html,['function showAdminDemoGate','function showInstitutionPack','INSTITUTION_DEMO_PACK'])&&all(spec,['### Institution Pack Admin Demo','institution-managed SSO','Downloadable JSON demo manifest'])&&all(roadmap,['Institution Pack flow','does not save edits or represent real access control']));
ok('Formative and no-PHI boundaries are documented',all(spec,['No patient data, PHI, real resident records','not residency completion, credentialing'])&&all(roadmap,['Keep this formative','real resident records']));
ok('Historical clinical report is not presented as current scale',all(clinicalReport,['historical snapshot','dated content architecture','PRODUCT-SPEC.md']));
ok('Same-PR documentation rule is explicit',all(spec,['### Same-PR rule','same pull request','product-quality GitHub Action'])&&all(readme,['same pull request','product-quality GitHub Action']));
ok('GitHub Action enforces documentation and product audits',all(workflow,['pull_request:','branches: [main]','node scripts/docs-currentness-audit.mjs','node scripts/flow-smoke-audit.mjs','node scripts/pip-assistant-audit.mjs']));

for(const x of checks)console.log(`${x.pass?'PASS':'FAIL'}  ${x.name}${x.detail?' — '+x.detail:''}`);
console.log(`\n${checks.filter(x=>x.pass).length}/${checks.length} documentation checks passed`);
if(checks.some(x=>!x.pass))process.exit(1);
