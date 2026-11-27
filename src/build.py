import json,hashlib,re,subprocess,sys,os
ROOT='..' if os.path.exists('../tts/list.tsv') else '../osusume'
EN_VOICE=os.environ.get('ENV','en-US-JennyNeural');EN_RATE='0%'
a=json.load(open('audmap.json'))
js=json.loads(subprocess.check_output(['node','-e','global.window={};require("./units_en.js");console.log(JSON.stringify(window.__UNITS_EN))']))
h=lambda l,v,r,t:hashlib.md5((l+v+r+'|'+t).encode()).hexdigest()[:12]
tsv=open(ROOT+'/tts/list.tsv',encoding='utf-8').read();have=set(l.split('\t')[0] for l in tsv.splitlines())
new=[];a['en']={}
for U in js:
  for x in U['W']+U['S']+U['D']:
    i=h('en',EN_VOICE,EN_RATE,x['ja']);a['en'][x['ja']]=i
    if i not in have:new.append(f"{i}\ten\t{x['ja']}\t{EN_RATE}\t{EN_VOICE}\t");have.add(i)
    if x['m'] not in a['ko']:
      i=h('ko','ko-KR-SunHiNeural','+12%',x['m']);a['ko'][x['m']]=i
      if i not in have:new.append(f"{i}\tko\t{x['m']}\t+12%\tko-KR-SunHiNeural\t");have.add(i)
allm=json.loads(subprocess.check_output(['node','-e','const vm=require("vm"),fs=require("fs");const c={window:{}};vm.createContext(c);for(const f of ["content.js","units23.js","units47.js","units89.js","units1012.js","units1315.js","units_zh.js","units_zh2.js"])vm.runInContext(fs.readFileSync(f,"utf8"),c);vm.runInContext("var __o=[];for(const x of [...WORDS,...SENTS,...DIALOG])__o.push(x.m);for(const U of [...window.__EXTRA_UNITS,...window.__UNITS_ZH])for(const x of [...U.W,...U.S,...U.D])__o.push(x.m);",c);console.log(JSON.stringify(c.__o))']))
for m in allm:
  if m and m not in a['ko']:
    i=h('ko','ko-KR-SunHiNeural','+12%',m);a['ko'][m]=i
    if i not in have:new.append(f"{i}\tko\t{m}\t+12%\tko-KR-SunHiNeural\t");have.add(i)
json.dump(a,open('audmap.json','w'),ensure_ascii=False)
if new:open(ROOT+'/tts/list.tsv','a',encoding='utf-8').write(('' if tsv.endswith('\n') else '\n')+'\n'.join(new)+'\n')
print('new tts',len(new))
files=['content.js','units23.js','units47.js','units89.js','units1012.js','units1315.js','units_zh.js','units_zh2.js','units_en.js']
content='\n'.join(open(f).read() for f in files)
c=json.load(open('clips2.json'));clips={k:v for k,v in c.items() if k.startswith('__')}
s=open('web.tpl.html').read().replace('__CONTENT__',content).replace('__CLIPS__',json.dumps(clips)).replace('__AUD__',json.dumps(a,ensure_ascii=False))
open(ROOT+'/index.html' if ROOT=='..' else 'site/index.html','w').write(s);print('built',len(s))
