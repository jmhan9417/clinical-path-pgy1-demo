import fs from 'node:fs';

const demo = fs.readFileSync(new URL('../demo.html', import.meta.url), 'utf8');
const home = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const checks = [];
const add = (name, pass, detail='') => checks.push({name, pass:Boolean(pass), detail});

add('Marketing rotation count is current', home.includes('<b>69</b>&nbsp;guided rotations'));
add('Marketing case count is current', home.includes('<b>692</b>&nbsp;clinical cases'));
add('Persistent simulation disclaimer', demo.includes('Not medical advice, residency credit, credentialing, or independent practice validation'));
add('No credential-conferring result label', !/PGY-1 Graduate|Ready for BCPS \/ PGY-2/.test(demo));
add('Critical-response remediation gate', demo.includes('criticalMisses().length'));
add('Readiness review is formative', demo.includes('Quiz scores are coaching evidence only'));
add('Content governance metadata', demo.includes('CONTENT_GOVERNANCE'));
add('Current DKA potassium threshold', !demo.includes('3.3') && demo.includes('3.5'));
add('Keyboard skip links', demo.includes('Skip to simulation content') && home.includes('Skip to main content'));
add('Visible keyboard focus', demo.includes(':focus-visible') && home.includes(':focus-visible'));
add('No remote character CDN dependency', !demo.includes('d8j0ntlcm91z4.cloudfront.net') && !home.includes('d8j0ntlcm91z4.cloudfront.net'));
add('69-rotation map present', demo.includes('View all 69 rotations'));
add('Code Stroke validation present', demo.includes('code_stroke_validation'));
add('P&T committee module present', demo.includes('pt_med_safety_committee'));
add('Informatics module present', demo.includes('informatics_surveillance'));
add('Equity/reflection module present', demo.includes('communication_equity_reflection'));
add('Hub guard prevents no-game trap', demo.includes("if(typeof G==='undefined'||!G||!G.results){showTitle();return;}"));
add('Study Cards back label is context-aware', demo.includes("?'Back to year map':'Back to title'"));
add('Competency CSV export wired to UI', demo.includes('onclick="sfx(\'click\');exportCompetencyCSV()"'));
add('Competency JSON export wired to UI', demo.includes('onclick="sfx(\'click\');exportCompetencyJSON()"'));
add('CSV export includes critical-miss column', demo.includes("'critical_misses'"));
add('Readiness cards use per-area critical status', demo.includes('critByArea'));

for (const c of checks) console.log(`${c.pass ? 'PASS' : 'FAIL'}  ${c.name}${c.detail ? ` — ${c.detail}` : ''}`);
const failed = checks.filter(c => !c.pass);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
if (failed.length) process.exit(1);
