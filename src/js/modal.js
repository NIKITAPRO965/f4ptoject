const eventsList = document.querySelector("");

eventsList.addEventListener("click", (e) => {
  const item = e.target.closest(".events__item");
  if (!item) return;

  const { name, date, venue, city, image, standard, info } = item.dataset;
  let vip = item.dataset.vip;

  if (!vip || vip === "N/A") {
    vip = Number(standard) * 2;
  }

  const backdrop = document.createElement("div");
  backdrop.classList.add("backdrop");

  backdrop.innerHTML = `
    <div class="modal">
      <button class="modal__close-btn" type="button">×</button>

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
            <p class="modal__subtext">20:00 (Kyiv/Ukraine)</p>
          </div>

          <div class="modal__group">
            <span class="modal__label">WHERE</span>
            <p class="modal__text">${city}, ${venue}</p>
          </div>

          <div class="modal__group">
            <span class="modal__label">WHO</span>
            <p class="modal__text">${name}</p>
          </div>

          <div class="modal__group">
            <span class="modal__label">PRICES</span>

            <div class="modal__price-row">
              <p class="modal__text">
                <span class="modal__barcode">║▌║█║▌│║</span>
                Standart ${standard}
              </p>
              <button class="modal__btn" type="button">
                BUY TICKETS
              </button>
            </div>

            <div class="modal__price-row">
              <p class="modal__text">
                <span class="modal__barcode">║▌║█║▌│║</span>
                VIP ${vip}
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
  `;

  document.body.append(backdrop);

  const closeModal = () => backdrop.remove();

  backdrop.querySelector(".modal__close-btn").addEventListener("click", closeModal);

  backdrop.addEventListener("click", e => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", esc);
      }
    }
  );
});