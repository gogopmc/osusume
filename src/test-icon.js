const {chromium}=require('playwright');const fs=require('fs');
const h=fs.readFileSync(process.argv[2],'utf8');const svg=h.match(/<svg viewBox="0 0 200 200" class="chick"[\s\S]*?<\/svg>/)[0].replace(/<rect x="112"[\s\S]*?おすすめ!<\/text>/,'');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
for(const [n,s] of [['icon-512.png',512],['icon-192.png',192],['apple-touch-icon.png',180]]){
 await p.setViewportSize({width:s,height:s});
 await p.setContent(`<body style="margin:0;background:#D97300;display:grid;place-items:center;height:${s}px"><div style="width:${s*.86}px;height:${s*.86}px;margin-top:${s*.04}px">${svg.replace('class="chick"','style="width:100%;height:100%"')}</div></body>`);
 await p.screenshot({path:process.argv[3]+'/'+n});}
await b.close();})();
