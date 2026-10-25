(() => {
  const reduced = window.PortfolioMotion.media;
  // One rAF per scroll and only measure nearby sections. Native scroll stays intact.
  const sections=[...document.querySelectorAll('.work-group,#about')];
  const active=new Set();let raf=0;
  sections.forEach(section=>{
    const light=document.createElement('div');light.className='section-atmosphere';light.setAttribute('aria-hidden','true');section.prepend(light);
  });
  function update(){raf=0;if(reduced.matches)return;active.forEach(section=>{
    const r=section.getBoundingClientRect(),p=Math.max(-1,Math.min(1,(r.top-innerHeight*.25)/innerHeight));
    section.style.setProperty('--section-drift',`${p*55}px`);
    section.style.setProperty('--section-light',String(.7-Math.abs(p)*.2));
  });}
  const schedule=()=>{if(!raf&&!document.hidden)raf=requestAnimationFrame(update);};
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?active.add(e.target):active.delete(e.target));schedule();},{rootMargin:'220px'});sections.forEach(s=>observer.observe(s));}
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
})();
