const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};w.confirm=()=>true;}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));
setTimeout(async()=>{
 d.querySelector('#newName').value='박국장';d.querySelector('#addBtn').click();d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#card button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 for(let i=0;i<140;i++){const k=d.querySelector('#card .kind')?.textContent||'';
   if(!click('따라 말했어요')){ if(click('말했어요')){ click(i%5==0?'틀렸어요':'맞았어요'); await new Promise(r=>setTimeout(r,600)); } else break;}
   else await new Promise(r=>setTimeout(r,5));
 }
 console.log('HUD',d.querySelector('.hud').textContent.replace(/\s+/g,' '));
 console.log('card',d.querySelector('#card').textContent.slice(0,80));
 d.querySelector('#quitBtn').click();console.log('sum',d.querySelector('#summary').textContent.slice(0,200));
 d.querySelector('[data-tab=status]').click();console.log('stat',d.querySelector('#status').textContent.slice(0,300));
 console.log('errs',errs);process.exit(0);
},300);
