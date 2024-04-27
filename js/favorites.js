import { refs } from "./refs.js";
import { toggleFavorites } from "../js/toggle.js";
import { downloadImage, handleDownloadButtonClick } from './download.js';

document.addEventListener('DOMContentLoaded', renderFavorites);


document.querySelector('.close').addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('myModal');
    if (event.target ===  modal) {
        closeModal();
    }
});

export function displayFavoritesMarkup(markup) {
     if (!refs.fav) {
        return;
    }
    if (!markup.trim()) {
        refs.fav.innerHTML = `
            <div class="no-favorites">
                <p>Your favorites are empty</p>
                <img src="../img/NoFav.png" alt="No favorites">
            </div>
        `;
    } else {
        refs.fav.innerHTML = markup;
        const photoCards = document.querySelectorAll('.photo-card');
        photoCards.forEach(card => {
            card.addEventListener('click', openModal);
        });
    }
}

export async function renderFavorites() {
    try {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const markup = favorites.map(({ id, src, alt }) => {
            return `
            <div class="card-container">
                <div class="photo-card" data-id="${id}">
                    <a href="${src}" class="image-link">
                        <div class="image-container">
                            <img src="${src}" alt="${alt}" loading="lazy" />
                            <div class="button-container">
                                <button class="toggle-favorite">💔</button>
                                <button class="download-button" data-url="${src}" data-filename="${alt}.jpg">⬇️</button>
                            </div>
                        </div>
                    </a> 
                </div>
            </div>
            `;
        }).join('');

        displayFavoritesMarkup(markup);

        const toggleFavoriteButtons = document.querySelectorAll('.toggle-favorite');
        toggleFavoriteButtons.forEach((button) => {
            button.addEventListener('click', toggleFavorites);
        });

        const downloadButtons = document.querySelectorAll('.download-button');
        downloadButtons.forEach((button) => {
            button.addEventListener('click', handleDownloadButtonClick);
        });

    } catch (error) {
        console.error('Error rendering favorites:', error);
    }
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

function openModal(event) {
    if (event.target.tagName !== 'IMG') {
        return;
    }
    event.preventDefault();
    const imgSrc = event.currentTarget.querySelector('img').src;
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    document.body.classList.add('modal-open');
}
