const sharp=require('sharp'),fs=require('fs'),path=require('path');
(async()=>{const root=path.join(__dirname,'..','assets','shots');const slugs=process.argv.slice(2);
const W=300,H=188,rows=[];
for(const s of slugs){const tiles=[];for(let i=1;i<=4;i++){tiles.push(await sharp(path.join(root,s,i+'.webp')).resize(W,H,{fit:'cover',position:'top'}).png().toBuffer());}rows.push(tiles);}
const comp=[];rows.forEach((r,y)=>r.forEach((t,x)=>comp.push({input:t,left:x*(W+4),top:y*(H+4)})));
await sharp({create:{width:4*(W+4),height:rows.length*(H+4),channels:3,background:'#f00'}}).composite(comp).jpeg({quality:72}).toFile('/private/tmp/claude-501/-Users-khaledsameer--claude-spares-spare-h7uJQg/3ffcbbad-a3f9-4570-81bf-deda648e4db1/scratchpad/sheet.jpg');})();
