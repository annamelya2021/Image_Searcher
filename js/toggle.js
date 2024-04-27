import {renderFavorites} from "./favorites.js";

function getCurrentPage() {
    const url = window.location.href;
    if (url.includes('favorites')) {
        return 'favorites';
    } else {
        return 'home'; 
    }
}

export function toggleFavorites(event) {
    event.preventDefault(); 
    const button = event.target;
    const card = button.closest('.photo-card');
    const image = card.querySelector('img');
    const imageData = {
        id: card.getAttribute('data-id'),
        src: image.src,
        alt: image.alt,
    };

    const isFavorite = isCardFavorite(imageData.id);
    const currentPage = getCurrentPage(); 
    if (isFavorite) {
        removeFavoriteCard(imageData.id);
        if (currentPage === 'favorites') {
            card.remove();
            renderFavorites()
        } 
        button.textContent = '❤️';
    } else {
        addFavoriteCard(imageData);
        button.textContent =  '💔';
    }
}

export function isCardFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some((favorite) => favorite.id === id);
}

export function addFavoriteCard(cardData) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(cardData);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function removeFavoriteCard(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex((item) => item.id === id);
    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
