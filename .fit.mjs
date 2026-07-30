import { chromium } from 'playwright'
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']})
const page=await b.newPage({viewport:{width:900,height:700}})
page.on('pageerror',e=>console.log('  ERR',String(e).slice(0,100)))
await page.goto(process.argv[2],{waitUntil:'load'})
await page.waitForFunction(()=>!!window.dronedome,null,{timeout:30000}); await page.waitForTimeout(2500)
const HOST='mq9-reaper'
const apply=async(slots)=>{const want=JSON.stringify([HOST,slots,1])
  await page.evaluate(([h,s])=>{const x=window.__mk(h);x.slots=s;window.dronedome.setBuild(x)},[HOST,slots])
  try{await page.waitForFunction(w=>window.dronedome.report().buildId===w,want,{timeout:40000,polling:100})}catch{return null}
  await page.waitForTimeout(700)
  return (await page.evaluate(()=>window.dronedome.report())).meshes}
const caps=await page.evaluate(()=>window.dronedome.caps())
const donors=(caps.donors.wing||[]).filter(d=>d!==HOST)
const stock=await apply({})
const hostBox=(ms,role)=>{const g=ms.filter(m=>!role||m.role===role)
  if(!g.length)return null
  const lo=[1/0,1/0,1/0],hi=[-1/0,-1/0,-1/0]
  for(const m of g)for(let k=0;k<3;k++){lo[k]=Math.min(lo[k],m.min[k]);hi[k]=Math.max(hi[k],m.max[k])}
  return {lo,hi,span:hi[0]-lo[0],midX:(lo[0]+hi[0])/2,midY:(lo[1]+hi[1])/2,midZ:(lo[2]+hi[2])/2}}
const ref=hostBox(stock,'wing')
const refBody=hostBox(stock,'body')
// Everything is measured against the host's own body IN THE SAME BUILD. The
// assembly is re-grounded after each change, so comparing absolute heights
// between two builds says the wing moved when the aircraft was simply set down
// at a different height.
const refDY=ref.midY-refBody.midY, refDZ=ref.midZ-refBody.midZ
console.log(`host MQ-9: own wing span=${ref.span.toFixed(1)}m, sits ${refDY.toFixed(2)}m above and ${refDZ.toFixed(2)}m aft of its body centre`)
console.log(`\n${donors.length} wing donors\n`)
console.log('donor'.padEnd(17)+'span'.padStart(7)+'  vs host'+'   offCentre'+'  ΔY'.padStart(7)+'   ΔZ'.padStart(7)+'   verdict')
const bad=[]
for(const id of donors){
  const ms=await apply({wing:{kind:'donor',aircraftId:id}})
  if(!ms){console.log(id.padEnd(17)+'  STALE');bad.push([id,'stale']);continue}
  const w=hostBox(ms,'wing')
  if(!w){console.log(id.padEnd(17)+'  NO WING MESH');bad.push([id,'no wing rendered']);continue}
  const bodyNow=hostBox(ms,'body')
  const ratio=w.span/ref.span
  const off=Math.abs(w.midX-bodyNow.midX)/ref.span
  const dy=(w.midY-bodyNow.midY)-refDY
  const dz=(w.midZ-bodyNow.midZ)-refDZ
  const tall=(w.hi[1]-w.lo[1])/ref.span
  const probs=[]
  if(ratio<0.5||ratio>1.6) probs.push(`span ${ratio.toFixed(2)}x host`)
  if(off>0.08) probs.push(`off centre by ${(off*100).toFixed(0)}% of span`)
  if(Math.abs(dy)>ref.span*0.15) probs.push(`${dy>0?'above':'below'} the wing line by ${Math.abs(dy).toFixed(1)}m`)
  if(Math.abs(dz)>ref.span*0.25) probs.push(`${dz>0?'aft':'fwd'} by ${Math.abs(dz).toFixed(1)}m`)
  if(tall>0.35) probs.push(`${(w.hi[1]-w.lo[1]).toFixed(1)}m tall, ${(tall*100).toFixed(0)}% of span`)
  console.log(id.padEnd(17)+w.span.toFixed(1).padStart(6)+'m'+ratio.toFixed(2).padStart(8)+'x'+
    (off*100).toFixed(0).padStart(10)+'%'+dy.toFixed(1).padStart(7)+dz.toFixed(1).padStart(8)+'   '+(probs.length?'FIT: '+probs.join(', '):'ok'))
  if(probs.length) bad.push([id,probs.join(', ')])
}
console.log(`\n${bad.length} of ${donors.length} wing donors do not fit the Reaper cleanly.`)
await b.close()
