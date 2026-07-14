import fs from 'node:fs';
const html=fs.readFileSync(new URL('../demo.html',import.meta.url),'utf8');
const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
let app=scripts.sort((a,b)=>b.length-a.length)[0];
app=app.replace(/\nshowTitle\(\);/g,'\n/* boot skipped for audit */');
const stub=()=>new Proxy(function(){},{get:(t,p)=>p==='style'?stub():p==='classList'?{add(){},remove(){},toggle(){}}:stub(),set:()=>true,apply:()=>stub(),construct:()=>stub()});
globalThis.window=globalThis; globalThis.document={documentElement:{style:{setProperty(){}}},body:stub(),addEventListener(){},getElementById(){return stub()},querySelector(){return null},querySelectorAll(){return[]},createElement(){let raw='';return{style:{},classList:{add(){},remove(){}},set innerHTML(v){raw=String(v||'')},get innerHTML(){return raw},get textContent(){return raw.replace(/<[^>]*>/g,' ')},get innerText(){return raw.replace(/<[^>]*>/g,' ')},appendChild(){},remove(){},click(){}}}}; globalThis.localStorage={getItem(){return null},setItem(){},removeItem(){}}; Object.defineProperty(globalThis,'navigator',{value:{},configurable:true}); globalThis.location={reload(){}}; globalThis.Image=class{}; globalThis.Audio=class{}; globalThis.requestAnimationFrame=()=>0; globalThis.cancelAnimationFrame=()=>{}; globalThis.setTimeout=()=>0; globalThis.confirm=()=>false; globalThis.URL={createObjectURL(){return''},revokeObjectURL(){}};

const audit=`
(()=>{
 const checks=[]; const add=(name,pass,detail)=>checks.push({name,pass:!!pass,detail:detail||''});
 const strip=h=>String(h||'').replace(/<[^>]*>/g,' ');
 // volume engine
 add('SND.vol default in range', SND.vol>=0 && SND.vol<=1, 'vol='+SND.vol);
 setVolume(0.3); add('setVolume clamps and stores', SND.vol===0.3, 'vol='+SND.vol);
 setVolume(5); add('setVolume clamps above 1', SND.vol===1);
 setVolume(-2); add('setVolume clamps below 0', SND.vol===0);
 setVolume(0.8);
 add('volumeSliderHTML renders range input', /type="range"/.test(volumeSliderHTML()) && /data-vol-out/.test(volumeSliderHTML()));
 // pip answers
 G={name:'QA',results:initResults()};
 const a1=pipAnswer('MAP'); add('acronym lookup (MAP)', /Mean Arterial Pressure/.test(a1), strip(a1).slice(0,70));
 const a1b=pipAnswer('what does SSC stand for?'); add('acronym phrase lookup (SSC)', /Surviving Sepsis Campaign/.test(a1b), strip(a1b).slice(0,70));
 const a2=pipAnswer('vancomycin'); add('drug lookup (vancomycin)', /Vancomycin/.test(a2) && /DailyMed/.test(a2) && /AUC/i.test(a2), strip(a2).slice(0,70));
 const a2b=pipAnswer('tell me about warfarin'); add('drug lookup in sentence (warfarin)', /Warfarin/.test(a2b) && /anticoagul/i.test(a2b), strip(a2b).slice(0,120));
 const a3=pipAnswer('potassium'); add('lab lookup (potassium)', /3.5–5.0/.test(a3), strip(a3).slice(0,70));
 const a4=pipAnswer('sepsis'); add('rotation search (sepsis)', /Rotations matching/.test(a4) && /openModule/.test(a4));
 const a5=pipAnswer('what next'); add('next-step recommendation', /recommended next rotation/.test(a5) && /openModule/.test(a5));
 const a6=pipAnswer('volume'); add('volume intent renders slider', /type="range"/.test(a6));
 const a7=pipAnswer('quizlet'); add('quizlet intent', /Study Cards/.test(a7));
 const a8=pipAnswer('help'); add('help without case prompts to open one', /Open a case first/.test(a8));
 curM=MODULES.find(m=>m.id==='orient'); caseIdx=1;
 const realGet=document.getElementById.bind(document);
 document.getElementById=function(id){ if(id==='chapterOv')return null; if(id==='caseHolder')return {ok:1}; return realGet(id); };
 const a9=pipAnswer('hint'); add('case hint uses case coaching body', /Name the medication problem|one clinical decision/i.test(strip(a9)), strip(a9).slice(0,80));
 document.getElementById=realGet;
 const a10=pipAnswer('xyzzynonsense'); add('fallback message for unknown query', /could not match/i.test(a10));
 const a11=pipAnswer('<img src=x onerror=alert(1)>'); add('unknown HTML-ish query does not echo raw tags', !/onerror=alert/.test(a11));
 add('pipEsc escapes HTML', pipEsc('<b>&"')==='&lt;b&gt;&amp;&quot;');
 // panel structure
 PIP.chat=[{who:'you',text:'<script>x</script>'},{who:'pip',text:'<b>ok</b>'}];
 const chat=pipChatHTML(); add('chat escapes user side, allows pip html', !/<script>x/.test(chat) && /<b>ok<\\/b>/.test(chat));
 const panel=pipPanelHTML(false); add('panel contains ask box, chips, volume', /pipAskInput/.test(panel) && /pip-chips/.test(panel) && /data-vol-range/.test(panel));
 for(const c of checks) console.log((c.pass?'PASS':'FAIL')+'  '+c.name+(c.detail?' — '+c.detail:''));
 const failed=checks.filter(c=>!c.pass);
 console.log('\\n'+(checks.length-failed.length)+'/'+checks.length+' pip/volume checks passed');
 if(failed.length)process.exitCode=1;
})();`;
try{eval(app+'\n'+audit)}catch(e){console.error(e.stack);process.exit(1)}
