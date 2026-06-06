(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const u="/f4ptoject/assets/logo-90450bbb.png";document.querySelector(".header__img").src=u;const v=document.querySelector("");v.addEventListener("click",i=>{const s=i.target.closest(".events__item");if(!s)return;const{name:o,date:d,venue:e,city:t,image:l,standard:_,info:p}=s.dataset;let n=s.dataset.vip;(!n||n==="N/A")&&(n=Number(_)*2);const a=document.createElement("div");a.classList.add("backdrop"),a.innerHTML=`
    <div class="modal">
      <button class="modal__close-btn" type="button">×</button>

      <div class="modal__avatar-wrap">
        <img class="modal__avatar-img" src="${l}" alt="${o}" />
      </div>

      <div class="modal__container">
        <div class="modal__poster-wrap">
          <img class="modal__poster" src="${l}" alt="${o}" />
        </div>

        <div class="modal__content">
          <div class="modal__group modal__group--info">
            <span class="modal__label">INFO</span>
            <p class="modal__text modal__text--description">${p}</p>
          </div>

          <h2 class="modal__title">${o}</h2>

          <div class="modal__group">
            <span class="modal__label">WHEN</span>
            <p class="modal__text">${d}</p>
            <p class="modal__subtext">20:00 (Kyiv/Ukraine)</p>
          </div>

          <div class="modal__group">
            <span class="modal__label">WHERE</span>
            <p class="modal__text">${t}, ${e}</p>
          </div>

          <div class="modal__group">
            <span class="modal__label">WHO</span>
            <p class="modal__text">${o}</p>
          </div>

          <div class="modal__group">
            <span class="modal__label">PRICES</span>

            <div class="modal__price-row">
              <p class="modal__text">
                <span class="modal__barcode">║▌║█║▌│║</span>
                Standart ${_}
              </p>
              <button class="modal__btn" type="button">
                BUY TICKETS
              </button>
            </div>

            <div class="modal__price-row">
              <p class="modal__text">
                <span class="modal__barcode">║▌║█║▌│║</span>
                VIP ${n}
              </p>
              <button class="modal__btn" type="button">
                BUY TICKETS
              </button>
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
  `,document.body.append(a);const c=()=>a.remove();a.querySelector(".modal__close-btn").addEventListener("click",c),a.addEventListener("click",r=>{r.target===a&&c()}),document.addEventListener("keydown",function r(m){m.key==="Escape"&&(c(),document.removeEventListener("keydown",r))})});
