// A local light response, with no path, stroke, particle or replacement cursor.
(() => {
 const fine=matchMedia('(hover:hover) and (pointer:fine) and (min-width:761px)');
 const reduced=window.PortfolioMotion.media;
 const glow=document.createElement('div');glow.className='pointer-glow';glow.setAttribute('aria-hidden','true');glow.dataset.state='idle';document.body.append(glow);
 let point=null,position=null,alpha=0,frame=0,last=0,input=0;
 const allowed=()=>fine.matches&&!reduced.matches&&!document.hidden&&!document.querySelector('dialog[open]');
 function reset(){cancelAnimationFrame(frame);frame=0;point=null;position=null;alpha=0;glow.style.opacity='0';glow.dataset.state='idle';last=0;}
 function draw(now){frame=0;if(!allowed()){reset();return;}const dt=Math.min(40,now-(last||now));last=now;
  const target=point&&now-input<100?point.power:0;alpha+=(target-alpha)*(1-Math.exp(-dt/100));
  if(point){if(!position)position={x:point.x,y:point.y};const ease=1-Math.exp(-dt/45);position.x+=(point.x-position.x)*ease;position.y+=(point.y-position.y)*ease;glow.style.transform=`translate3d(${position.x-140}px,${position.y-110}px,0)`;}
  glow.style.opacity=String(alpha);
  if(alpha>.002||target>0)frame=requestAnimationFrame(draw);else reset();
 }
 document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||!allowed())return;
  const image=e.target.closest('.project-media,.gallery-card-media,.gallery-standard-image');
  const reading=e.target.closest('p,h1,h2,h3,h4,li,.project-meta,.about-introduction');
  point={x:e.clientX,y:e.clientY,power:image ? .32 : reading ? .025 : .18};input=performance.now();
  glow.dataset.region=image?'image':reading?'reading':'background';
  if(!frame){last=input;glow.dataset.state='active';frame=requestAnimationFrame(draw);}
 },{passive:true});
 document.addEventListener('pointerout',e=>{if(!e.relatedTarget)reset();});
 addEventListener('blur',reset);addEventListener('resize',reset,{passive:true});addEventListener('scroll',reset,{passive:true});
 document.addEventListener('visibilitychange',reset);fine.addEventListener('change',reset);reduced.addEventListener('change',reset);
 new MutationObserver(()=>{if(document.querySelector('dialog[open]'))reset();}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
})();
