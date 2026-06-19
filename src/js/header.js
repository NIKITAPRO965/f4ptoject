import logo from '../img/logo.png';
document.querySelector('.header__img').src = logo;

import { getEvents } from './api.js';

// Глобальні змінні для збереження стану пошуку та сторінок
let currentPage = 0;
let currentKeyword = ''; // Тут зберігається текст, який ввів користувач
let debounceTimeout = null;

// Функція для створення HTML однієї картки-лішки (<li>)
function createCardHtml(event) {
  const title = event.name || 'Event Tour';
  const rawDate = event.dates?.start?.localDate;
  const formattedDate = rawDate 
    ? new Date(rawDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Date TBA';

  const imageUrl = event.images && event.images.length > 0 ? event.images[0].url : 'https://placeholder.com';
  const location = event._embedded && event._embedded.venues && event._embedded.venues.length > 0 ? event._embedded.venues[0].name : 'Main Arena';
  const city = event._embedded && event._embedded.venues && event._embedded.venues.length > 0 ? event._embedded.venues[0].city?.name || 'US City' : 'US City';

  const info = event.info || 'Atlas Weekend is the largest music festival in Ukraine. More than 200 artists will create a proper music festival atmosphere on 10 stages.';
  const currency = event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].currency : 'UAH';
  const standardMin = event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].min : '300';
  const standardMax = event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].max : '500';
  const vipMin = event.priceRanges && event.priceRanges.length > 0 ? Math.round(event.priceRanges[0].min * 2.5) : '1000';
  const vipMax = event.priceRanges && event.priceRanges.length > 0 ? Math.round(event.priceRanges[0].max * 3) : '1500';

  return `
    <li class="events__item event-card" 
        data-name="${title}" 
        data-date="${rawDate || '2021-06-09'}" 
        data-time="${event.dates?.start?.localTime || '20:00:00'}"
        data-venue="${location}" 
        data-city="${city}" 
        data-image="${imageUrl}" 
        data-standard="${standardMin}-${standardMax} ${currency}" 
        data-vip="${vipMin}-${vipMax} ${currency}" 
        data-info="${info}">
      <div class="event-card__image-wrapper">
        <img src="${imageUrl}" alt="${title}" class="event-card__img" loading="lazy">
      </div>
      <div class="event-card__content">
        <h3 class="event-card__title">${title}</h3>
        <p class="event-card__date">${formattedDate}</p>
        <p class="event-card__location">
          <svg class="event-card__icon" xmlns="http://w3.org" viewBox="0 0 640 640">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
          </svg>
          <span class="event-card__location-text">${location}</span>
        </p>
      </div>
    </li>
  `;
}

// Головна функція рендеру (тепер вміє передавати keyword на сервер)
async function fetchAndRenderLiveEvents(page = 0, isLoadMore = false) {
  try {
    const loadMoreBtn = document.querySelector('.events__button');
    // Відправляємо у ваш api.js поточну сторінку та поточний текст пошуку
    const data = await getEvents(page, currentKeyword);
    
    const gridContainer = document.getElementById('events-grid');
    if (!gridContainer) return;

    if (!isLoadMore) {
      gridContainer.innerHTML = ''; // Очищаємо екран для нових результатів пошуку
    }

    if (data && data._embedded && data._embedded.events) {
      const realEvents = data._embedded.events;
      let newCardsHtml = '';

      realEvents.forEach(event => {
        newCardsHtml += createCardHtml(event);
      });

      gridContainer.insertAdjacentHTML('beforeend', newCardsHtml);
      if (loadMoreBtn) loadMoreBtn.style.display = 'block'; // Показуємо кнопку назад, якщо є контент
    } else {
      // Якщо нічого не знайдено
      if (!isLoadMore) {
        gridContainer.innerHTML = '<p class="events__empty" style="color: white; text-align: center; font-size: 1.5rem; width: 100%; grid-column: 1/-1;">No events found for your search request.</p>';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none'; // Ховаємо "Load more", бо довантажувати нічого
      }
    }
  } catch (error) {
    console.error('Fetch or Render error:', error);
  }
}

