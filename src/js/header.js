import logo from '../img/logo.png';
const headerImg = document.querySelector('.header__img');
if (headerImg) headerImg.src = logo;

import { getEvents } from './api.js';

let currentPage = 0;
let currentKeyword = '';
let debounceTimeout = null;

function createCardHtml(event) {
  const title = event.name || 'Event Tour';
  const rawDate = event.dates?.start?.localDate;
  const formattedDate = rawDate 
    ? new Date(rawDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Date TBA';

  const imageUrl = event.images && event.images.length > 0 ? event.images[0].url : 'https://placeholder.com';
  const location = event._embedded && event._embedded.venues && event._embedded.venues.length > 0 ? event._embedded.venues[0].name : 'Main Arena';
  const city = event._embedded && event._embedded.venues && event._embedded.venues.length > 0 ? event._embedded.venues[0].city?.name || 'US City' : 'US City';

  const rawInfo = event.info || 'Atlas Weekend is the largest music festival in Ukraine. More than 200 artists will create a proper music festival atmosphere on 10 stages.';
  const safeInfo = rawInfo.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const currency = event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].currency : 'UAH';
  const standardMin = event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].min : '300';
  const standardMax = event.priceRanges && event.priceRanges.length > 0 ? event.priceRanges[0].max : '500';
  const vipMin = event.priceRanges && event.priceRanges.length > 0 ? Math.round(event.priceRanges[0].min * 2.5) : '1000';
  const vipMax = event.priceRanges && event.priceRanges.length > 0 ? Math.round(event.priceRanges[0].max * 3) : '1500';

  const standardPriceString = `${standardMin}-${standardMax} ${currency}`;
  const vipPriceString = `${vipMin}-${vipMax} ${currency}`;

  return `
    <li class="events__item event-card" 
        data-name="${title}" 
        data-date="${rawDate || '2021-06-09'}" 
        data-time="${event.dates?.start?.localTime || '20:00:00'}"
        data-venue="${location}" 
        data-city="${city}" 
        data-image="${imageUrl}" 
        data-standard="${standardPriceString}" 
        data-vip="${vipPriceString}" 
        data-info="${safeInfo}">
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

async function fetchAndRenderLiveEvents(page = 0, isLoadMore = false) {
  try {
    const loadMoreBtn = document.querySelector('.events__button');
    const data = await getEvents(page, currentKeyword);
    
    const gridContainer = document.getElementById('events-grid');
    if (!gridContainer) return;

    if (!isLoadMore) {
      gridContainer.innerHTML = '';
    }

    if (data && data._embedded && data._embedded.events) {
      const realEvents = data._embedded.events;
      let newCardsHtml = '';

      realEvents.forEach(event => {
        newCardsHtml += createCardHtml(event);
      });

      gridContainer.insertAdjacentHTML('beforeend', newCardsHtml);
      if (loadMoreBtn) loadMoreBtn.style.display = 'block';
    } else {
      if (!isLoadMore) {
        gridContainer.innerHTML = '<p class="events__empty" style="color: white; text-align: center; font-size: 1.5rem; width: 100%; grid-column: 1/-1; font-family: sans-serif;">No events found for your search request.</p>';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Fetch or Render error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderLiveEvents(currentPage, false);

  const loadMoreBtn = document.querySelector('.events__button');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentPage += 1;
      fetchAndRenderLiveEvents(currentPage, true);
    });
  }

  const searchInput = document.querySelector('.form__search');
  const searchForm = document.querySelector('.header__form');

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => e.preventDefault());
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(() => {
        currentKeyword = e.target.value.trim();
        currentPage = 0;
        fetchAndRenderLiveEvents(currentPage, false);
      }, 500);
    });
  }
});
