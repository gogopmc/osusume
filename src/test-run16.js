const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8'),{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};}});
const w=dom.window,d=w.document;const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{await sl(200);d.querySelector('#newName').value='A';d.querySelector('#addBtn').click();d.querySelector('#pin').value='1111';d.querySelector('#goBtn').click();
 const click=t=>{const b=[...d.querySelectorAll('#actin button')].find(x=>x.textContent.includes(t));if(b)b.click();return !!b;};
 for(let i=0;i<25;i++){if(click('따라 말했어요')){await sl(3);continue;}if(!click('정답 듣기'))break;click(i%3?'맞았어요':'틀렸어요');await sl(5);click('단어는 다 알아요');await sl(560);}
 d.querySelector('#quitBtn').click();await sl(50);
 const L=JSON.parse(w.localStorage.getItem('osusume-log-A'));console.log('entries',L.length);L.slice(0,4).concat(L.slice(-3)).forEach(x=>console.log(JSON.stringify(x).slice(0,220)));
 console.log('summary visible',!d.querySelector('#summary').hidden, 'log text in DOM', d.body.textContent.includes('GRADE'));process.exit(0);})();
