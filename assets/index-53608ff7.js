(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}})();const M="https://app.ticketmaster.com/discovery/v2/events.json",S="0WWL1P2bMiHay23k871w1SovwR8BsLG9";async function C(e=0,o=""){return await(await fetch(`${M}?apikey=${S}&size=20&countryCode=US&page=${e}&keyword=${o}`)).json()}let h=0,L=!1;function T(e){var r,p,u,y,w;const o=e.name||"Event Tour",a=(p=(r=e.dates)==null?void 0:r.start)==null?void 0:p.localDate,s=a?new Date(a).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}):"TBA",t=e.images&&e.images.length>0?e.images[0].url:"https://placeholder.com",n=e._embedded&&e._embedded.venues&&e._embedded.venues.length>0?e._embedded.venues[0].name:"Main Arena",d=e._embedded&&e._embedded.venues&&e._embedded.venues.length>0&&((u=e._embedded.venues[0].city)==null?void 0:u.name)||"US City",i=e.info||"Atlas Weekend is the largest music festival in Ukraine. More than 200 artists will create a proper music festival atmosphere on 10 stages.",l=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].currency:"UAH",v=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].min:"300",f=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].max:"500",g=e.priceRanges&&e.priceRanges.length>0?Math.round(e.priceRanges[0].min*2.5):"1000",c=e.priceRanges&&e.priceRanges.length>0?Math.round(e.priceRanges[0].max*3):"1500",m=`${v}-${f} ${l}`,_=`${g}-${c} ${l}`;return`
    <li class="events__item event-card" 
        data-name="${o}" 
        data-date="${a||"2026-06-22"}" 
        data-time="${((w=(y=e.dates)==null?void 0:y.start)==null?void 0:w.localTime)||"20:00:00"}"
        data-venue="${n}" 
        data-city="${d}" 
        data-image="${t}" 
        data-standard="${m}" 
        data-vip="${_}" 
        data-info="${i}">
        
      <div class="event-card__image-wrapper">
        <img src="${t}" alt="${o}" class="event-card__img" loading="lazy">
      </div>
      <div class="event-card__content">
        <h3 class="event-card__title">${o}</h3>
        <p class="event-card__date">${s}</p>
        <p class="event-card__location">
          <!-- ВИПРАВЛЕНО: Повний валідний лінк xmlns специфікації W3C для іконки -->
          <svg class="event-card__icon" xmlns="http://w3.org" viewBox="0 0 640 640">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
          </svg>
          <span class="event-card__location-text">${n}</span>
        </p>
      </div>
    </li>
  `}async function E(e,o=!1){const a=document.getElementById("events-grid")||document.querySelector(".events__grid"),s=document.querySelector(".events__button");if(a&&!L){try{L=!0,s&&(s.textContent="Loading...");const t=await C(e);if(t&&t._embedded&&t._embedded.events){const n=t._embedded.events;let d="";n.forEach(i=>{d+=T(i)}),o?a.insertAdjacentHTML("beforeend",d):a.innerHTML=d,s&&(s.textContent="Load more")}else o&&s?s.style.display="none":o||(a.innerHTML='<p class="events__empty" style="color: white; text-align: center; font-size: 1.3rem; width: 100%; grid-column: 1/-1;">No active events found</p>')}catch(t){console.error("Render error:",t),s&&(s.textContent="Load more")}L=!1}}document.addEventListener("DOMContentLoaded",()=>{E(h,!1);const e=document.querySelector(".events__button");e&&e.addEventListener("click",()=>{h+=1,E(h,!0)})});window.isModalScriptAlreadyLoaded||(window.isModalScriptAlreadyLoaded=!0,document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("events-grid")||document.querySelector(".events__grid");e&&e.addEventListener("click",o=>{const a=o.target.closest(".events__item");if(!a||(o.preventDefault(),document.querySelector(".backdrop")))return;const{name:s,date:t,time:n,venue:d,city:i,image:l,standard:v,vip:f,info:g}=a.dataset,c=document.createElement("div");c.classList.add("backdrop"),c.innerHTML=`
          <div class="modal">
            <button class="modal__close-btn" type="button">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://w3.org">
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#4B4B4B"/>
              </svg>
            </button>

            <div class="modal__avatar-wrap">
              <img class="modal__avatar-img" src="${l}" alt="${s}" />
            </div>

          <div class="modal__container">
            <div class="modal__poster-wrap">
              <img class="modal__poster" src="${l}" alt="${s}" />
            </div>

              <div class="modal__content">
                <div class="modal__group modal__group--info">
                  <span class="modal__label">INFO</span>
                  <p class="modal__text modal__text--description">${g}</p>
                </div>

                <h2 class="modal__title">${s}</h2>

                <div class="modal__group">
                  <span class="modal__label">WHEN</span>
                  <p class="modal__text">${t}</p>
                  <p class="modal__subtext">${n?n.substring(0,5):"20:00"} (Local Time)</p>
                </div>

                <div class="modal__group">
                  <span class="modal__label">WHERE</span>
                  <p class="modal__text">${i}, Ukraine</p>
                  <p class="modal__subtext">${d}</p>
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
                      <span class="modal__price-info">Standart ${v}</span>
                    </p>
                    <button class="modal__btn" type="button">BUY TICKETS</button>
                  </div>

                  <div class="modal__price-row">
                    <p class="modal__text modal__text--price">
                      <span class="modal__barcode">║▌║█║▌│║</span>
                      <span class="modal__price-info">VIP ${f}</span>
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
        `,document.body.append(c);const m=()=>{c.remove(),document.removeEventListener("keydown",_)};c.querySelector(".modal__close-btn").addEventListener("click",r=>{r.stopPropagation(),m()}),c.addEventListener("click",r=>{r.target===c&&m()});function _(r){r.key==="Escape"&&m()}document.addEventListener("keydown",_)})}));const B="/f4ptoject/assets/logo-90450bbb.png";document.querySelector(".header__img").src=B;let b=0,x="",R=null;function k(e){var m,_,r,p,u;const o=e.name||"Event Tour",a=(_=(m=e.dates)==null?void 0:m.start)==null?void 0:_.localDate,s=a?new Date(a).toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"}):"Date TBA",t=e.images&&e.images.length>0?e.images[0].url:"https://placeholder.com",n=e._embedded&&e._embedded.venues&&e._embedded.venues.length>0?e._embedded.venues[0].name:"Main Arena",d=e._embedded&&e._embedded.venues&&e._embedded.venues.length>0&&((r=e._embedded.venues[0].city)==null?void 0:r.name)||"US City",i=e.info||"Atlas Weekend is the largest music festival in Ukraine. More than 200 artists will create a proper music festival atmosphere on 10 stages.",l=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].currency:"UAH",v=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].min:"300",f=e.priceRanges&&e.priceRanges.length>0?e.priceRanges[0].max:"500",g=e.priceRanges&&e.priceRanges.length>0?Math.round(e.priceRanges[0].min*2.5):"1000",c=e.priceRanges&&e.priceRanges.length>0?Math.round(e.priceRanges[0].max*3):"1500";return`
    <li class="events__item event-card" 
        data-name="${o}" 
        data-date="${a||"2021-06-09"}" 
        data-time="${((u=(p=e.dates)==null?void 0:p.start)==null?void 0:u.localTime)||"20:00:00"}"
        data-venue="${n}" 
        data-city="${d}" 
        data-image="${t}" 
        data-standard="${v}-${f} ${l}" 
        data-vip="${g}-${c} ${l}" 
        data-info="${i}">
      <div class="event-card__image-wrapper">
        <img src="${t}" alt="${o}" class="event-card__img" loading="lazy">
      </div>
      <div class="event-card__content">
        <h3 class="event-card__title">${o}</h3>
        <p class="event-card__date">${s}</p>
        <p class="event-card__location">
          <svg class="event-card__icon" xmlns="http://w3.org" viewBox="0 0 640 640">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
          </svg>
          <span class="event-card__location-text">${n}</span>
        </p>
      </div>
    </li>
  `}async function $(e=0,o=!1){try{const a=document.querySelector(".events__button"),s=await C(e,x),t=document.getElementById("events-grid");if(!t)return;if(o||(t.innerHTML=""),s&&s._embedded&&s._embedded.events){const n=s._embedded.events;let d="";n.forEach(i=>{d+=k(i)}),t.insertAdjacentHTML("beforeend",d),a&&(a.style.display="block")}else o||(t.innerHTML='<p class="events__empty" style="color: white; text-align: center; font-size: 1.5rem; width: 100%; grid-column: 1/-1;">No events found for your search request.</p>',a&&(a.style.display="none"))}catch(a){console.error("Fetch or Render error:",a)}}document.addEventListener("DOMContentLoaded",()=>{$(b,!1);const e=document.querySelector(".events__button");e&&e.addEventListener("click",()=>{b+=1,$(b,!0)});const o=document.querySelector(".form__search"),a=document.querySelector(".header__form");a&&a.addEventListener("submit",t=>t.preventDefault()),o&&o.addEventListener("input",t=>{clearTimeout(R),R=setTimeout(()=>{x=t.target.value.trim(),b=0,$(b,!1)},500)});const s=document.querySelector(".events__grid")||document.getElementById("events-grid");s&&s.addEventListener("click",t=>{const n=t.target.closest(".events__item");if(!n)return;t.preventDefault();const{name:d,date:i,time:l,venue:v,city:f,image:g,standard:c,vip:m,info:_}=n.dataset,r=document.createElement("div");r.classList.add("backdrop"),r.innerHTML=`
        <div class="modal">
          <button class="modal__close-btn" type="button">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://w3.org">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#4B4B4B"/>
            </svg>
          </button>
          <div class="modal__avatar-wrap"><img class="modal__avatar-img" src="${g}" alt="${d}" /></div>
          <div class="modal__container">
            <div class="modal__poster-wrap"><img class="modal__poster" src="${g}" alt="${d}" /></div>
            <div class="modal__content">
              <div class="modal__group modal__group--info"><span class="modal__label">INFO</span><p class="modal__text modal__text--description">${_}</p></div>
              <div class="modal__group"><span class="modal__label">WHEN</span><p class="modal__text">${i}</p><p class="modal__subtext">${l?l.substring(0,5):"20:00"} (Local Time)</p></div>
              <div class="modal__group"><span class="modal__label">WHERE</span><p class="modal__text">${f}, Ukraine</p><p class="modal__subtext">${v}</p></div>
              <div class="modal__group"><span class="modal__label">WHO</span><p class="modal__text">${d}</p></div>
              <div class="modal__group">
                <span class="modal__label">PRICES</span>
                <div class="modal__price-row"><p class="modal__text"><span class="modal__barcode">║▌║█║▌│║</span>Standart ${c}</p><button class="modal__btn" type="button">BUY TICKETS</button></div>
                <div class="modal__price-row"><p class="modal__text"><span class="modal__barcode">║▌║█║▌│║</span>VIP ${m}</p><button class="modal__btn" type="button">BUY TICKETS</button></div>
              </div>
            </div>
          </div>
          <div class="modal__author-wrap"><button class="modal__author-btn" type="button">MORE FROM THIS AUTHOR</button></div>
        </div>
      `,document.body.append(r);const p=()=>r.remove();r.querySelector(".modal__close-btn").addEventListener("click",p),r.addEventListener("click",u=>{u.target===r&&p()}),document.addEventListener("keydown",function u(y){y.key==="Escape"&&(p(),document.removeEventListener("keydown",u))})})});
