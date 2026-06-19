
if (!window.isModalScriptAlreadyLoaded) {
  window.isModalScriptAlreadyLoaded = true;

  document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('events-grid') || document.querySelector('.events__grid');
    
    if (gridContainer) {
      gridContainer.addEventListener("click", (e) => {
        const item = e.target.closest(".events__item");
        if (!item) return;

        e.preventDefault();

        if (document.querySelector('.backdrop')) return;

        const { name, date, time, venue, city, image, standard, vip, info } = item.dataset;
        const backdrop = document.createElement("div");
        backdrop.classList.add("backdrop");

        backdrop.innerHTML = `
          <div class="modal">
            <button class="modal__close-btn" type="button">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://w3.org">
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#4B4B4B"/>
              </svg>
            </button>

            <div class="modal__avatar-wrap">
              <img class="modal__avatar-img" src="${image}" alt="${name}" />
            </div>

          <div class="modal__container">
            <div class="modal__poster-wrap">
              <img class="modal__poster" src="${image}" alt="${name}" />
            </div>

              <div class="modal__content">
                <div class="modal__group modal__group--info">
                  <span class="modal__label">INFO</span>
                  <p class="modal__text modal__text--description">${info}</p>
                </div>

                <h2 class="modal__title">${name}</h2>

                <div class="modal__group">
                  <span class="modal__label">WHEN</span>
                  <p class="modal__text">${date}</p>
                  <p class="modal__subtext">${time ? time.substring(0, 5) : '20:00'} (Local Time)</p>
                </div>

                <div class="modal__group">
                  <span class="modal__label">WHERE</span>
                  <p class="modal__text">${city}, Ukraine</p>
                  <p class="modal__subtext">${venue}</p>
                </div>

                <div class="modal__group">
                  <span class="modal__label">WHO</span>
                  <p class="modal__text">${name}</p>
                </div>

                <div class="modal__group">
                  <span class="modal__label">PRICES</span>

                  <div class="modal__price-row">
                    <p class="modal__text modal__text--price">
                      <span class="modal__barcode">║▌║█║▌│║</span>
                      <span class="modal__price-info">Standart ${standard}</span>
                    </p>
                    <button class="modal__btn" type="button">BUY TICKETS</button>
                  </div>

                  <div class="modal__price-row">
                    <p class="modal__text modal__text--price">
                      <span class="modal__barcode">║▌║█║▌│║</span>
                      <span class="modal__price-info">VIP ${vip}</span>
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
        `;

        document.body.append(backdrop);

        const closeModal = () => {
          backdrop.remove();
          document.removeEventListener("keydown", escClose);
        };

        backdrop.querySelector(".modal__close-btn").addEventListener("click", (evt) => {
          evt.stopPropagation();
          closeModal();
        });

        backdrop.addEventListener("click", (evt) => {
          if (evt.target === backdrop) closeModal();
        });
        
        function escClose(evt) {
          if (evt.key === "Escape") closeModal();
        }
        document.addEventListener("keydown", escClose);
      });
    }
  });
}

