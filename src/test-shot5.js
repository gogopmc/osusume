const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13'],deviceScaleFactor:1});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.argv[2]);await p.evaluate(()=>{localStorage.setItem("osusume-profiles",JSON.stringify(["민철","지현","해련"]));localStorage.setItem("osusume-last",JSON.stringify("민철"));});
await p.reload();await p.waitForTimeout(500);await p.screenshot({path:process.argv[3]+'a.png'});
await p.click('.chg');await p.waitForTimeout(200);await p.screenshot({path:process.argv[3]+'b.png'});console.log(errs);await b.close();})();
