import { isCardFavorite } from './toggle.js';
export function updateFavoriteButtons() {
    const toggleFavoriteButtons = document.querySelectorAll('.toggle-favorite');
    toggleFavoriteButtons.forEach((button) => {
        const card = button.closest('.photo-card');
        const id = card.getAttribute('data-id');
        button.textContent = isCardFavorite(id) ?  '💔' : '❤️';
    });
}
