const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file:///home/claude/work/site/index.html');await p.waitForTimeout(300);
await p.fill('#newName','민철');await p.click('#addBtn');await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(600);
await p.evaluate(()=>{window.say=()=>Promise.resolve();ITEMS.filter(i=>i.u===0).forEach(i=>{S.st[i.id]={ok:3,wrong:0,ivl:100,dueAt:Date.now()+1e9}});});
const before=await p.evaluate(()=>cur&&cur.id);await p.evaluate(()=>{cvFrom="study";startConv(0);});await p.waitForTimeout(800);
for(let i=0;i<8;i++){await p.keyboard.press(i%2?'ArrowRight':' ');await p.waitForTimeout(700);}
console.log('study cur',before,'->',await p.evaluate(()=>cur&&cur.id),'conv i',await p.evaluate(()=>CV&&CV.i),errs);await b.close();})();
