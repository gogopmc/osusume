const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({...devices['iPhone 13'],deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>{const u=r.request().url();if(u.startsWith('file:'))return r.continue();return r.abort();});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);
await p.evaluate(()=>{me="민철";S=fresh();ITEMS.filter(i=>i.u===0).forEach(i=>S.st[i.id]={ok:3,ivl:9000,wrong:0});$("#startView").hidden=true;$("#mainView").hidden=false;$("#tabs").hidden=false;tab("script");});await p.waitForTimeout(300);
await p.screenshot({path:process.argv[3]+'a.png'});
await p.evaluate(()=>{scU=3;renderScript();});await p.screenshot({path:process.argv[3]+'b.png'});
await p.evaluate(()=>{scU=0;renderScript();$("#convBtn").click();});await p.waitForTimeout(300);await p.screenshot({path:process.argv[3]+'c.png'});
console.log(errs);await b.close();})();
