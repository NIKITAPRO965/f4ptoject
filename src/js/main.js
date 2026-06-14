import { getEvents } from './api.js';

let currentPage = 0;
let isPlaceholderRunning = false;

function createCardHtml(event) {
  const title = event.name || 'Event Tour';

  const imageUrl = event.images && event.images.length > 0 
    ? event.images[0].url 
    : 'https://placeholder.com';

  const location = event._embedded && event._embedded.venues && event._embedded.venues.length > 0
    ? event._embedded.venues[0].name
    : 'Main Arena';

  const rawDate = event.dates?.start?.localDate;
  const formattedDate = rawDate 
    ? new Date(rawDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'TBA';

  return `
    <article class="event-card">
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
    </article>
  `;
}

async function fetchAndRenderEvents(page, isLoadMore = false) {
  const gridContainer = document.getElementById('events-grid');
  const loadMoreBtn = document.querySelector('.events__button');
  
  if (!gridContainer) return;
  if (isPlaceholderRunning) return;

  try {
    isPlaceholderRunning = true;
    if (loadMoreBtn) loadMoreBtn.textContent = 'Loading...';

    const data = await getEvents(page);
    
    if (data && data._embedded && data._embedded.events) {
      const realEvents = data._embedded.events;
      
      let newCardsHtml = '';
      realEvents.forEach(event => {
        newCardsHtml += createCardHtml(event);
      });

      if (isLoadMore) {
        gridContainer.insertAdjacentHTML('beforeend', newCardsHtml);
      } else {
        gridContainer.innerHTML = newCardsHtml;
      }

      if (loadMoreBtn) loadMoreBtn.textContent = 'Load more';
    } else {
      if (isLoadMore && loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
      } else if (!isLoadMore) {
        gridContainer.innerHTML = '<p class="events__empty">No active events found</p>';
      }
    }
  } catch (error) {
    console.error('Render error:', error);
    if (loadMoreBtn) loadMoreBtn.textContent = 'Load more';
  } finally {
    isPlaceholderRunning = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderEvents(currentPage, false);

  const loadMoreBtn = document.querySelector('.events__button');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentPage += 1;
      fetchAndRenderEvents(currentPage, true);
    });
  }
});
