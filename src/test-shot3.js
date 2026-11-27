const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({...devices['iPhone 13'],deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);
await p.evaluate(()=>{me="민철";S=fresh();ITEMS.filter(i=>i.u===0).forEach(i=>S.st[i.id]={ok:3,ivl:9000,wrong:0});ITEMS.filter(i=>i.u===1).forEach(i=>S.st[i.id]={ok:1,ivl:20,wrong:0});ITEMS.filter(i=>i.u===2).slice(0,9).concat(ITEMS.filter(i=>i.u===7).slice(0,2),ITEMS.filter(i=>i.u===8).slice(0,2)).forEach(i=>S.st[i.id]={ok:1,ivl:20,wrong:0});$("#startView").hidden=true;$("#mainView").hidden=false;$("#tabs").hidden=false;tab("script");});await p.waitForTimeout(300);
await p.screenshot({path:process.argv[3]+'a.png'});
await p.evaluate(()=>{document.querySelectorAll('.ccard')[1].click();});await p.waitForTimeout(200);await p.screenshot({path:process.argv[3]+'b.png'});
await p.evaluate(()=>tab("status"));await p.waitForTimeout(200);await p.evaluate(()=>window.scrollTo(0,300));await p.screenshot({path:process.argv[3]+'c.png'});
console.log(errs);await b.close();})();
