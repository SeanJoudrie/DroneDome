import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']})
const page=await b.newPage({viewport:{width:900,height:700}})
await page.goto('http://localhost:4173/DroneDome/',{waitUntil:'load'})
await page.waitForFunction(()=>!!window.dronedome,null,{timeout:30000}); await page.waitForTimeout(2500)
const ids=JSON.parse(readFileSync('scripts/sources.json','utf8')).aircraft.map(a=>a.id)
const SW=['wing','tail','rotor','gear','payload','solar','hardpoint']
const bad=[]
for (const id of ids) {
  const want=JSON.stringify([id,{},1])
  await page.evaluate((id)=>{const x=window.__mk(id);x.payloadIds=[];window.dronedome.setBuild(x)},id)
  let stale=false
  try{await page.waitForFunction(w=>window.dronedome.report().buildId===w,want,{timeout:25000,polling:100})}catch{stale=true}
  const ms=(await page.evaluate(()=>window.dronedome.report())).meshes
  if (stale){bad.push([id,'-','-',['NEVER RENDERED']]);continue}
  const seenRoles=new Set(ms.map(m=>m.role).filter(Boolean))
  const unresolved=ms.filter(m=>!m.role).length
  const parts=JSON.parse(readFileSync(`assets-src/${id}.parts.json`,'utf8')).parts
  const want2=[...new Set(parts.filter(p=>SW.includes(p.role)).map(p=>p.role))]
  const lost=want2.filter(r=>!seenRoles.has(r))
  if (lost.length || unresolved) bad.push([id,ms.length,unresolved,lost])
}
console.log('id                meshes unnamed  roles the app cannot find')
for (const [id,m,u,l] of bad) console.log(`  ${id.padEnd(16)} ${String(m).padStart(5)} ${String(u).padStart(7)}  ${l.join(', ')||'-'}`)
console.log(`\n${bad.length} of ${ids.length} airframes with parts the app cannot resolve`)
await b.close()
