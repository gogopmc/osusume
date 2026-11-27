const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));
setTimeout(()=>{d.querySelector('#newName').value='A';d.querySelector('#addBtn').click();d.querySelector('#goBtn').click();
 d.querySelector('#quitBtn').click();console.log('bar hidden',d.querySelector('#actbar').hidden, d.querySelector('#summary').textContent.slice(0,160));
 d.querySelector('#summary .btn.primary').click();console.log('bar back',d.querySelector('#actbar').hidden);console.log(errs);process.exit(0);},300);
