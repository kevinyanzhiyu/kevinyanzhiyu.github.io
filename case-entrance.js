window.CaseEntrance=(()=>{
  const states=new WeakMap(),reduced=window.PortfolioMotion.media;
  const rows='.case-overview-copy > :not(.case-facts), .case-facts > div, .case-overview-media, .case-story-head > *, .case-design-notes > article, .case-flow > div, .case-decisions > article, .editor-workflow > header, .editor-map > article, .editor-workflow > footer, .case-video-head, .case-video-frame, .case-key-head > *, .key-screen-row, .case-screen-card, .shelter-screen-card, .comparison-pair';
  function clear(dialog){
    const s=states.get(dialog);if(!s)return;
    s.observer?.disconnect();s.animations.forEach(a=>a.cancel());
    dialog.querySelectorAll('.case-entry-pending').forEach(el=>el.classList.remove('case-entry-pending'));
    dialog.classList.remove('case-sequenced');states.delete(dialog);
  }
  function reveal(s,el,delay=0){
    el.classList.remove('case-entry-pending');s.observer?.unobserve(el);
    if(reduced.matches)return;
    const a=el.animate([{opacity:0,transform:'translate3d(0,22px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:540,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
    s.animations.add(a);a.finished.then(()=>s.animations.delete(a),()=>s.animations.delete(a));
  }
  function refresh(dialog){
    const s=states.get(dialog);if(!s||reduced.matches)return;
    dialog.querySelectorAll(rows).forEach(el=>{
      if(s.seen.has(el)||el.closest('[hidden]'))return;
      s.seen.add(el);el.classList.add('case-entry-pending');
      if(s.started)s.observer.observe(el);
    });
  }
  function prepare(dialog){
    clear(dialog);if(reduced.matches||!window.IntersectionObserver)return;
    const s={seen:new Set(),animations:new Set(),started:false,observer:null};states.set(dialog,s);
    dialog.classList.add('case-sequenced');
    dialog.querySelectorAll('.case-banner-copy > *').forEach(el=>el.classList.add('case-entry-pending'));
    refresh(dialog);
  }
  function start(dialog){
    const s=states.get(dialog);if(!s||reduced.matches)return;
    s.started=true;
    s.observer=new IntersectionObserver(entries=>{
      entries.filter(e=>e.isIntersecting).forEach((entry,index)=>reveal(s,entry.target,Math.min(index,2)*65));
    },{root:dialog,rootMargin:'0px 0px -4% 0px',threshold:.06});
    dialog.querySelectorAll('.case-banner-copy > *').forEach((el,i)=>reveal(s,el,i*70));
    s.seen.forEach(el=>{if(el.isConnected)s.observer.observe(el);});
  }
  reduced.addEventListener('change',()=>{if(reduced.matches)document.querySelectorAll('.case-dialog').forEach(clear);});
  document.addEventListener('close',event=>{if(event.target.matches?.('.case-dialog'))clear(event.target);},true);
  return {prepare,start,refresh,clear};
})();
