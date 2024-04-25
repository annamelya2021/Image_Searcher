import {refs }from './refs.js';
import {updateFavoriteButtons} from './updateFavoriteButton.js';
import{toggleFavorites} from './toggle.js';
import { handleDownloadButtonClick } from './download.js';

export function createMarkup({ hits }) {
  if (!hits) {
      console.error('Hits are undefined');
      return; // Вийти з функції, якщо hits невизначені
  }

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!Array.isArray(favorites)) {
      favorites = [];
  }

  const markup = hits.map(({ id, webformatURL, tags, likes, views, comments, downloads }) => {
      const isFavorite = favorites.some(
          (favorite) => favorite.id === id // Перевіряємо за допомогою id
      );

      const favoriteButtonText = isFavorite ? 'Видалити з улюбленого' : 'Додати до улюбленого';

      return `
          <div class="photo-card" data-id="${id}"> <!-- Додали data-id -->
              <a href="${webformatURL}">
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                  <div class="info">
                      <p class="info-item"><b>Likes:<br>${likes}</b></p>
                      <p class="info-item"><b>Views:<br>${views}</b></p>
                      <p class="info-item"><b>Comments:<br>${comments}</b></p>
                      <p class="info-item"><b>Downloads:<br>${downloads}</b></p>
                      <button class="toggle-favorite">${favoriteButtonText}</button>
                      <button class="download-button" data-url="${webformatURL}" data-filename="${tags}.jpg">Download</button>
                  </div>
              </a>
          </div>`;
  }).join('');


  // Очистити вміст контейнера перед додаванням нового вмісту
  // refs.div.innerHTML = '';

  // Додаємо розмітку карточок у контейнер
  refs.div.insertAdjacentHTML('beforeend', markup);

  // Додаємо події до кнопок
  const toggleFavoriteButtons = document.querySelectorAll('.toggle-favorite');
  toggleFavoriteButtons.forEach((button) => {
      button.addEventListener('click', toggleFavorites);
  });
  const downloadButtons = document.querySelectorAll('.download-button');
      downloadButtons.forEach((button) => {
          button.addEventListener('click', handleDownloadButtonClick);
      });
  // Оновлюємо тексти кнопок
  updateFavoriteButtons();


  return markup;
}
