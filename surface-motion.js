// Shared project covers use fixed geometry and compositor transforms, never animated width/height.
window.SurfaceMotion=(()=>{
 const states=new WeakMap();const reduced=window.PortfolioMotion.media;
 const duration=()=>matchMedia('(max-width:760px)').matches?220:300;
 function state(dialog){if(!states.has(dialog)){
  states.set(dialog,{revision:0,origin:null,flight:null,veil:null,animations:[],animation:null,closing:false,changed:false});
  const interrupt=()=>{if(dialog.dataset.transition==='opening'){const s=states.get(dialog);++s.revision;clean(dialog);dialog.dataset.transition='ready';}};
  dialog.addEventListener('wheel',interrupt,{passive:true});dialog.addEventListener('touchstart',interrupt,{passive:true});
 }return states.get(dialog);}
 function clean(dialog){const s=state(dialog);s.animation?.cancel();s.animations.forEach(a=>a.cancel());s.animations=[];s.animation=null;s.flight?.remove();s.veil?.remove();s.flight=null;s.veil=null;if(s.hiddenSource){s.hiddenSource.style.visibility=s.previousVisibility;s.hiddenSource=null;}dialog.classList.remove('surface-revealing','surface-shared');}
 function visible(r){return r?.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;}
 function shared(dialog,source,from,to,closing=false){
  const s=state(dialog),img=source?.matches('img')?source:source?.querySelector('img');
  if(!img?.complete||!img.naturalWidth||!visible(from)||!visible(to))return false;
  const ms=matchMedia('(max-width:760px)').matches?460:620,ease='cubic-bezier(.22,.75,.2,1)';
  const layer=document.createElement('div');layer.className='project-cover-flight';layer.setAttribute('aria-hidden','true');layer.inert=true;
  Object.assign(layer.style,{left:`${to.left}px`,top:`${to.top}px`,width:`${to.width}px`,height:`${to.height}px`});
  const copy=document.createElement('img');copy.alt='';copy.src=img.currentSrc||img.src;copy.decoding='async';
  const finalFit=Math.max(to.width/img.naturalWidth,to.height/img.naturalHeight);
  const initialFit=Math.max(from.width/img.naturalWidth,from.height/img.naturalHeight);
  copy.style.width=`${img.naturalWidth*finalFit}px`;copy.style.height=`${img.naturalHeight*finalFit}px`;layer.append(copy);
  const veil=document.createElement('div');veil.className='project-cover-veil';veil.setAttribute('aria-hidden','true');veil.inert=true;
  dialog.classList.add('surface-shared');dialog.append(veil,layer);s.flight=layer;s.veil=veil;
  if(!closing&&s.origin){s.hiddenSource=s.origin;s.previousVisibility=s.origin.style.visibility;s.origin.style.visibility='hidden';}
  const sx=from.width/to.width,sy=from.height/to.height,dx=from.left+from.width/2-to.left-to.width/2,dy=from.top+from.height/2-to.top-to.height/2;
  const outer=[],inner=[];
  // Counter-scale the intrinsic-ratio image: the moving crop changes shape,
  // but its pixels retain the same horizontal/vertical scale throughout.
  for(let i=0;i<=48;i++){
   const t=i/48,x=sx+(1-sx)*t,y=sy+(1-sy)*t,k=initialFit/finalFit+(1-initialFit/finalFit)*t;
   const radius=closing?18*t:18*(1-t);
   outer.push({offset:t*.78,transform:`translate3d(${dx*(1-t)}px,${dy*(1-t)}px,0) scale(${x},${y})`,clipPath:`inset(0 round ${radius/x}px / ${radius/y}px)`});
   inner.push({offset:t*.78,transform:`translate(-50%,-50%) scale(${k/x},${k/y})`});
  }
  outer.push({...outer.at(-1),offset:1});inner.push({...inner.at(-1),offset:1});
  const track=(el,frames)=>{const a=el.animate(frames,{duration:ms,easing:ease,fill:'both'});s.animations.push(a);return a;};
  s.animation=track(layer,outer);track(copy,inner);
  // The flight becomes invisible on the compositor timeline itself. It cannot
  // leave a frozen giant cover visible while awaiting a JS cleanup callback.
  track(layer,[{opacity:1,offset:0},{opacity:1,offset:.86},{opacity:0,offset:1}]);
  track(veil,closing?[{opacity:1},{opacity:0}]:[{opacity:0},{opacity:1,offset:.62},{opacity:1}]);
  dialog.querySelectorAll(':scope>.case-shell,:scope>.case-nav').forEach(el=>track(el,closing?[{opacity:1},{opacity:0,offset:.28},{opacity:0}]:[{opacity:0},{opacity:0,offset:.42},{opacity:1,offset:.92},{opacity:1}]));
  if(!closing){
   const art=dialog.querySelector('.case-banner-art'),copyText=dialog.querySelector('.case-banner-copy');
   if(art)track(art,[{opacity:0},{opacity:0,offset:.78},{opacity:1,offset:.8},{opacity:1}]);
   if(copyText)track(copyText,[{opacity:0},{opacity:0,offset:.78},{opacity:1}]);
  }
  window.PortfolioQuality.log(closing?'shared-project-close':'shared-project-open',{ms});return true;
 }
 async function open(dialog,source,target,options={}){
  const s=state(dialog);if(s.closing)return false;
  ++s.revision;clean(dialog);const ticket=s.revision;
  const fresh=!dialog.open;
  const from=source?.getBoundingClientRect();
  if(fresh){s.origin=source;s.changed=false;s.scroll=scrollY;}else s.changed=true;
  if(!dialog.open)dialog.showModal();dialog.scrollTo({top:0,behavior:'instant'});document.body.classList.add('dialog-open');
  dialog.dataset.transition='opening';
  const finish=window.PortfolioQuality.begin(fresh?'dialog-open':'dialog-switch');window.PortfolioQuality.frames(fresh?'dialog-open':'dialog-switch');
  if(!reduced.matches&&fresh&&dialog.matches('.case-dialog')&&shared(dialog,source,from,target.getBoundingClientRect())){
   await s.animation.finished.catch(()=>{});
  }else if(!reduced.matches){
   dialog.classList.add('surface-revealing');
   s.animation=dialog.animate([{opacity:0,transform:`translate3d(0,${fresh?20:8}px,0)`},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:fresh?duration():180,easing:'cubic-bezier(.2,.75,.25,1)',fill:'both'});
   await s.animation.finished.catch(()=>{});
  }
  if(ticket!==s.revision)return false;clean(dialog);dialog.dataset.transition='ready';if(fresh&&(document.activeElement===dialog||!dialog.contains(document.activeElement)))dialog.querySelector('button')?.focus({preventScroll:true});finish();return true;
 }
 async function close(dialog,target){
  const s=state(dialog);if(!dialog.open||s.closing)return;
  const interrupted=dialog.dataset.transition==='opening';
  s.closing=true;++s.revision;clean(dialog);const ticket=s.revision;dialog.dataset.transition='closing';
  if(!reduced.matches&&!interrupted&&!s.changed&&dialog.matches('.case-dialog')&&shared(dialog,target,target?.getBoundingClientRect(),s.origin?.getBoundingClientRect(),true)){
   await s.animation.finished.catch(()=>{});
  }else if(!reduced.matches&&!interrupted){s.animation=dialog.animate([{opacity:1,transform:'translate3d(0,0,0)'},{opacity:0,transform:'translate3d(0,12px,0)'}],{duration:160,easing:'ease-in'});await s.animation.finished.catch(()=>{});}
  if(ticket!==s.revision)return;
  clean(dialog);dialog.close();s.closing=false;dialog.dataset.transition='closed';scrollTo({top:s.scroll||0,behavior:'instant'});
  s.origin?.closest('button')?.focus({preventScroll:true});
 }
 function cancelAll(){document.querySelectorAll('dialog[open]').forEach(d=>{const s=state(d);++s.revision;const closing=s.closing;clean(d);s.closing=false;if(closing){d.close();d.dataset.transition='closed';scrollTo({top:s.scroll||0,behavior:'instant'});s.origin?.closest('button')?.focus({preventScroll:true});}else d.dataset.transition='ready';});}
 addEventListener('resize',cancelAll,{passive:true});reduced.addEventListener('change',cancelAll);
 document.addEventListener('close',event=>{if(event.target.tagName!=='DIALOG')return;const s=state(event.target);++s.revision;clean(event.target);s.closing=false;event.target.dataset.transition='closed';if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open');},true);
 return {open,close,ready:async dialog=>{await state(dialog).animation?.finished.catch(()=>{});},changed:dialog=>{state(dialog).changed=true;},get closing(){return !!document.querySelector('dialog[data-transition="closing"]');}};
})();

// History entries represent actual dialogs; direct links close locally instead of leaving the site.
window.DialogRoute=(key,open,close)=>{
 let active=null,pending=false;
 const read=()=>new URL(location.href).searchParams.get(key);
 function url(id){const u=new URL(location.href);if(id)u.searchParams.set(key,id);else u.searchParams.delete(key);return u;}
 const route={
  enter(id){pending=false;if(read()===id){active=id;return;}const replacing=Boolean(active);active=id;history[replacing?'replaceState':'pushState']({...history.state,portfolioDialog:key},'',url(id));},
  close(){if(pending)return;pending=true;if(!active){pending=false;close();return;}if(history.state?.portfolioDialog===key&&read())history.back();else{history.replaceState(history.state,'',url(null));active=null;pending=false;close();}},
  clear(){active=null;pending=false;},get closing(){return pending;}
 };
 addEventListener('popstate',()=>{pending=false;const id=read();if(id){if(id!==active){active=id;open(id);}}else if(active){active=null;close();}});
 addEventListener('DOMContentLoaded',()=>{const id=read();if(id){active=id;requestAnimationFrame(()=>open(id));}});
 return route;
};
