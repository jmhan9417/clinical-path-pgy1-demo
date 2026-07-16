import fs from 'node:fs';
const html=fs.readFileSync(new URL('../demo.html',import.meta.url),'utf8');
let app=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).sort((a,b)=>b.length-a.length)[0];
app=app.replace(/\nshowTitle\(\);/g,'\n/* boot skipped for review audit */');
const stub=()=>new Proxy(function(){},{get:(t,p)=>p==='style'?stub():p==='classList'?{add(){},remove(){},toggle(){},contains(){return false}}:p==='dataset'?{}:stub(),set:()=>true,apply:()=>stub(),construct:()=>stub()});
globalThis.window=globalThis;
globalThis.document={documentElement:{style:{setProperty(){}}},body:stub(),addEventListener(){},getElementById(){return stub()},querySelector(){return null},querySelectorAll(){return[]},createElement(){let raw='';return{style:{},classList:{add(){},remove(){},toggle(){}},set innerHTML(v){raw=String(v||'')},get innerHTML(){return raw},get textContent(){return raw.replace(/<[^>]*>/g,' ')},get innerText(){return raw.replace(/<[^>]*>/g,' ')},appendChild(){},remove(){},click(){}}}};
globalThis.localStorage={getItem(){return null},setItem(){},removeItem(){}};
Object.defineProperty(globalThis,'navigator',{value:{},configurable:true});
globalThis.location={reload(){}};globalThis.Image=class{};globalThis.Audio=class{};globalThis.requestAnimationFrame=()=>0;globalThis.cancelAnimationFrame=()=>{};globalThis.setTimeout=()=>0;globalThis.clearTimeout=()=>{};globalThis.setInterval=()=>0;globalThis.clearInterval=()=>{};globalThis.confirm=()=>false;globalThis.getComputedStyle=()=>({display:'block',visibility:'visible'});globalThis.URL={createObjectURL(){return''},revokeObjectURL(){}};
const audit=String.raw`
(()=>{
 const checks=[];const check=(name,pass,detail='')=>checks.push({name,pass:Boolean(pass),detail});
 const cases=[];MODULES.forEach(m=>(m.cases||[]).forEach((c,index)=>cases.push({m,c,index,type:c.type||'mcq'})));
 let contextExpected=0,contextPreserved=0,monitoring=0,references=0,referenceSources=0,noUndefined=0,engineSpecific=0,mcqRetryComplete=0,marMentionCount=0,marMentionCovered=0;const engineFailures=[],undefinedFailures=[];
 const markers={mcq:['Correct principle','Best answer'],order:['Correct sequence','lr-step-reason'],calc:['Formula or method','Expected result'],chartHunt:['Review surface','Needs pharmacist action'],sbar:['Best fragment','Why it works'],code:['Correct action','protocol-aligned action'],journal:['Effect-size answer','True limitation'],essay:['Guided self-review','Expert workup']};
 for(const x of cases){
  const {m,c,index,type}=x;curM=m;caseIdx=index;
  if(type==='mcq'){const opts=prepareMCQOptions(c),wrong=opts.findIndex(o=>!o.ok);c._lastChoice=wrong>=0?wrong:0;c._attempts=2;const retry=mcqRetryHTML(c,opts[c._lastChoice]);if(/Apply this principle/.test(retry)&&/Close the loop/.test(retry)&&retry.length>180)mcqRetryComplete++;}
  if(type==='order')c._lastOrder=(c.correct||[]).slice().reverse();
  if(type==='calc')c._lastCalc=Number(c.answer?.value||0)+10;
  if(type==='chartHunt')c._lastHunt=[];
  if(type==='sbar')c._lastSbar=prepareSbarSlots(c).map(()=>0);
  if(type==='code')c._lastCode={selections:(c.steps||[]).map(()=>1),failedStep:0,timeout:false,stoppedAt:0};
  if(type==='journal')c._lastJournal={flawsSelected:[],nntChoice:(c.nnt?.options||[]).findIndex(o=>!o.correct)};
  if(type==='essay')c._lastEssay={responses:(c.questions||[]).map(()=>''),expertShown:true};
  const out=learningReviewHTML(c,false,'Audit explanation');
  const context=clinicalContextHTML(c);if(context){contextExpected++;if(/Patient or case context/.test(out)&&/case-context/.test(out))contextPreserved++;}
  if(/Monitoring and follow-up/.test(out)&&/<li>[^<]{12,}/.test(out.split('Monitoring and follow-up')[1]||''))monitoring++;
  if(/<h4>References<\/h4>/.test(out)&&/<a href=/.test(out))references++;
  if(/(?:Guideline|Label|Framework) source:|Source:/.test(out))referenceSources++;
  if(!/(?:>|• |: )(?:undefined|null)(?:<|$)/i.test(out))noUndefined++;else undefinedFailures.push(m.id+'['+index+'] '+type);
  const need=markers[type]||[];if(need.every(k=>out.includes(k)))engineSpecific++;else engineFailures.push(m.id+'['+index+'] '+type+' missing '+need.filter(k=>!out.includes(k)).join(','));
  const mentions=/\bMAR\b|medication administration record/i.test([c.kick,c.q,c.note,c.patient].join(' '));if(mentions){marMentionCount++;if((c.mar&&c.mar.length)||authoredMar(c))marMentionCovered++;}
 }
 const nonMarChartPipClean=cases.filter(x=>x.type==='chartHunt'&&chartSurface(x.c)!=='mar').every(x=>!pipCaseSteps(x.c).join(' ').includes('MAR'));
 const daniel=speakerIdentity('neutral','Dr. Daniel Park',{}),previousG=G;G={name:'QA Resident',preceptor:'male'};const maleRoute=selectedPreceptor();G=previousG;
 const inferredSpeakers=speakerIdentity('warm','Dr. Belle Deans',{}).who==='belle'&&speakerIdentity('neutral','Dr. Elliot Kang',{}).who==='elliot'&&speakerIdentity('neutral','Nurse Vance',{}).who==='nurse'&&daniel.who==='dpark'&&daniel.name==='Dr. Daniel Park'&&/EM pharmacist/.test(daniel.role)&&maleRoute.who==='dpark'&&face('neutral','dpark').includes(SPRITE_URLS.dpark.neutral);
 const marCases=cases.filter(x=>authoredMar(x.c)||(Array.isArray(x.c.mar)&&x.c.mar.length)),marSolvable=marCases.every(x=>String(x.c.patient||'').length>=80&&(x.c.given||[]).length>=2&&(x.c.tasks||[]).length>=1&&String(x.c.marReviewFocus||'').length>=100);
 STUDY.cards=buildStudyCards();
 check('All 457 terminal reviews include monitoring and follow-up',monitoring===cases.length,monitoring+'/'+cases.length);
 check('All 457 terminal reviews include references',references===cases.length,references+'/'+cases.length);
 check('All 457 terminal reviews name a guideline, framework, label, or publisher',referenceSources===cases.length,referenceSources+'/'+cases.length);
 check('All structured contexts survive into terminal review',contextPreserved===contextExpected,contextPreserved+'/'+contextExpected);
 check('Every engine renders its specific reasoning structure',engineSpecific===cases.length,engineSpecific+'/'+cases.length+(engineFailures.length?' · '+engineFailures.slice(0,5).join('; '):''));
 check('No terminal review renders undefined or null',noUndefined===cases.length,noUndefined+'/'+cases.length+(undefinedFailures.length?' · '+undefinedFailures.join('; '):''));
 check('Every MCQ coached retry teaches principle and follow-up',mcqRetryComplete===cases.filter(x=>x.type==='mcq').length,mcqRetryComplete+'/'+cases.filter(x=>x.type==='mcq').length);
 check('Every MAR-labeled case has an MAR surface',marMentionCovered===marMentionCount,marMentionCovered+'/'+marMentionCount);
 check('Every MAR case includes enough patient context and review criteria',marCases.length>=3&&marSolvable,marCases.length+' MAR cases');
 check('Non-MAR chart help does not falsely say to open MAR',nonMarChartPipClean);
 check('Named speakers and the male route use the matching portrait',inferredSpeakers);
 check('Study deck is one card per clinical case',STUDY.cards.length===457,'cards='+STUDY.cards.length);
 check('Missed-only end-of-rotation review remains present',html.includes('startMissedReview')&&html.includes('End-of-rotation review'));
 fs.writeFileSync('/tmp/cp-review-quality.json',JSON.stringify({total:cases.length,checks},null,2));
 checks.forEach(x=>console.log((x.pass?'PASS':'FAIL')+'  '+x.name+(x.detail?' — '+x.detail:'')));
 console.log('\n'+checks.filter(x=>x.pass).length+'/'+checks.length+' review checks passed');
 if(checks.some(x=>!x.pass))process.exitCode=1;
})();`;
try{eval(app+'\n'+audit)}catch(e){console.error(e.stack);process.exit(1)}
