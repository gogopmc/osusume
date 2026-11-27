const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({...devices['iPhone 13'],deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
await p.fill('#newName','민철');await p.click('#addBtn');await p.waitForTimeout(100);await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(800);
const out=[];for(let k=0;k<6;k++){await p.keyboard.press(k%2?'ArrowRight':' ');await p.waitForTimeout(600);
 const a=await p.evaluate(()=>cur&&cur.id+":"+cur.type);await p.evaluate(()=>tab("status"));await p.waitForTimeout(100);await p.evaluate(()=>tab("study"));await p.waitForTimeout(300);const bb=await p.evaluate(()=>cur&&cur.id+":"+cur.type);out.push(a+" -> "+bb);}
console.log(out.join("\n"),errs);await b.close();})();
