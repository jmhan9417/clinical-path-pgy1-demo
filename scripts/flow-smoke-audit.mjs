import fs from 'node:fs';
const html=fs.readFileSync(new URL('../demo.html',import.meta.url),'utf8');
let app=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
app=app.replace(/\nshowTitle\(\);/g,'\n/* boot skipped for flow audit */');
const els=new Map();
const makeEl=id=>{let raw='';return{id,style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},set innerHTML(v){raw=String(v||'')},get innerHTML(){return raw},set textContent(v){raw=String(v||'')},get textContent(){return raw.replace(/<[^>]*>/g,' ')},get innerText(){return raw.replace(/<[^>]*>/g,' ')},appendChild(){},remove(){},click(){},focus(){},getBoundingClientRect(){return{width:100,height:30,top:0,left:0}}}};
const get=id=>{if(!els.has(id))els.set(id,makeEl(id));return els.get(id)};
globalThis.window=globalThis;globalThis.document={documentElement:{style:{setProperty(){}}},body:get('body'),addEventListener(){},getElementById:get,querySelector(sel){if(sel==='#app')return get('app');return null},querySelectorAll(){return[]},createElement(){return makeEl('tmp'+Math.random())}};
globalThis.localStorage={data:{},getItem(k){return this.data[k]??null},setItem(k,v){this.data[k]=String(v)},removeItem(k){delete this.data[k]}};Object.defineProperty(globalThis,'navigator',{value:{},configurable:true});globalThis.location={reload(){}};globalThis.Image=class{};globalThis.Audio=class{};globalThis.requestAnimationFrame=()=>0;globalThis.cancelAnimationFrame=()=>{};globalThis.setTimeout=()=>0;globalThis.confirm=()=>false;globalThis.URL={createObjectURL(){return''},revokeObjectURL(){}};
const audit=`
(()=>{
 const out=[];const ok=(name,pass,detail='')=>out.push({name,pass:Boolean(pass),detail});
 G=null;showTitle();let view=document.getElementById('app').innerHTML;ok('Title renders',view.includes('New resident')&&view.includes('Study Cards'));
 showStudyCards();view=document.getElementById('app').innerHTML;ok('Study Cards renders 20-card queue',view.includes('A focused queue of up to 20 cards')&&dueCards().length===20,'queue='+dueCards().length);
 G={name:'QA Resident',avatar:pickedAv,preceptor:'female',results:initResults(),bond:{R1:0,R2:0,R3:0,R4:0},done:{},ach:{},rival:{wins:0,losses:0,draws:0,fights:0}};goHub();view=document.getElementById('app').innerHTML;ok('Year Map renders',view.includes('Resident Year Map')&&view.includes('View all 69 rotations'));
 MODULES.forEach(m=>G.results[m.id]=(m.cases||[]).map(()=>true));const criticalModule=MODULES.find(m=>(m.cases||[]).some(c=>c.critical||c.type==='code'));const criticalIndex=criticalModule.cases.findIndex(c=>c.critical||c.type==='code');G.results[criticalModule.id][criticalIndex]=false;graduate();view=document.getElementById('app').innerHTML;ok('Critical miss blocks readiness',view.includes('Remediation Required — Critical Safety Checkoff'));
 G.results[criticalModule.id][criticalIndex]=true;graduate();view=document.getElementById('app').innerHTML;ok('Perfect completion shows noncredentialing readiness',view.includes('Simulation Complete — Advanced Readiness')&&view.includes('does not confer residency completion'));
 showCompetencyReport();view=document.getElementById('app').innerHTML;ok('Preceptor Review renders',view.includes('Preceptor Review')&&view.includes('Download practice record')&&view.includes('Study cards available'));
 const total=MODULES.reduce((n,m)=>n+(m.cases||[]).length,0);ok('Runtime case count is curated',total===457,'total='+total);
 fs.writeFileSync('/tmp/cp-flow-smoke.json',JSON.stringify(out,null,2));if(out.some(x=>!x.pass))process.exitCode=1;
})();`;
try{eval(app+'\n'+audit)}catch(e){console.error(e.stack);process.exit(1)}
const out=JSON.parse(fs.readFileSync('/tmp/cp-flow-smoke.json','utf8'));for(const x of out)console.log(`${x.pass?'PASS':'FAIL'}  ${x.name}${x.detail?' — '+x.detail:''}`);console.log(`\n${out.filter(x=>x.pass).length}/${out.length} flow checks passed`);if(out.some(x=>!x.pass))process.exit(1);
