const puppeteer=require('puppeteer-core');
(async()=>{const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
for(const u of process.argv.slice(2)){const p=await b.newPage();await p.goto(u,{waitUntil:'networkidle2',timeout:40000}).catch(()=>{});await new Promise(r=>setTimeout(r,2000));
const t=await p.evaluate(()=>[...document.querySelectorAll('button,a,[role=button],input,select')].map(e=>(e.tagName+':'+(e.innerText||e.value||e.placeholder||e.name||'').trim().slice(0,40))).filter(x=>x.length>4).slice(0,40));console.log('==',u,'\n',t.join(' | '));}
await b.close();})();
