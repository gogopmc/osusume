const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({...devices['iPhone 13'],deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);
await p.evaluate(()=>{me="민철";S=fresh();startConv(0);});await p.waitForTimeout(300);
for(let k=0;k<9;k++){await p.locator('#cvBar button').last().click();await p.waitForTimeout(700);}
const sc=await p.evaluate(()=>{const l=$("#cvLog");return [l.scrollTop+l.clientHeight,l.scrollHeight];});console.log(sc);
await p.screenshot({path:process.argv[3]});console.log(errs);await b.close();})();
