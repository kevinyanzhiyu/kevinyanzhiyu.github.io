(() => {
  const bar=document.querySelector('.work-switch-bar');
  if(!bar)return;
  const links=[...bar.querySelectorAll('a')];
  const nav=bar.querySelector('.work-nav');
  const liquid=window.PortfolioLiquidSwitch(nav);
  const reduced=window.PortfolioMotion.media;
  const sections=links.map(link=>document.querySelector(link.getAttribute('href')));
  const toolbar=document.querySelector('#ui-craft .gallery-toolbar');
  let frame=0,current=-1,pending=-1,pendingUntil=0;
  function select(index,animate=true){
    const button=links[index];
    links.forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
    current=index;
    liquid.move(button,animate);
  }
  function update(){
    frame=0;
    // Measure the sticky slot, not the moving bar, to avoid feedback jitter.
    const top=parseFloat(getComputedStyle(bar).top)||12;
    const bottom=top+bar.offsetHeight;
    const toolbarTop=toolbar.getBoundingClientRect().top;
    const raw=Math.max(0,Math.min(1,(bottom+14-toolbarTop)/(bar.offsetHeight+14)));
    const push=reduced.matches?(toolbarTop<=top+1?1:0):raw*raw*(3-2*raw);
    bar.style.setProperty('--switch-lift',`${-push*(bar.offsetHeight+top+10)}px`);
    bar.style.setProperty('--switch-remaining',String(1-push));
    bar.inert=push>=.99;
    toolbar.classList.toggle('is-taking-over',push>.01);
    const line=bottom+48;
    let active=0;
    sections.forEach((section,index)=>{if(section.getBoundingClientRect().top<=line)active=index;});
    if(pending>=0){
      // While scrolling down, the arrival tolerance is reached before the
      // next section crosses the scroll-spy line. Releasing here used to
      // select the previous tab for a frame, then animate right a second time.
      const target=pending;
      const arrived=active===target&&Math.abs(sections[target].getBoundingClientRect().top-(bottom+24))<40;
      active=target;
      if(arrived||performance.now()>pendingUntil)pending=-1;
    }
    if(active!==current)select(active);
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(update);}
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{select(Math.max(current,0),false);schedule();},{passive:true});
  nav.addEventListener('click',event=>{
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const index=links.indexOf(event.target.closest('a'));if(index<0)return;
    pending=index;pendingUntil=performance.now()+1400;
    if(index!==current)select(index);
  });
  addEventListener('wheel',()=>{pending=-1;schedule();},{passive:true});
  addEventListener('touchstart',()=>{pending=-1;schedule();},{passive:true});
  reduced.addEventListener('change',()=>{select(Math.max(current,0),false);schedule();});
  document.fonts.ready.then(()=>select(Math.max(current,0),false));
  document.querySelector('#work').addEventListener('portfolio:ready',schedule);
  update();
})();
