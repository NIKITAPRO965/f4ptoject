(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function d(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=d(t);fetch(t.href,e)}})();const p="/f4ptoject/assets/logo-90450bbb.png";document.querySelector(".header__img").src=p;const m=document.querySelector(".btn-open-modal");m.addEventListener("click",()=>{const o="TEST",a="20:00",d="Main Hall",n="Kyiv",t="https://via.placeholder.com/150",l="TEST INFO";let i=200;const s=document.createElement("div");s.classList.add("backdrop"),s.innerHTML=`
    <div class="modal">
      <button class="modal__close-btn" type="button">×</button>

      <div class="modal__avatar-wrap">
        <img class="modal__avatar-img" src="${t}" alt="${o}" />
      </div>

      <div class="modal__container">
        <div class="modal__poster-wrap">
          <img class="modal__poster" src="${t}" alt="${o}" />
        </div>

        <div class="modal__content">
          <div class="modal__group modal__group--info">
            <span class="modal__label">INFO</span>
            <p class="modal__text modal__text--description">${l}</p>
          </div>

          <h2 class="modal__title">${o}</h2>

          <div class="modal__group">
            <span class="modal__label">WHEN</span>
            <p class="modal__text">${a}</p>
            <p class="modal__subtext">20:00 (Kyiv/Ukraine)</p>
          </div>

          <div class="modal__group">
            <span class="modal__label">WHERE</span>
            <p class="modal__text">${n}, ${d}</p>
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
                Standart 100
              </p>
              <button class="modal__btn" type="button">
                BUY TICKETS
              </button>
            </div>

            <div class="modal__price-row">
              <p class="modal__text">
                <span class="modal__barcode">║▌║█║▌│║</span>
                VIP ${i}
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
  `,document.body.append(s);const c=()=>s.remove();s.querySelector(".modal__close-btn").addEventListener("click",c),s.addEventListener("click",r=>{r.target===s&&c()}),document.addEventListener("keydown",function r(_){_.key==="Escape"&&(c(),document.removeEventListener("keydown",r))})});
