const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8').replace('function show(c){','function show(c){(window.__log=window.__log||[]).push(c);');
(async()=>{for(let run=0;run<3;run++){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};}});
 const w=dom.window,d=w.document;const sl=ms=>new Promise(r=>setTimeout(r,ms));await sl(200);const errs=[];w.addEventListener('error',e=>errs.push(e.message));
 d.querySelector('#newName').value='A';d.querySelector('#addBtn').click();d.querySelector('#pin').value='1111';d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 const known=new Set();const seq=[];let viol=0;
 for(let i=0;i<260;i++){const ch=d.querySelectorAll('#actin .choice');if(ch.length){ch[0].click();await sl(2000);continue;}
  const j=d.querySelector('#card .jbig')?.textContent;
  if(d.querySelector('#actin .btn.primary')?.textContent.includes('따라')){ if(Math.random()<.15){known.add(j);click('이미 알아요');}else click('따라 말했어요');await sl(3);continue;}
  if(!click('정답 듣기'))break;const q=d.querySelector('#card .jbig')?.textContent;if(known.has(q))viol++;seq.push(q);
  const r=Math.random();if(r<.2){click('틀렸어요');await sl(3);if(d.querySelector('.wchip'))click('단어는 다 알아요');}
  else if(r<.35){known.add(q);click('이미 알아요');}else click('맞았어요');await sl(560);}
 let rep=0;for(let i=1;i<seq.length;i++)if(seq[i]===seq[i-1])rep++;
 console.log('run',run,'quizzes',seq.length,'known-reappear',viol,'consecutive',rep,'errs',errs.length);}process.exit(0);})();
