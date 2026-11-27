const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8').replace('const TLABEL=','window.__W=wordsOf;window.__BY=BY;const TLABEL=');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));
for(const id of ['s1','s3','s7','d1','d5','d6'])console.log(id,w.__W(w.__BY[id]).map(x=>w.__BY[x].ja).join(','));
const sl=ms=>new Promise(r=>setTimeout(r,ms));
setTimeout(async()=>{d.querySelector('#newName').value='A';d.querySelector('#addBtn').click();d.querySelector('#pin').value='1111';d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 const seq=[];const wrongAt={};const wc={};let viol=0;
 for(let i=0;i<260;i++){const ch=d.querySelectorAll('#actin .choice');if(ch.length){ch[0].click();await sl(2400);seq.push('L');continue;}
  const j=d.querySelector('#card .jbig')?.textContent;
  if(click('다시 따라 말했어요')||click('따라 말했어요')){seq.push('N:'+j);if(wrongAt[j]!=null)delete wrongAt[j];await sl(3);continue;}
  if(!click('정답 듣기'))break;const q=d.querySelector('#card .jbig')?.textContent;seq.push(q);
  for(const [k,v] of Object.entries(wrongAt)){if(seq.length-v>6){if((wc[k]||0)<4){viol++;console.log('late',k,wc[k],seq.slice(v-1,v+8).join(' / '));}delete wrongAt[k];}} if(wrongAt[q]!=null)delete wrongAt[q];
  if(Math.random()<0.25){click('틀렸어요');await sl(5);if(d.querySelector('.wchip')){d.querySelector('.wchip').click();click('선택 완료');}wrongAt[q]=seq.length;wc[q]=(wc[q]||0)+1;}else click('맞았어요');
  await sl(600);}
 console.log('late retries(>5)',viol,'total',seq.length,'errs',errs);process.exit(0);},300);
