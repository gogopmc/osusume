const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({...devices['iPhone 13'],deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);await p.screenshot({path:process.argv[3]+'a.png'});
await p.fill('#newName','민철');await p.click('#addBtn');await p.waitForTimeout(100);await p.click('.pbtn');await p.fill('#pin','1234');await p.click('#goBtn');await p.waitForTimeout(800);
const log=[];for(let k=0;k<8;k++){const before=await p.evaluate(()=>S.step+"|"+(window.__curId||""));const btns=await p.evaluate(()=>visBtns().map(b=>b.textContent.trim().slice(0,12)).join(","));
 await p.keyboard.press(btns.includes('맞았어요')?'ArrowRight':' ');await p.waitForTimeout(700);log.push(before+" ["+btns+"]");}
console.log(log.join("\n"));
await p.evaluate(()=>{});await p.click('#flagBtn');await p.waitForTimeout(200);await p.screenshot({path:process.argv[3]+'b.png'});
console.log(errs);await b.close();})();
