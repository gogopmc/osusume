const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({...devices['iPhone 13'],deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__H={};Object.defineProperty(navigator,'mediaSession',{value:{setActionHandler:(a,f)=>{window.__H[a]=f},metadata:null}});window.MediaMetadata=function(){};});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
await p.fill('#newName','민철');await p.click('#addBtn');await p.waitForTimeout(100);await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(800);
const log=[];for(let k=0;k<7;k++){const s=await p.evaluate(()=>S.step+" ["+visBtns().map(b=>b.textContent.trim().slice(0,8)).join(",")+"]");await p.evaluate(k=>window.__H[k===3?'previoustrack':'nexttrack'](),k);await p.waitForTimeout(700);log.push((k===3?'PREV ':'NEXT ')+s);}
console.log(log.join("\n"),errs);await b.close();})();
