const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({...devices['iPhone 13'],deviceScaleFactor:1});
await p.route('**/*',r=>{const u=r.request().url();if(u.includes('cloudfront'))return r.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400"><rect width="300" height="400" fill="#f4b6c2"/><text x="40" y="200" font-size="40">손님사진</text></svg>'});if(u.startsWith('file:'))return r.continue();return r.abort();});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);
await p.evaluate(()=>{me="민철";S=fresh();startConv(0);});await p.waitForTimeout(400);
for(let k=0;k<3;k++){await p.locator('#cvBar button').last().click();await p.waitForTimeout(500);}
await p.screenshot({path:process.argv[3]});await b.close();})();
