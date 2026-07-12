import fs from 'node:fs';
const html=fs.readFileSync(new URL('../demo.html',import.meta.url),'utf8');
const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
let app=scripts.sort((a,b)=>b.length-a.length)[0];
app=app.replace(/\nshowTitle\(\);/g,'\n/* boot skipped for audit */');
const stub=()=>new Proxy(function(){},{get:(t,p)=>p==='style'?stub():p==='classList'?{add(){},remove(){},toggle(){}}:stub(),set:()=>true,apply:()=>stub(),construct:()=>stub()});
globalThis.window=globalThis; globalThis.document={documentElement:{style:{setProperty(){}}},body:stub(),addEventListener(){},getElementById(){return stub()},querySelector(){return null},querySelectorAll(){return[]},createElement(){let raw='';return{style:{},classList:{add(){},remove(){}},set innerHTML(v){raw=String(v||'')},get innerHTML(){return raw},get textContent(){return raw.replace(/<[^>]*>/g,' ')},get innerText(){return raw.replace(/<[^>]*>/g,' ')},appendChild(){},remove(){},click(){}}}}; globalThis.localStorage={getItem(){return null},setItem(){},removeItem(){}}; Object.defineProperty(globalThis,'navigator',{value:{},configurable:true}); globalThis.location={reload(){}}; globalThis.Image=class{}; globalThis.Audio=class{}; globalThis.requestAnimationFrame=()=>0; globalThis.cancelAnimationFrame=()=>{}; globalThis.setTimeout=()=>0; globalThis.confirm=()=>false; globalThis.URL={createObjectURL(){return''},revokeObjectURL(){}};
const audit=`
(()=>{
 const norm=s=>String(s||'').toLowerCase().replace(/<[^>]*>/g,' ').replace(/[^a-z0-9]+/g,' ').trim();
 const cases=[]; MODULES.forEach(m=>(m.cases||[]).forEach((c,i)=>cases.push({module:m.id,title:m.title,area:m.area,index:i,type:c.type||'mcq',q:norm(c.q),rawQ:String(c.q||''),c})));
 const types={};cases.forEach(x=>types[x.type]=(types[x.type]||0)+1);
 const exact={};cases.forEach(x=>(exact[x.q]??=[]).push(x));
 const exactGroups=Object.values(exact).filter(g=>g.length>1&&g[0].q).sort((a,b)=>b.length-a.length);
 const prefixes={};cases.forEach(x=>{const p=x.q.split(' ').slice(0,8).join(' ');if(p)(prefixes[p]??=[]).push(x)});
 const prefixGroups=Object.entries(prefixes).filter(([p,g])=>g.length>=3&&p.split(' ').length>=6).sort((a,b)=>b[1].length-a[1].length);
 const mcq=cases.filter(x=>x.type==='mcq'),positions={},optionCounts={};let malformed=0,shortFeedback=0;
 mcq.forEach(x=>{const os=x.c.opts||[];optionCounts[os.length]=(optionCounts[os.length]||0)+1;const ok=os.map((o,j)=>o.ok?j:-1).filter(j=>j>=0);if(ok.length!==1)malformed++;else positions[ok[0]+1]=(positions[ok[0]+1]||0)+1;os.forEach(o=>{if(String(o.fb||'').trim().length<25)shortFeedback++})});
 const generic=[
  'choose the patient specific plan document the rationale and set a monitoring or follow up trigger',
  'missing monitoring plan for a high risk medication or intervention',
  'the active medication problem is identified and time sensitive enough to address now',
  'identify the active clinical question check patient specific constraints select the evidence based plan'
 ];
 const serialized=cases.map(x=>norm(JSON.stringify(x.c))).join(' || '),genericCounts={};generic.forEach(p=>genericCounts[p]=(serialized.match(new RegExp(p,'g'))||[]).length);
 const qlens=cases.map(x=>x.q.split(' ').filter(Boolean).length).sort((a,b)=>a-b);
 STUDY.cards=buildStudyCards();STUDY.filter='all';STUDY.queueIds=studyDueCandidates().slice(0,20).map(c=>c.id);
 G={name:'QA',results:initResults()};MODULES.forEach(m=>G.results[m.id]=(m.cases||[]).map(()=>true));G.results[MODULES[0].id][0]=false;G.results[MODULES[0].id][1]=false;
 const result={modules:MODULES.length,total:cases.length,types,mcqCount:mcq.length,correctPositions:positions,optionCounts,malformedMcq:malformed,shortFeedback,exactDuplicateGroups:exactGroups.length,exactDuplicateCases:exactGroups.reduce((n,g)=>n+g.length,0),topExact:exactGroups.slice(0,15).map(g=>({count:g.length,q:g[0].rawQ,modules:g.slice(0,8).map(x=>x.module)})),repeatedPrefixGroups:prefixGroups.length,topPrefixes:prefixGroups.slice(0,15).map(([p,g])=>({count:g.length,prefix:p,modules:[...new Set(g.map(x=>x.module))].slice(0,10)})),genericCounts,medianQuestionWords:qlens[Math.floor(qlens.length/2)],shortQuestionCases:qlens.filter(n=>n<8).length,numericalStemCases:cases.filter(x=>/\\b\\d+(\\.\\d+)?\\b/.test(x.rawQ)).length,advancedInteractionCases:cases.filter(x=>['calc','code','journal','essay','chartHunt','sbar'].includes(x.type)).length,studyQueueSize:dueCards().length,sampleScoreDisplay:overall().displayPct};
 const maxPos=Math.max(...Object.values(positions)),minPos=Math.min(...Object.values(positions));
 result.gates={totalCases:cases.length===692,noExactDuplicates:exactGroups.length===0,validMcq:malformed===0,balancedCorrectPositions:maxPos-minPos<=1,dailyQueueCapped:result.studyQueueSize===20,preciseScore:result.sampleScoreDisplay==='99.7'};
 fs.writeFileSync('/tmp/cp-quality-audit.json',JSON.stringify(result,null,2));
 if(Object.values(result.gates).some(v=>!v)){console.error('Content quality gate failed',result.gates);process.exitCode=1;}
})();`;
try{eval(app+'\n'+audit)}catch(e){console.error(e.stack);process.exit(1)}
console.log(fs.readFileSync('/tmp/cp-quality-audit.json','utf8'));
