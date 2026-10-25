// One effective preference for CSS, portals, dialogs, gallery and pointer feedback.
(() => {
 const system=matchMedia('(prefers-reduced-motion:reduce)');const events=new EventTarget();
 let choice='system';try{choice=localStorage.getItem('portfolio-motion')||'system';}catch{}
 const media={get matches(){return choice==='reduce'||system.matches;},addEventListener:(...a)=>events.addEventListener(...a),removeEventListener:(...a)=>events.removeEventListener(...a)};
 function apply(){document.documentElement.dataset.motion=media.matches?'reduce':'full';events.dispatchEvent(new Event('change'));}
 function set(value){choice=value==='reduce'?'reduce':'system';try{localStorage.setItem('portfolio-motion',choice);}catch{}apply();}
 window.PortfolioMotion={media,set,get choice(){return choice;}};system.addEventListener('change',apply);apply();
 addEventListener('DOMContentLoaded',()=>{const footer=document.querySelector('.about-footer');const label=document.createElement('label');label.className='motion-preference';label.innerHTML='动态效果 <select aria-label="动态效果"><option value="system">跟随系统</option><option value="reduce">减少动态效果</option></select>';const select=label.querySelector('select');select.value=choice;select.addEventListener('change',()=>set(select.value));footer.append(label);});
})();
