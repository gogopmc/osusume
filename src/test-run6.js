const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};w.confirm=()=>true;}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));
const sl=ms=>new Promise(r=>setTimeout(r,ms));
setTimeout(async()=>{
 for(const n of ['박국장','직원A']){d.querySelector('#newName').value=n;d.querySelector('#addBtn').click();}
 d.querySelector('#pin').value='1234';d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 const seq=[];let L=0;
 for(let i=0;i<230;i++){
   const ch=d.querySelectorAll('#actin .choice');if(ch.length){L++;ch[0].click();seq.push('L');await sl(1900);continue;}
   if(click('다시 따라 말했어요')||click('따라 말했어요')){await sl(3);continue;}
   if(!click('정답 듣기'))break;click('맞았어요');await sl(600);}
 console.log('listen count',L,'today',d.querySelector('#hToday').textContent);
 d.querySelector('[data-tab=status]').click();console.log(d.querySelector('#status').textContent.slice(0,140));
 // wrong pin test
 d.querySelector('#quitBtn').click();[...d.querySelectorAll('#summary button')].find(b=>b.textContent.includes('사용자'))?.click();
 d.querySelector('#pin').value='9999';d.querySelector('#goBtn').click();console.log('blocked',!d.querySelector('#startView').hidden);
 console.log('errs',errs);process.exit(0);
},300);
