const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8').replace('function show(c){','function show(c){(window.__log=window.__log||[]).push((c.type||"")+":"+(c.id||"")+":"+(window.__why||""));');
async function one(seed){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};}});
 const w=dom.window,d=w.document;const sl=ms=>new Promise(r=>setTimeout(r,ms));await sl(200);
 d.querySelector('#newName').value='A';d.querySelector('#addBtn').click();d.querySelector('#pin').value='1111';d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 for(let i=0;i<300;i++){const ch=d.querySelectorAll('#actin .choice');if(ch.length){ch[Math.floor(Math.random()*ch.length)].click();await sl(2000);continue;}
  if(click('다시 따라 말했어요')||click('따라 말했어요')){await sl(2);continue;}
  if(!click('정답 듣기'))break;const r=Math.random();
  if(r<.12){click('틀렸어요');await sl(2);if(d.querySelector('.wchip')){if(Math.random()<.5)d.querySelector('.wchip').click();click(Math.random()<.5?'선택 완료':'단어는 다 알아요');}}
  else if(r<.17)click('이미 알아요');else click('맞았어요');await sl(560);}
 const L=w.__log.map(x=>x.split(':')).filter(x=>x[1]);let bad=[];
 for(let i=1;i<L.length;i++){if(L[i][1]===L[i-1][1])bad.push(i+' '+L[i-1].join(':')+' -> '+L[i].join(':')+(L[i+1]&&L[i+1][1]===L[i][1]?' -> '+L[i+1].join(':'):''));}
 console.log('run',seed,'shows',L.length,'consecutive',bad.length,bad.slice(0,4).join(' | '));
}
(async()=>{for(let s=0;s<3;s++)await one(s);process.exit(0);})();
