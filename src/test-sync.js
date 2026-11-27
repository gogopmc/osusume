const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({...devices['iPhone 13'],deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
await p.fill('#newName','민철');await p.click('#addBtn');await p.waitForTimeout(100);await p.click('.pbtn');await p.fill('#pin','1234');
// case A: local has progress, remote newer & slower(2.5s)
await p.evaluate(()=>{const loc=fresh();loc.st={k1:{ok:1,ivl:5}};loc.xp=10;loc.updated=1000;lsSet(SKEY("민철"),loc);window.__sets=0;
 const remote=Object.assign(fresh(),{xp:999,updated:5000,st:{k1:{ok:3,ivl:900},k2:{ok:1,ivl:5}}});
 docBase={doc:()=>({get:()=>new Promise(r=>setTimeout(()=>r({exists:true,data:()=>({json:JSON.stringify(remote)})}),2500)),set:()=>{window.__sets++;return Promise.resolve()}})};});
const t0=Date.now();await p.click('#goBtn');await p.waitForSelector('#mainView:not([hidden])');const dt=Date.now()-t0;
const a=await p.evaluate(()=>[remoteReady,S.xp,window.__sets]);await p.waitForTimeout(3500);const c=await p.evaluate(()=>[remoteReady,S.xp,window.__sets]);
console.log('start ms',dt,'before sync',a,'after',c,errs);await b.close();})();
