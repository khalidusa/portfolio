const puppeteer=require('puppeteer-core');const sharp=require('sharp');
const S='/private/tmp/claude-501/-Users-khaledsameer--claude-spares-spare-h7uJQg/3ffcbbad-a3f9-4570-81bf-deda648e4db1/scratchpad/';
(async()=>{const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('requestfailed',r=>errs.push('FAIL '+r.url()));
await p.setViewport({width:1440,height:900});await p.goto('file://'+process.env.HOME+'/projects/portfolio/index.html',{waitUntil:'networkidle0'});
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}window.scrollTo(0,0)});await new Promise(r=>setTimeout(r,800));
const full=await p.screenshot({fullPage:true});const meta=await sharp(full).metadata();console.log('h',meta.height);
const n=Math.ceil(meta.height/1800);for(let i=0;i<Math.min(n,3);i++){await sharp(full).extract({left:0,top:i*1800,width:1440,height:Math.min(1800,meta.height-i*1800)}).resize({width:900}).jpeg({quality:70}).toFile(S+'pv'+i+'.jpg')}
const m=await b.newPage();await m.setViewport({width:390,height:844,isMobile:true});await m.goto('file://'+process.env.HOME+'/projects/portfolio/index.html',{waitUntil:'networkidle0'});
await m.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}window.scrollTo(0,0)});
const mf=await m.screenshot({fullPage:true});await sharp(mf).extract({left:0,top:0,width:390,height:2600}).jpeg({quality:70}).toFile(S+'pvm.jpg');
console.log('overflowX',await m.evaluate(()=>document.documentElement.scrollWidth));console.log(errs.join('\n')||'no errors');await b.close()})();
