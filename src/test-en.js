const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13'],deviceScaleFactor:1});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
await p.click('#langSeg [data-l=en]');await p.waitForTimeout(600);
await p.screenshot({path:process.argv[3]+'a.png'});
await p.fill('#newName','민철');await p.click('#addBtn');await p.waitForTimeout(100);await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(800);
await p.evaluate(()=>{window.say=()=>Promise.resolve();});
const log=[];let shot=0;
for(let k=0;k<140;k++){const s=await p.evaluate(()=>cur&&(cur.type==="done"?"DONE":cur.id.replace(/^eu/,"")+(cur.type==="intro"?"*":cur.again?"!":"")));log.push(s);if(s==="DONE")break;
  const btn=await p.evaluate(()=>visBtns().map(b=>b.textContent).join(","));
  if(btn.includes('말했어요 · 정답')){await p.evaluate(()=>findBtn(/정답 듣기/).click());await p.waitForTimeout(80);
    const wrong=(k%9===5)&&await p.evaluate(()=>!!BY[cur.id].dn&&BY[cur.id].dn.length>1);
    if(wrong){await p.evaluate(()=>findBtn(/틀렸어요/).click());await p.waitForTimeout(80);if(!shot++)await p.screenshot({path:process.argv[3]+'pick.png'});log.push("[X]");await p.evaluate(()=>{document.querySelector('.wchip').click();findBtn(/선택 완료/).click();});}
    else await p.evaluate(()=>findBtn(/맞았어요/).click());}
  else if(btn.includes('따라 말했어요'))await p.evaluate(()=>findBtn(/따라 말했어요/).click());
  else {const c=await p.$('.choice');if(c){await p.evaluate(()=>{const it=BY[cur.id];[...document.querySelectorAll('.choice')].find(x=>x.textContent===it.m).click();});await p.waitForTimeout(1000);}
    else {const t=await p.evaluate(()=>visBtns().map(b=>b.textContent));log.push("?"+t.join("|"));const f=await p.evaluate(()=>{const b=visBtns()[0];if(b){b.click();return 1}});}}
  await p.waitForTimeout(650);}
console.log(log.join(" "));
const miss=await p.evaluate(()=>{let m=[];ITEMS.forEach(it=>{if(!src(it.ja))m.push(it.ja);if(!AUD.ko[it.m])m.push("ko:"+it.m)});return m});
const gate=await p.evaluate(()=>{const bad=[];ITEMS.forEach(it=>{});return S.dbg.length});
console.log("miss",miss.length,"lang",await p.evaluate(()=>LANG+" "+UNITS.length+" "+ITEMS.length+" learned "+learned().length),errs);
await b.close();})();