// Ініціалізація та слухачі подій
document.addEventListener('DOMContentLoaded', () => {
  // 1. Перший запуск сайту (пусті результати)
  fetchAndRenderLiveEvents(currentPage, false);

  // 2. Логіка роботи кнопки "Load more"
  const loadMoreBtn = document.querySelector('.events__button');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentPage += 1;
      fetchAndRenderLiveEvents(currentPage, true);
    });
  }

  // 4. ЖИВИЙ ПОШУК ЧЕРЕЗ ІНПУТ В ШАПЦІ
  const searchInput = document.querySelector('.form__search');
  const searchForm = document.querySelector('.header__form');

  // Скасовуємо перезавантаження сторінки при випадковому натисканні Enter на формі
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => e.preventDefault());
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      // Очищаємо попередній таймер, якщо користувач продовжує швидко друкувати
      clearTimeout(debounceTimeout);

      // Запускаємо новий таймер на 500 мілісекунд (пів секунди затримки)
      debounceTimeout = setTimeout(() => {
        currentKeyword = e.target.value.trim(); // Зберігаємо те, що ввів користувач
        currentPage = 0; // Скидаємо сторінку на нуль для нового пошуку
        
        fetchAndRenderLiveEvents(currentPage, false); // Завантажуємо нові відфільтровані картки
      }, 500);
    });
  }

  // 3. Делегування подій на сітку для відкриття модалки
  const gridContainer = document.querySelector('.events__grid') || document.getElementById('events-grid');
  if (gridContainer) {
    gridContainer.addEventListener("click", (e) => {
      const item = e.target.closest(".events__item");
      if (!item) return;

      e.preventDefault();
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
          <div class="modal__avatar-wrap"><img class="modal__avatar-img" src="${image}" alt="${name}" /></div>
          <div class="modal__container">
            <div class="modal__poster-wrap"><img class="modal__poster" src="${image}" alt="${name}" /></div>
            <div class="modal__content">
              <div class="modal__group modal__group--info"><span class="modal__label">INFO</span><p class="modal__text modal__text--description">${info}</p></div>
              <div class="modal__group"><span class="modal__label">WHEN</span><p class="modal__text">${date}</p><p class="modal__subtext">${time ? time.substring(0, 5) : '20:00'} (Local Time)</p></div>
              <div class="modal__group"><span class="modal__label">WHERE</span><p class="modal__text">${city}, Ukraine</p><p class="modal__subtext">${venue}</p></div>
              <div class="modal__group"><span class="modal__label">WHO</span><p class="modal__text">${name}</p></div>
              <div class="modal__group">
                <span class="modal__label">PRICES</span>
                <div class="modal__price-row"><p class="modal__text"><span class="modal__barcode">║▌║█║▌│║</span>Standart ${standard}</p><button class="modal__btn" type="button">BUY TICKETS</button></div>
                <div class="modal__price-row"><p class="modal__text"><span class="modal__barcode">║▌║█║▌│║</span>VIP ${vip}</p><button class="modal__btn" type="button">BUY TICKETS</button></div>
              </div>
            </div>
          </div>
          <div class="modal__author-wrap"><button class="modal__author-btn" type="button">MORE FROM THIS AUTHOR</button></div>
        </div>
      `;

      document.body.append(backdrop);
      const closeModal = () => backdrop.remove();
      backdrop.querySelector(".modal__close-btn").addEventListener("click", closeModal);
      backdrop.addEventListener("click", ev => { if (ev.target === backdrop) closeModal(); });
      document.addEventListener("keydown", function esc(ev) { if (ev.key === "Escape") { closeModal(); document.removeEventListener("keydown", esc); } });
    });
  }
});
