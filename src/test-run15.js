const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8').replace('  guard=0;\n','  guard=0;if(c.id&&c.type!=="done")(window.__shown=window.__shown||[]).push({id:c.id,type:c.type,ja:BY[c.id].ja,kb:!!(S.knownSess&&S.knownSess[c.id]===SESS&&S.st[c.id]&&S.st[c.id].kn)});\n');
(async()=>{for(let run=0;run<3;run++){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};}});
 const w=dom.window,d=w.document;const sl=ms=>new Promise(r=>setTimeout(r,ms));await sl(200);
 d.querySelector('#newName').value='A';d.querySelector('#addBtn').click();d.querySelector('#pin').value='1111';d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 for(let i=0;i<260;i++){const ch=d.querySelectorAll('#actin .choice');if(ch.length){ch[0].click();await sl(2000);continue;}
  if(d.querySelector('#actin .btn.primary')?.textContent.includes('따라')){ if(Math.random()<.15)click('이미 알아요');else click('따라 말했어요');await sl(3);continue;}
  if(!click('정답 듣기'))break;const r=Math.random();if(r<.2){click('틀렸어요');await sl(3);if(d.querySelector('.wchip'))click('단어는 다 알아요');}
  else if(r<.35)click('이미 알아요');else click('맞았어요');await sl(560);}
 const X=w.__shown||[];let rep=[];for(let i=1;i<X.length;i++)if(X[i].ja===X[i-1].ja)rep.push(X[i-1].id+'/'+X[i-1].type+'>'+X[i].id+'/'+X[i].type);
 console.log('run',run,'shown',X.length,'known-reappear',X.filter(x=>x.kb).map(x=>x.id+'/'+x.type).join(','),'consecutive',rep.join(' '));}process.exit(0);})();
