const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file:///home/claude/work/site/index.html');await p.waitForTimeout(300);
await p.fill('#newName','민철');await p.click('#addBtn');await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(600);
await p.evaluate(()=>{toStart();S.chain=["eu1-d7"];S.chainN=7;S.recent=[{id:"eu1-d2",ja:"x"}];save();});await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(800);
console.log('cur',await p.evaluate(()=>cur&&cur.id+":"+cur.type),errs);await b.close();})();
