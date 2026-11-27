const {JSDOM}=require('jsdom');const fs=require('fs');
let html=fs.readFileSync('/mnt/user-data/outputs/trinity-osusume.html','utf8').replace('const TLABEL=','window.__I=ITEMS;const TLABEL=');
const dom=new JSDOM(html,{runScripts:'dangerously',beforeParse(w){w.HTMLMediaElement.prototype.play=function(){return Promise.resolve();};w.HTMLMediaElement.prototype.pause=function(){};w.__EXTRA_UNITS=[{id:'u2',title:'모공',W:[{id:'w1',g:1,ja:'毛穴',p:'',m:'모공'}],S:[],D:[]}];}});
console.log(dom.window.__I.map(i=>i.id).join(' '));process.exit(0);
