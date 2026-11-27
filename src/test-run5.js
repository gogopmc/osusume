const {JSDOM}=require('jsdom');const fs=require('fs');
const html=fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};w.confirm=()=>true;w.__EXTRA_UNITS=[{id:'u2',title:'모공',W:[{id:'w1',g:1,ja:'毛穴',p:'케아나',m:'모공'},{id:'w2',g:1,ja:'小さい',p:'치이사이',m:'작은'}],S:[],D:[{r:'s',id:'d1',ja:'毛穴',p:'x',m:'모공 대화'}]}];}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));
setTimeout(async()=>{
 d.querySelector('#newName').value='A';d.querySelector('#addBtn').click();d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 const seq=[];
 for(let i=0;i<260;i++){const ja=d.querySelector('#card .jbig')?.textContent||d.querySelector('#card .ko')?.textContent;
   if(click('따라 말했어요')){seq.push('N:'+ja);await new Promise(r=>setTimeout(r,5));continue;}
   const q=d.querySelector('#card .ko')?.textContent; if(!click('정답 듣기'))break; seq.push('Q:'+q);
   click(i%4==0?'틀렸어요':'맞았어요');await new Promise(r=>setTimeout(r,600));}
 console.log(seq.slice(-40).join(' | '));console.log('errs',errs);process.exit(0);
},300);
