// One camera and four real project surfaces: every visible image has a final landing.
(() => {
  const stage = document.querySelector('.hero-stage');
  const hero = stage?.querySelector('.hero');
  const work = document.querySelector('#work');
  if (!hero || !work) return;
  const root = document.documentElement;
  const reduced = window.PortfolioMotion.media;
  const cards = [...work.querySelectorAll('#system-work .project-card')];
  const clamp = n => Math.max(0, Math.min(1, n));
  const smooth = (a, b, n) => { const t = clamp((n-a)/(b-a)); return t*t*(3-2*t); };
  const mix = (a, b, t) => a+(b-a)*t;
  // A shared boundary keeps foreground type and incoming projects disjoint,
  // including when the user reverses or jumps rapidly through the scene.
  const titleExit = .59;
  const projectsEnter = titleExit + .02;
  let start = 0, distance = 1, width = 1, height = 1;
  let frame = 0, playback = 0, measuring = 0;
  let playing = false, touched = false;
  let navigationHash=location.hash;
  let lastProgress = -1;
  let displayScroll=null,lastTime=0,snapNext=true;
  let metrics = [];
  cards.forEach(card => card.classList.add('portal-card', 'is-visible'));
  work.querySelectorAll(':scope > .section-heading, #system-work > .group-head')
    .forEach(el => el.classList.add('is-visible'));

  function stop(reason='navigation') {if(playing)window.PortfolioQuality.log('portal-playback-stop',{reason});cancelAnimationFrame(playback); playback = 0; playing = false; }
  function render(now=performance.now()) {
    if(frame)cancelAnimationFrame(frame);frame = 0;
    const actual=scrollY,end=start+distance;
    const elapsed=Math.max(1,now-(lastTime||now-16.7)),dt=Math.min(50,elapsed);lastTime=now;
    // Once the cover has handed off, category navigation is native scrolling.
    // Re-enter the camera only when actually scrolling back into the cover.
    const browsingWork=actual>=end&&lastProgress===1;
    // Filter the camera coordinate, not just scale. Position and scale therefore
    // finish together. Outside this short scene, native document scrolling wins.
    if(browsingWork||snapNext||displayScroll===null||reduced.matches||elapsed>250||actual>end+height*.4){displayScroll=actual;snapNext=false;}
    else displayScroll+=(actual-displayScroll)*(1-Math.exp(-dt/65));
    if(Math.abs(actual-displayScroll)<.35)displayScroll=actual;
    const p=reduced.matches?1:clamp((displayScroll-start)/distance);
    if(displayScroll!==actual)schedule();
    if(reduced.matches)work.style.removeProperty('--work-offset');
    else{
      const release=1-smooth(0,height*.4,Math.max(0,actual-end));
      const offset=browsingWork?0:displayScroll<end?actual-end:(actual-displayScroll)*release;
      work.style.setProperty('--work-offset',`${offset}px`);
    }
    // Past the cover, ordinary document scrolling needs no portal style updates.
    if(p===lastProgress)return;
    lastProgress=p;
    const complete = p >= 1;
    const wasComplete = work.classList.contains('portal-complete');
    root.classList.toggle('portal-in-progress', !complete);
    work.classList.toggle('portal-complete', complete);
    work.inert = !reduced.matches && p < .9;
    if (reduced.matches) {
      work.style.removeProperty('--work-offset');
      cards.forEach(card => {card.style.removeProperty('transform');card.style.removeProperty('opacity');card.style.removeProperty('--portal-card-label-opacity');});
    } else {
      metrics.forEach(({card, x, y, mediaHeight}, i) => {
        // Each surface has its own camera interval, in reading order. The
        // intervals overlap slightly so the sequence flows instead of stopping.
        const enter=projectsEnter+i*.055;
        const settle=1-(cards.length-1-i)*.055;
        const travel=smooth(enter,settle,p);
        const rear=i>=2;
        const narrow=width<=760;
        const originX = width*(narrow ? .5 : i%2===0 ? .29 : .71);
        const originY = height*(narrow ? .32+i*.4 : rear ? .79 : .48);
        const depth=narrow ? (rear ? .6 : .28) : rear ? 1.45 : .62;
        const scale=1/(1+depth*(1-travel));
        card.style.transformOrigin = `50% ${mediaHeight/2}px`;
        card.style.transform = travel===1?'none':`translate3d(${(originX-x)*(1-travel)}px,${(originY-y)*(1-travel)}px,0) scale(${scale})`;
        card.style.opacity = String(smooth(enter,enter+.09,p));
        card.style.setProperty('--portal-card-label-opacity',String(smooth(enter+.14,settle,p)));
      });
    }
    // Perspective projection: the near typography passes the camera first.
    // Opacity only cleans up once the enlarged letters have left the viewport.
    const titleTravel=smooth(0,titleExit,p);
    const titleScale=1/(1-titleTravel*.86);
    hero.style.setProperty('--portal-title-scale', String(titleScale));
    hero.style.setProperty('--portal-title-opacity', String(1-smooth(.44,titleExit,p)));
    hero.style.setProperty('--support-opacity', String(1-smooth(.04,.22,p)));
    hero.classList.toggle('portal-foreground-gone', p >= .22);
    const haloTravel=smooth(.14,.98,p);
    const outerScale=1/(1-haloTravel*.91);
    hero.classList.toggle('halo-travelling',p>.025);
    hero.classList.toggle('halo-finished',p>.97||reduced.matches);
    hero.style.setProperty('--halo-scale', String(outerScale));
    hero.style.setProperty('--halo-opacity', String(1-smooth(.79,.99,p)));
    hero.style.setProperty('--halo-rotation', `${-24+haloTravel*19}deg`);
    hero.style.setProperty('--halo-pitch', `${20-haloTravel*32}deg`);
    hero.style.setProperty('--halo-yaw', `${-16+haloTravel*25}deg`);
    hero.style.setProperty('--halo-inner-scale', String((1/(1-smooth(.19,.94,p)*.9))/outerScale));
    hero.style.setProperty('--halo-inner-y', `${-haloTravel*9}%`);
    hero.style.setProperty('--halo-inner-opacity', String(1-smooth(.73,.98,p)));
    hero.style.setProperty('--halo-light-turn', `${smooth(0,.92,p)*125}deg`);
    hero.style.setProperty('--atmosphere-opacity', String(1-smooth(.25,.78,p)));
    work.style.setProperty('--portal-label-opacity', String(smooth(.83,1,p)));
    work.style.setProperty('--portal-card-label-opacity', String(smooth(.83,.99,p)));
    work.style.setProperty('--portal-label-y', `${(1-smooth(.83,1,p))*12}px`);
    work.style.setProperty('--portal-controls-opacity', String(smooth(.9,1,p)));
    if (complete && !wasComplete) work.dispatchEvent(new Event('portfolio:ready'));
  }
  function schedule() { if(!frame) frame=requestAnimationFrame(render); }
  function measure() {
    measuring = 0;
    root.classList.toggle('hero-scroll-enabled', !reduced.matches);
    start = stage.getBoundingClientRect().top+scrollY;
    distance = Math.max(1,stage.offsetHeight-hero.offsetHeight);
    width=hero.clientWidth; height=hero.clientHeight;
    // Suppress only our transforms while reading layout; these writes never paint.
    work.style.transform='none';
    cards.forEach(card=>card.style.transform='none');
    const bounds=work.getBoundingClientRect();
    metrics=cards.map(card=>{
      const media=card.querySelector('.project-media');
      const r=media.getBoundingClientRect();
      return {card,x:r.left+r.width/2,y:r.top-bounds.top+r.height/2,mediaHeight:r.height};
    });
    work.style.removeProperty('transform'); lastProgress=-1;snapNext=true;render();
  }
  function resize() {
    stop('resize');
    if(measuring)return;
    const keepWork=work.classList.contains('portal-complete')&&!reduced.matches;
    const offset=Math.max(0,scrollY-start-distance);
    measuring=requestAnimationFrame(()=>{
      measure();
      if(keepWork){scrollTo({top:Math.ceil(start+distance+offset),behavior:'instant'});render();}
    });
  }
  function positionFor(target) {
    if(reduced.matches || !work.contains(target) && target!==work)
      return target.getBoundingClientRect().top+scrollY;
    const offset=target===work?0:target.getBoundingClientRect().top-work.getBoundingClientRect().top;
    const margin=parseFloat(getComputedStyle(target).scrollMarginTop)||0;
    return start+distance+offset-margin;
  }
  function targetFor(hash) {
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch { return null; }
  }
  function navigate(hash, push=false, focus=false, animate=false) {
    const target=hash?targetFor(hash):document.querySelector('#top');
    if(!target)return;
    stop();
    if(push && location.hash!==hash)history.pushState(null,'',hash || location.pathname+location.search);
    navigationHash=location.hash;
    scrollTo({top:Math.ceil(positionFor(target)),behavior:animate&&!reduced.matches?'smooth':'instant'});snapNext=true;render();
    if(focus){const heading=target.matches('h1,h2,h3')?target:target.querySelector('h2,h3')||target;heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
  }
  function returnToWork(hash) {
    if(reduced.matches){navigate(hash,true,true);return;}
    const target=targetFor(hash);if(!target)return;
    stop();
    const from=scrollY,to=Math.ceil(positionFor(target)),began=performance.now();
    if(location.hash!==hash)history.pushState(null,'',hash);
    navigationHash=location.hash;playing=true;
    function advance(now){
      if(!playing)return;
      const p=clamp((now-began)/600);
      const eased=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
      scrollTo({top:mix(from,to,eased),behavior:'instant'});snapNext=true;render();
      if(p<1)playback=requestAnimationFrame(advance);
      else{stop('complete');const heading=target.querySelector('h2,h3')||target;heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
    }
    playback=requestAnimationFrame(advance);
  }
  const viewWork=hero.querySelector('a[href="#work"]');
  viewWork?.addEventListener('click',event=>{
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();touched=true;
    if(reduced.matches){navigate('#work',true,true);return;}
    if(playing)return;
    const from=scrollY,to=Math.ceil(start+distance),began=performance.now();
    const duration=2400*Math.max(.3,1-clamp((from-start)/distance));
    playing=true;
    function advance(now){
      if(!playing)return;
      const p=clamp((now-began)/duration),t=p*p*(3-2*p);
      scrollTo({top:mix(from,to,t),behavior:'instant'});render();
      if(p<1)playback=requestAnimationFrame(advance);
      else {stop('complete');render();if(location.hash!=='#work')history.pushState(null,'','#work');navigationHash=location.hash;const h=work.querySelector('h2');h.setAttribute('tabindex','-1');h.focus({preventScroll:true});}
    }
    playback=requestAnimationFrame(advance);
  });
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href^="#"]');
    if(!a||a===viewWork||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const hash=a.getAttribute('href');if(!targetFor(hash))return;
    event.preventDefault();touched=true;
    if(a.matches('.about-return-work')){returnToWork(hash);return;}
    navigate(hash,true,true,!!a.closest('.work-nav')&&work.classList.contains('portal-complete'));
  });
  function interrupt(event){touched=true;stop(event?.type||'input');}
  addEventListener('wheel',interrupt,{passive:true});
  addEventListener('touchstart',interrupt,{passive:true});
  addEventListener('pointerdown',interrupt,{passive:true});
  addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' ','Escape','Tab'].includes(e.key))interrupt();});
  addEventListener('scroll',schedule,{passive:true});
  document.addEventListener('visibilitychange',()=>{hero.classList.toggle('halo-hidden',document.hidden);if(document.hidden){stop();cancelAnimationFrame(frame);frame=0;}else{snapNext=true;schedule();}});
  new IntersectionObserver(entries=>{hero.classList.toggle('halo-offscreen',!entries[0].isIntersecting);},{threshold:0}).observe(hero);
  addEventListener('resize',resize,{passive:true});
  addEventListener('hashchange',()=>navigate(location.hash));
  addEventListener('popstate',()=>{if(location.hash!==navigationHash)navigate(location.hash);});
  addEventListener('pageshow',event=>{measure();if(!event.persisted&&!touched&&location.hash)navigate(location.hash);});
  reduced.addEventListener('change',()=>{
    const control=document.activeElement?.closest('.motion-preference');const before=control?.getBoundingClientRect().top;
    stop();measure();
    if(control){scrollBy({top:control.getBoundingClientRect().top-before,behavior:'instant'});render();}
    else if(location.hash)navigate(location.hash);
  });
  measure();
  if(location.hash)navigate(location.hash);
  // Font completion can recalibrate layout, but must never cancel a user's playback.
  document.fonts.ready.then(()=>{measure();if(!touched&&location.hash)navigate(location.hash);});
})();
