// export function toggleFavorites(event) {
//     event.preventDefault(); 
//     const button = event.target;
//     const card = button.closest('.photo-card');
//     const image = card.querySelector('img');
//     const imageData = {
//         id: card.getAttribute('data-id'),
//         src: image.src,
//         alt: image.alt,
//     };

//     let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     const index = favorites.findIndex(item => item.id === imageData.id);

//     if (index !== -1) {
//         card.remove();
//         favorites.splice(index, 1);
//         localStorage.setItem('favorites', JSON.stringify(favorites));
//     } else {
//         favorites.push(imageData);
//         localStorage.setItem('favorites', JSON.stringify(favorites));
//     }

//     const isFavorite = favorites.some(
//         (favorite) => favorite.id === imageData.id
//     );
//     button.textContent = isFavorite ? 'Видалити з улюбленого' : 'Додати до улюбленого';

//     updateFavoriteButtons();
// }

// export function updateFavoriteButtons() {
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     const toggleFavoriteButtons = document.querySelectorAll('.toggle-favorite');
//     toggleFavoriteButtons.forEach((button) => {
//         const card = button.closest('.photo-card');
//         const image = card.querySelector('img');
//         const imageData = {
//             id: card.getAttribute('data-id'),
//             src: image.src,
//             alt: image.alt,
//         };
//         const isFavorite = favorites.some(
//             (favorite) => favorite.id === imageData.id
//         );
//         button.textContent = isFavorite ? 'Видалити з улюбленого' : 'Додати до улюбленого';
//     });
// }



// // export function toggleFavorites(event) {
// //     event.preventDefault(); 
// //     const button = event.target;
// //     const card = button.closest('.photo-card');
// //     const image = card.querySelector('img');
// //     const imageData = {
// //         id: card.getAttribute('data-id'),
// //         src: image.src,
// //         alt: image.alt,
// //     };

// //     const isFavorite = isCardFavorite(imageData.id);

// //     if (isFavorite) {
// //         removeFavoriteCard(imageData.id);
// //         // card.remove();
// //         button.textContent = 'Додати до улюбленого';
// //     } else {
// //         addFavoriteCard(imageData);
// //         button.textContent = 'Видалити з улюбленого';
// //     }
// // }

function getCurrentPage() {
    // Отримати поточний URL або інший ідентифікатор сторінки
    const url = window.location.href;
    if (url.includes('favorites')) {
        return 'favorites';
    } else {
        return 'home'; // Інші сторінки, наприклад, домашня сторінка
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
    const currentPage = getCurrentPage(); // Функція для визначення поточної сторінки

    if (isFavorite) {
        removeFavoriteCard(imageData.id);
        if (currentPage === 'favorites') {
            card.remove(); // Видалення елемента з DOM тільки на сторінці улюблених
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
