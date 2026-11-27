const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
const t=Date.now();await p.goto('file:///home/claude/work/site/index.html');console.log('load ms',Date.now()-t);
await p.click('#langSeg [data-l=en]');await p.waitForTimeout(500);
await p.fill('#newName','민철');await p.click('#addBtn');await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>LANG+" "+(cur&&cur.id)+" remoteReady="+remoteReady),errs);await b.close();})();
