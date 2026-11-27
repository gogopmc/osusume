const {JSDOM}=require('jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(process.argv[2],'utf8'),{url:'https://x.test/',runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){w.HTMLMediaElement.prototype.play=function(){setTimeout(()=>this.onended&&this.onended(),5);return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};w.Element.prototype.scrollIntoView=function(){};}});
const w=dom.window,d=w.document;const errs=[];w.addEventListener('error',e=>errs.push(e.message));const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{await sl(200);d.querySelector('.pbtn')&&d.querySelector('.pbtn').click();
 if(!d.querySelector('.pbtn')){d.querySelector('#newName').value='민철';d.querySelector('#addBtn').click();await sl(50);d.querySelector('.pbtn').click();}
 d.querySelector('#pin').value='1234';d.querySelector('#goBtn').click();await sl(300);
 w.eval('startConv(5)');let n=0;
 while(!d.querySelector('#conv').hidden&&n<80){n++;await sl(30);const bs=[...d.querySelectorAll('#cvBar button')];if(!bs.length)continue;const t=bs.map(b=>b.textContent);
  const pick=bs.find(b=>/기본 학습/.test(b.textContent))||bs.find(b=>/맞았어요/.test(b.textContent))||bs[bs.length-1];if(/기본/.test(pick.textContent)){console.log(d.querySelector('#cvLog').lastChild.textContent.slice(0,80));}pick.click();await sl(600);}
 console.log('steps',n,'hidden',d.querySelector('#conv').hidden,'img',d.querySelector('#cvImg').src.slice(-30),'chick',d.querySelector('#cvChick').innerHTML.slice(0,20));
 w.eval('S.conv={};convLines(0).forEach(x=>{if(x.iid)S.st[x.iid]={ok:1,ivl:5,wrong:0}})');console.log('ready',w.eval('convReady(0)'),w.eval('maybeOffer()'),d.querySelector('#offer').textContent.slice(0,70));d.querySelector('#offer .btn.ghost').click();console.log('after skip',w.eval('maybeOffer()'));
 console.log(errs);process.exit(0);})();
