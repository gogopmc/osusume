const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8').replace('guard=0;\n  if(c.id&&c.type!=="done"){','guard=0;(window.__shown=window.__shown||[]);if(c.id&&c.type!=="done")window.__shown.push({id:c.id,type:c.type,ja:BY[c.id].ja,knownBefore:!!(S.knownSess&&S.knownSess[c.id]===SESS)});\n  if(c.id&&c.type!=="done"){');
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
 w.__shown=w.__shown||[];const L=w.__log.filter(c=>c.id&&c.type!=='done');let rep=0;const ex=[];const shown=[];
 // actually displayed = entries not immediately replaced by guard; approximate with DOM-rendered sequence via ids recorded at render time
 for(let i=1;i<w.__shown.length;i++){if(w.__shown[i].ja===w.__shown[i-1].ja){rep++;ex.push(w.__shown[i-1].id+'/'+w.__shown[i-1].type+' -> '+w.__shown[i].id+'/'+w.__shown[i].type);}}
 const kv=w.__shown.filter((x,i)=>x.knownBefore).map(x=>x.id+'/'+x.type);console.log('known shown',kv.slice(0,5).join(' '),'ex',ex.slice(0,4).join(' | '));
 console.log('run',run,'quizzes',seq.length,'known-reappear',viol,'consecutive',rep,'errs',errs.length);}process.exit(0);})();
