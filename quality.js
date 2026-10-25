// Opt-in, DOM-readable QA measurements. No telemetry is transmitted anywhere.
(() => {
 const enabled=new URLSearchParams(location.search).has('qa');const records=[];
 const output=enabled?document.createElement('output'):null;if(output){output.id='quality-report';output.hidden=true;document.body.append(output);}
 const publish=()=>{if(output)output.textContent=JSON.stringify(records.slice(-100));};
 function log(name,data={}){if(!enabled)return;records.push({name,time:Math.round(performance.now()),...data});publish();}
 function begin(name){const at=performance.now();log(`${name}:start`);return detail=>log(name,{ms:Math.round((performance.now()-at)*10)/10,...detail});}
 function frames(name,duration=850){if(!enabled)return;const values=[];let prev=0;const start=performance.now();requestAnimationFrame(function sample(now){if(document.hidden)return;if(prev)values.push(now-prev);prev=now;if(now-start<duration)requestAnimationFrame(sample);else{const sorted=[...values].sort((a,b)=>a-b);log(`${name}:frames`,{samples:values.length,p95:Math.round((sorted[Math.floor(sorted.length*.95)]||0)*10)/10,max:Math.round((sorted.at(-1)||0)*10)/10});}});}
 window.PortfolioQuality={log,begin,frames};
 if(enabled&&'PerformanceObserver'in window){try{new PerformanceObserver(list=>list.getEntries().forEach(e=>log('long-task',{ms:Math.round(e.duration),start:Math.round(e.startTime)}))).observe({type:'longtask',buffered:true});}catch{}}
})();
