const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync(process.argv[2],'utf8').replace('const TLABEL=','window.__I=ITEMS;window.__U=UNITS;window.__CL=CLIPS;const TLABEL=');
const dom=new JSDOM(html,{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{await sl(200);
 console.log('units',w.__U.map(u=>u.title).join(' / '),'items',w.__I.length,w.__I.filter(i=>i.u==1).length,w.__I.filter(i=>i.u==2).length);
 const miss=w.__I.filter(i=>!w.__CL[i.ja]).map(i=>i.id);console.log('missing audio',miss.length,miss.slice(0,5));
 d.querySelector('#newName').value='A';d.querySelector('#addBtn').click();d.querySelector('#pin').value='1111';d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 for(let i=0;i<500;i++){const ch=d.querySelectorAll('#actin .choice');if(ch.length){ch[0].click();await sl(1900);continue;}
  if(click('따라 말했어요')){await sl(2);continue;}if(!click('정답 듣기'))break;click('맞았어요');await sl(560);}
 console.log('header',d.querySelector('#hName').textContent,'errs',errs);process.exit(0);})();
