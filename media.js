(() => {
 function fallback(image){if(image.dataset.failed)return;image.dataset.failed='true';const holder=image.closest('.cover-art,.case-banner-art,.case-overview-media,.case-screen-image,.shelter-screen-image,.comparison-frame,.gallery-card-media,.gallery-standard-image,.gallery-viewer-stage,.comparison-viewer-stage');if(!holder)return;holder.classList.add('media-failed');const note=document.createElement('span');note.className='media-error';note.textContent='图片暂时无法加载';holder.append(note);window.PortfolioQuality.log('media-error',{src:image.getAttribute('src')});}
 document.addEventListener('error',e=>{if(e.target.tagName==='IMG')fallback(e.target);},true);
 document.addEventListener('load',e=>{const img=e.target;if(img.tagName!=='IMG'||!img.dataset.failed)return;img.removeAttribute('data-failed');const holder=img.closest('.media-failed');if(holder&&!holder.querySelector('img[data-failed]')){holder.classList.remove('media-failed');holder.querySelector('.media-error')?.remove();}},true);
 function observe(root=document){root.querySelectorAll('img').forEach(img=>{img.decoding='async';if(img.complete&&img.getAttribute('src')&&!img.naturalWidth)fallback(img);});}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());});
 window.PortfolioMedia={observe};observe();
})();
