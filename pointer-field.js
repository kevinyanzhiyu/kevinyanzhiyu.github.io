// One bounded canvas, active only while the pointer or its short wake is moving.
(() => {
  const fine=matchMedia('(hover:hover) and (pointer:fine) and (min-width:761px)');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const canvas=document.createElement('canvas');canvas.className='pointer-field';canvas.setAttribute('aria-hidden','true');canvas.dataset.state='idle';document.body.append(canvas);
  const ctx=canvas.getContext('2d');if(!ctx)return;
  let width=0,height=0,ratio=1,frame=0,lastTime=0,lastInput=0;
  let point=null,position=null,wake=[],strength=0;
  const enabled=()=>fine.matches&&!reduced.matches&&!document.hidden&&!document.querySelector('dialog[open]');
  function reset(){cancelAnimationFrame(frame);frame=0;point=null;position=null;wake=[];strength=0;canvas.dataset.state='idle';ctx.clearRect(0,0,width,height);}
  function resize(){reset();width=innerWidth;height=innerHeight;if(!fine.matches||reduced.matches){canvas.width=1;canvas.height=1;return;}ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);}
  function draw(now){
    frame=0;if(!enabled()){reset();return;}
    const dt=Math.min(40,now-(lastTime||now));lastTime=now;
    const alive=point&&now-lastInput<110;
    strength+=( (alive?point.power:0)-strength)*Math.min(1,dt*.012);
    if(point){if(!position)position={x:point.x,y:point.y};const ease=1-Math.exp(-dt/65);position.x+=(point.x-position.x)*ease;position.y+=(point.y-position.y)*ease;}
    ctx.clearRect(0,0,width,height);
    wake=wake.filter(p=>now-p.time<650);
    // Broad, low-contrast light moves through the blank page; text areas are quieter.
    if(position&&strength>.002){
      const r=150,g=ctx.createRadialGradient(position.x,position.y,0,position.x,position.y,r);
      g.addColorStop(0,`rgba(133,163,201,${strength*.13})`);g.addColorStop(.42,`rgba(164,190,211,${strength*.075})`);g.addColorStop(1,'rgba(164,190,211,0)');ctx.fillStyle=g;ctx.fillRect(position.x-r,position.y-r,r*2,r*2);
    }
    // A short directional wake, not expanding rings or a delayed custom cursor.
    for(let i=1;i<wake.length;i++){
      const a=wake[i-1],b=wake[i],age=(now-b.time)/650;
      if(Math.hypot(b.x-a.x,b.y-a.y)>180)continue;
      const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1;
      const bend=Math.sin(age*Math.PI)*12;
      ctx.strokeStyle=`rgba(104,139,174,${(1-age)*b.power*.17})`;ctx.lineWidth=1+age*1.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo((a.x+b.x)/2-dy/len*bend,(a.y+b.y)/2+dx/len*bend,b.x,b.y);ctx.stroke();
      ctx.strokeStyle=`rgba(255,255,255,${(1-age)*b.power*.28})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x+2,a.y+2);ctx.lineTo(b.x+2,b.y+2);ctx.stroke();
    }
    if(wake.length||strength>.002)frame=requestAnimationFrame(draw);
    else{position=null;lastTime=0;canvas.dataset.state='idle';}
  }
  document.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse'||!enabled())return;
    const now=performance.now(),target=event.target;
    const image=target.closest('.project-media,.gallery-card-media,.gallery-standard-image,.hero-glass');
    const reading=target.closest('p,h1,h2,h3,h4,li,.project-meta,.about-introduction,.case-shell');
    const power=image ? .85 : reading ? .08 : target.closest('a,button') ? .25 : .42;
    const region=image ? 'image' : reading ? 'reading' : target.closest('a,button') ? 'control' : 'background';
    if(canvas.dataset.region!==region)canvas.dataset.region=region;
    point={x:event.clientX,y:event.clientY,power};lastInput=now;
    const previous=wake[wake.length-1];
    if(!previous||now-previous.time>22&&Math.hypot(point.x-previous.x,point.y-previous.y)>4){wake.push({...point,time:now});if(wake.length>32)wake.shift();}
    if(!frame){lastTime=now;canvas.dataset.state='active';frame=requestAnimationFrame(draw);}
  },{passive:true});
  document.addEventListener('pointerout',event=>{if(!event.relatedTarget)reset();});
  addEventListener('blur',reset);addEventListener('pointercancel',reset);addEventListener('resize',resize,{passive:true});
  addEventListener('scroll',()=>{wake=[];point=null;},{passive:true});
  document.addEventListener('visibilitychange',reset);fine.addEventListener('change',resize);reduced.addEventListener('change',resize);
  new MutationObserver(()=>{if(document.querySelector('dialog[open]'))reset();}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
  resize();
})();
