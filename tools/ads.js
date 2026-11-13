const sharp=require('sharp');const T='/Users/khaledsameer/.claude/projects/-Users-khaledsameer-projects/3ffcbbad-a3f9-4570-81bf-deda648e4db1/tool-results/';
async function blurRegions(buf,regs){const meta=await sharp(buf).metadata();const comps=[];for(const [l,t,w,h] of regs){const L=Math.max(0,l),Tp=Math.max(0,t);const W=Math.min(w,meta.width-L),H=Math.min(h,meta.height-Tp);comps.push({input:await sharp(buf).extract({left:L,top:Tp,width:W,height:H}).blur(9).toBuffer(),left:L,top:Tp})}return sharp(buf).composite(comps).toBuffer()}
(async()=>{
// credit account campaigns table
let b=await sharp(T+'mcp-claude-in-chrome-blob-1794589343069-57ppsx.jpg').extract({left:56,top:140,width:1400,height:262}).toBuffer();
b=await blurRegions(b,[[969,95,371,165]]);
await sharp(b).webp({quality:85}).toFile('../assets/shots/ads/1.webp');
// credit account overview
b=await sharp(T+'mcp-claude-in-chrome-blob-1794589363047-95bs80.jpg').extract({left:370,top:50,width:840,height:430}).toBuffer();
b=await blurRegions(b,[[240,80,130,50],[560,80,140,50],[468,280,88,30],[500,350,80,30]]);
await sharp(b).webp({quality:85}).toFile('../assets/shots/ads/2.webp');
// EZ campaigns
await sharp(T+'mcp-claude-in-chrome-blob-1794591297676-t1n6zr.jpg').extract({left:64,top:160,width:1326,height:292}).webp({quality:85}).toFile('../assets/shots/ads/3.webp');
// EZ ads: header + delivered rows
const src=T+'mcp-claude-in-chrome-blob-1794591316207-akjpac.jpg';
const head=await sharp(src).extract({left:64,top:160,width:1326,height:146}).toBuffer();
const rows=await sharp(src).extract({left:64,top:445,width:1326,height:290}).toBuffer();
await sharp({create:{width:1326,height:436,channels:3,background:'#fff'}}).composite([{input:head,top:0,left:0},{input:rows,top:146,left:0}]).webp({quality:85}).toFile('../assets/shots/ads/4.webp');
console.log('ok')})();
