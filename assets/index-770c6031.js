(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const T="https://app.ticketmaster.com/discovery/v2/events.json",A="0WWL1P2bMiHay23k871w1SovwR8BsLG9";async function S(e=0,n=""){return await(await fetch(`${T}?apikey=${A}&size=20&countryCode=US&page=${e}&keyword=${n}`)).json()}let L=0,w=!1;function I(e){var f,v,h,y,b;const n=e.name||"Event Tour",a=(v=(f=e.dates)==null?void 0:f.start)==null?void 0:v.localDate,s=a?new Date(a).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}):"TBA",t=e.images&&e.images.length>0?e.images[0].url:"https://placeholder.com",r=e._embedded&&e._embedded.venues&&e._embedded.venues.length>0?e._embedded.venues[0].name:"Main Arena",o=e._embedded&&e._embedded.venues&&e._embedded.venues.length>0&&((h=e._embedded.venues[0].city)==null?void 0:h.name)||"US City",_=(e.info||"Atlas Weekend is the largest music festival in Ukraine. More than 200 artists will create a proper music festival atmosphere on 10 stages.").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),m=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].currency:"UAH",g=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].min:"300",c=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].max:"500",d=e.priceRanges&&e.priceRanges.length>0?Math.round(e.priceRanges[0].min*2.5):"1000",p=e.priceRanges&&e.priceRanges.length>0?Math.round(e.priceRanges[0].max*3):"1500",u=`${g}-${c} ${m}`,i=`${d}-${p} ${m}`;return`
    <li class="events__item event-card" 
        data-name="${n}" 
        data-date="${a||"2026-06-22"}" 
        data-time="${((b=(y=e.dates)==null?void 0:y.start)==null?void 0:b.localTime)||"20:00:00"}"
        data-venue="${r}" 
        data-city="${o}" 
        data-image="${t}" 
        data-standard="${u}" 
        data-vip="${i}" 
        data-info="${_}">
        
      <div class="event-card__image-wrapper">
        <img src="${t}" alt="${n}" class="event-card__img" loading="lazy">
      </div>
      <div class="event-card__content">
        <h3 class="event-card__title">${n}</h3>
        <p class="event-card__date">${s}</p>
        <p class="event-card__location">
          <!-- ВИПРАВЛЕНО: Повний валідний лінк специфікації W3C для іконки гео-мітки -->
          <svg class="event-card__icon" xmlns="http://w3.org" viewBox="0 0 640 640">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
          </svg>
          <span class="event-card__location-text">${r}</span>
        </p>
      </div>
    </li>
  `}async function C(e,n=!1){const a=document.getElementById("events-grid")||document.querySelector(".events__grid"),s=document.querySelector(".events__button");if(a&&!w)try{w=!0,s&&(s.textContent="Loading...");const t=await S(e);if(t&&t._embedded&&t._embedded.events){const r=t._embedded.events;let o="";r.forEach(l=>{o+=I(l)}),n?a.insertAdjacentHTML("beforeend",o):a.innerHTML=o,s&&(s.textContent="Load more")}else n&&s?s.style.display="none":n||(a.innerHTML='<p class="events__empty" style="color: white; text-align: center; font-size: 1.3rem; width: 100%; grid-column: 1/-1;">No active events found</p>')}catch(t){console.error("Render error:",t),s&&(s.textContent="Load more")}finally{w=!1}}document.addEventListener("DOMContentLoaded",()=>{C(L,!1);const e=document.querySelector(".events__button");e&&e.addEventListener("click",()=>{L+=1,C(L,!0)})});window.isModalScriptAlreadyLoaded||(window.isModalScriptAlreadyLoaded=!0,document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("events-grid")||document.querySelector(".events__grid");e&&e.addEventListener("click",n=>{const a=n.target.closest(".events__item");if(!a||(n.preventDefault(),document.querySelector(".backdrop")))return;const{name:s,date:t,time:r,venue:o,city:l,image:_,standard:m,vip:g}=a.dataset;let c=a.getAttribute("data-info");(!c||c==="undefined"||c.trim()==="")&&(c="Atlas Weekend is the largest music festival in Ukraine. More than 200 artists will create a proper music festival atmosphere on 10 stages.");const d=document.createElement("div");d.classList.add("backdrop"),d.innerHTML=`
          <div class="modal">
            <button class="modal__close-btn" type="button">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://w3.org">
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#4B4B4B"/>
              </svg>
            </button>

            <div class="modal__avatar-wrap">
              <img class="modal__avatar-img" src="${_}" alt="${s}" />
            </div>

            <div class="modal__container">
              <div class="modal__poster-wrap">
                <img class="modal__poster" src="${_}" alt="${s}" />
              </div>

              <div class="modal__content">
                <!-- Тепер блок INFO гарантовано отримає текст і повернеться на своє місце над заголовком -->
                <div class="modal__group modal__group--info">
                  <span class="modal__label">INFO</span>
                  <p class="modal__text modal__text--description">${c}</p>
                </div>

                <h2 class="modal__title">${s}</h2>

                <div class="modal__group">
                  <span class="modal__label">WHEN</span>
                  <p class="modal__text">${t}</p>
                  <p class="modal__subtext">${r?r.substring(0,5):"20:00"} (Local Time)</p>
                </div>

                <div class="modal__group">
                  <span class="modal__label">WHERE</span>
                  <p class="modal__text">${l}, Ukraine</p>
                  <p class="modal__subtext">${o}</p>
                </div>

                <div class="modal__group">
                  <span class="modal__label">WHO</span>
                  <p class="modal__text">${s}</p>
                </div>

                <div class="modal__group">
                  <span class="modal__label">PRICES</span>

                  <div class="modal__price-row">
                    <p class="modal__text modal__text--price">
                      <span class="modal__barcode">║▌║█║▌│║</span>
                      <span class="modal__price-info">Standart ${m}</span>
                    </p>
                    <button class="modal__btn" type="button">BUY TICKETS</button>
                  </div>

                  <div class="modal__price-row">
                    <p class="modal__text modal__text--price">
                      <span class="modal__barcode">║▌║█║▌│║</span>
                      <span class="modal__price-info">VIP ${g}</span>
                    </p>
                    <button class="modal__btn" type="button">BUY TICKETS</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal__author-wrap">
              <button class="modal__author-btn" type="button">
                MORE FROM THIS AUTHOR
              </button>
            </div>
          </div>
        `,document.body.append(d);const p=()=>{d.remove(),document.removeEventListener("keydown",u)};d.querySelector(".modal__close-btn").addEventListener("click",i=>{i.stopPropagation(),p()}),d.addEventListener("click",i=>{i.target===d&&p()});function u(i){i.key==="Escape"&&p()}document.addEventListener("keydown",u)})}));const B="/f4ptoject/assets/logo-90450bbb.png",M=document.querySelector(".header__img");M&&(M.src=B);let $=0,x="",E=null;function H(e){var f,v,h,y,b;const n=e.name||"Event Tour",a=(v=(f=e.dates)==null?void 0:f.start)==null?void 0:v.localDate,s=a?new Date(a).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}):"Date TBA",t=e.images&&e.images.length>0?e.images[0].url:"https://placeholder.com",r=e._embedded&&e._embedded.venues&&e._embedded.venues.length>0?e._embedded.venues[0].name:"Main Arena",o=e._embedded&&e._embedded.venues&&e._embedded.venues.length>0&&((h=e._embedded.venues[0].city)==null?void 0:h.name)||"US City",_=(e.info||"Atlas Weekend is the largest music festival in Ukraine. More than 200 artists will create a proper music festival atmosphere on 10 stages.").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),m=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].currency:"UAH",g=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].min:"300",c=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].max:"500",d=e.priceRanges&&e.priceRanges.length>0?Math.round(e.priceRanges[0].min*2.5):"1000",p=e.priceRanges&&e.priceRanges.length>0?Math.round(e.priceRanges[0].max*3):"1500",u=`${g}-${c} ${m}`,i=`${d}-${p} ${m}`;return`
    <li class="events__item event-card" 
        data-name="${n}" 
        data-date="${a||"2021-06-09"}" 
        data-time="${((b=(y=e.dates)==null?void 0:y.start)==null?void 0:b.localTime)||"20:00:00"}"
        data-venue="${r}" 
        data-city="${o}" 
        data-image="${t}" 
        data-standard="${u}" 
        data-vip="${i}" 
        data-info="${_}">
      <div class="event-card__image-wrapper">
        <img src="${t}" alt="${n}" class="event-card__img" loading="lazy">
      </div>
      <div class="event-card__content">
        <h3 class="event-card__title">${n}</h3>
        <p class="event-card__date">${s}</p>
        <p class="event-card__location">
          <svg class="event-card__icon" xmlns="http://w3.org" viewBox="0 0 640 640">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
          </svg>
          <span class="event-card__location-text">${r}</span>
        </p>
      </div>
    </li>
  `}async function R(e=0,n=!1){try{const a=document.querySelector(".events__button"),s=await S(e,x),t=document.getElementById("events-grid");if(!t)return;if(n||(t.innerHTML=""),s&&s._embedded&&s._embedded.events){const r=s._embedded.events;let o="";r.forEach(l=>{o+=H(l)}),t.insertAdjacentHTML("beforeend",o),a&&(a.style.display="block")}else n||(t.innerHTML='<p class="events__empty" style="color: white; text-align: center; font-size: 1.5rem; width: 100%; grid-column: 1/-1; font-family: sans-serif;">No events found for your search request.</p>',a&&(a.style.display="none"))}catch(a){console.error("Fetch or Render error:",a)}}document.addEventListener("DOMContentLoaded",()=>{R($,!1);const e=document.querySelector(".events__button");e&&e.addEventListener("click",()=>{$+=1,R($,!0)});const n=document.querySelector(".form__search"),a=document.querySelector(".header__form");a&&a.addEventListener("submit",s=>s.preventDefault()),n&&n.addEventListener("input",s=>{clearTimeout(E),E=setTimeout(()=>{x=s.target.value.trim(),$=0,R($,!1)},500)})});
