const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};w.confirm=()=>true;}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));
setTimeout(async()=>{
 d.querySelector('#newName').value='A';d.querySelector('#addBtn').click();d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 const seq=[];
 for(let i=0;i<90;i++){const ja=d.querySelector('#card .jbig')?.textContent||d.querySelector('#card .ko')?.textContent;
   if(click('다시 따라 말했어요')){seq.push('R');await new Promise(r=>setTimeout(r,5));continue;}
   if(click('따라 말했어요')){seq.push('N:'+ja);await new Promise(r=>setTimeout(r,5));continue;}
   const q=d.querySelector('#card .ko')?.textContent; if(!click('정답 듣기'))break; seq.push('Q:'+q);
   click((q||'').length>7?'틀렸어요':'맞았어요');await new Promise(r=>setTimeout(r,600));}
 console.log(seq.join(' | '));console.log('errs',errs);process.exit(0);
},300);
