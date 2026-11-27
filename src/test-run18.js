const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync('/tmp/claude-0/-home-claude/dc59d8f4-0b2b-5f4c-b4be-96dc620bd597/scratchpad/site/index.html','utf8'),{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{await sl(200);d.querySelector('#newName').value='민철';d.querySelector('#addBtn').click();d.querySelector('#pin').value='1111';d.querySelector('#goBtn').click();await sl(300);
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 for(let i=0;i<6;i++){if(click('따라 말했어요')){await sl(3);continue;}if(!click('정답 듣기'))break;click('맞았어요');await sl(600);}
 d.querySelector('[data-tab=status]').click();await sl(50);console.log(d.querySelector('#status').textContent.slice(0,200));console.log(errs);process.exit(0);})();
