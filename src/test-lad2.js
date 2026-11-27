const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({...devices['iPhone 13']})).newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file:///home/claude/work/site/index.html');await p.waitForTimeout(300);
await p.click('#langSeg [data-l=en]');await p.waitForTimeout(500);
await p.fill('#newName','민철');await p.click('#addBtn');await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(800);
await p.evaluate(()=>{window.say=()=>Promise.resolve();maybeOffer=()=>false;});
const seq=[];let viol=[];const okSeen={};
for(let k=0;k<70;k++){const c=await p.evaluate(()=>cur&&{id:cur.id,t:cur.type,a:!!cur.again});if(!c||c.t==="done")break;
  const tag=c.id.replace(/^eu/,"");seq.push(tag+(c.t==="intro"?"*":""));
  if(c.t!=="intro"){const anc=await p.evaluate(id=>ANC[id],c.id);const pkd=await p.evaluate(()=>window.__pk||[]);
    if(anc.some(a=>okSeen[a])&&!pkd.includes(c.id))viol.push(tag+"<"+anc.filter(a=>okSeen[a]).join("+")+"@"+k);}
  const btn=await p.evaluate(()=>visBtns().map(b=>b.textContent).join(","));
  if(btn.includes('정답 듣기')){await p.evaluate(()=>findBtn(/정답 듣기/).click());await p.waitForTimeout(60);
    const two=await p.evaluate(()=>!!BY[cur.id].dn&&BY[cur.id].dn.length>1);
    if(two&&k%7===3){seq.push("[X]");await p.evaluate(()=>{findBtn(/틀렸어요/).click();const ch=document.querySelector('.wchip');window.__pk=(window.__pk||[]).concat(BY[cur.id].dn[0]);ch.click();findBtn(/선택 완료/).click();});}
    else{okSeen[c.id]=1;await p.evaluate(()=>findBtn(/맞았어요/).click());}}
  else if(btn.includes('따라 말했어요'))await p.evaluate(()=>findBtn(/따라 말했어요/).click());
  else if(await p.$('.choice')){await p.evaluate(()=>{const it=BY[cur.id];[...document.querySelectorAll('.choice')].find(x=>x.textContent===it.m).click();});await p.waitForTimeout(950);}
  else {await p.evaluate(()=>{const b=visBtns()[0];b&&b.click();});}
  await p.waitForTimeout(620);}
console.log(seq.join(" "));console.log("VIOLATIONS",viol.length,viol.join(" "),errs);await b.close();})();
