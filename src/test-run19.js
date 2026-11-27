const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(process.argv[2],'utf8'),{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{await sl(200);const ni=d.querySelector('#nameIn');ni.value='민철';ni.dispatchEvent(new w.Event('input'));d.querySelector('#pin').value='1234';d.querySelector('#goBtn').click();await sl(300);
 console.log('in main',!d.querySelector('#mainView').hidden,d.querySelector('#hName').textContent);
 d.querySelector('[data-tab=status]').click();await sl(50);console.log(d.querySelector('#status').textContent.slice(0,80));
 // wrong pin
 w.eval('toStart()');ni.value='민철';ni.dispatchEvent(new w.Event('input'));d.querySelector('#pin').value='9999';d.querySelector('#goBtn').click();await sl(300);console.log('blocked',d.querySelector('#mainView').hidden,d.querySelector('#toast').textContent);
 console.log(errs);process.exit(0);})();
