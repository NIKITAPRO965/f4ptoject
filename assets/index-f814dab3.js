(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=a(e);fetch(e.href,n)}})();const u="https://app.ticketmaster.com/discovery/v2/events.json",f="0WWL1P2bMiHay23k871w1SovwR8BsLG9";async function m(t=0,s=""){return await(await fetch(`${u}?apikey=${f}&size=20&countryCode=US&page=${t}&keyword=${s}`)).json()}let i=0,d=!1;function p(t){var o,c;const s=t.name||"Event Tour",a=t.images&&t.images.length>0?t.images[0].url:"https://placeholder.com",r=t._embedded&&t._embedded.venues&&t._embedded.venues.length>0?t._embedded.venues[0].name:"Main Arena",e=(c=(o=t.dates)==null?void 0:o.start)==null?void 0:c.localDate,n=e?new Date(e).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}):"TBA";return`
    <article class="event-card">
      <div class="event-card__image-wrapper">
        <img src="${a}" alt="${s}" class="event-card__img" loading="lazy">
      </div>
      <div class="event-card__content">
        <h3 class="event-card__title">${s}</h3>
        <p class="event-card__date">${n}</p>
        <p class="event-card__location">
          <svg class="event-card__icon" xmlns="http://w3.org" viewBox="0 0 640 640">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
          </svg>
          <span class="event-card__location-text">${r}</span>
        </p>
      </div>
    </article>
  `}async function l(t,s=!1){const a=document.getElementById("events-grid"),r=document.querySelector(".events__button");if(a&&!d)try{d=!0,r&&(r.textContent="Loading...");const e=await m(t);if(e&&e._embedded&&e._embedded.events){const n=e._embedded.events;let o="";n.forEach(c=>{o+=p(c)}),s?a.insertAdjacentHTML("beforeend",o):a.innerHTML=o,r&&(r.textContent="Load more")}else s&&r?r.style.display="none":s||(a.innerHTML='<p class="events__empty">No active events found</p>')}catch(e){console.error("Render error:",e),r&&(r.textContent="Load more")}finally{d=!1}}document.addEventListener("DOMContentLoaded",()=>{l(i,!1);const t=document.querySelector(".events__button");t&&t.addEventListener("click",()=>{i+=1,l(i,!0)})});
