const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13'],deviceScaleFactor:1});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
await p.click('#langSeg [data-l=zh]');await p.waitForTimeout(600);
await p.screenshot({path:process.argv[3]+'a.png'});
await p.fill('#newName','민철');await p.click('#addBtn');await p.waitForTimeout(100);await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(800);
const log=[];for(let k=0;k<10;k++){const s=await p.evaluate(()=>cur&&cur.id+":"+cur.type);log.push(s);const btn=await p.evaluate(()=>visBtns().map(b=>b.textContent).join(","));await p.keyboard.press(btn.includes('맞았어요')?'ArrowRight':' ');await p.waitForTimeout(500);}
await p.screenshot({path:process.argv[3]+'b.png'});
const miss=await p.evaluate(()=>{let m=[];ITEMS.forEach(it=>{if(!src(it.ja))m.push(it.ja);if(!AUD.ko[it.m])m.push("ko:"+it.m)});UNITS.forEach(U=>U.D.forEach(x=>{if(!src(x.ja))m.push(x.ja)}));return m});
console.log(log.join(" "),"\nmiss",miss.length,miss.slice(0,5),"\nlang",await p.evaluate(()=>LANG+" "+UNITS.length+" "+ITEMS.length),errs);
// switch back
await p.evaluate(()=>{toStart()});await p.click('#langSeg [data-l=ja]');await p.waitForTimeout(600);console.log('back',await p.evaluate(()=>LANG+" "+UNITS.length));
await b.close();})();
