import {refs} from './refs.js';
import {toggleFavorites} from './toggle.js';
 import { API_KEY, BASE_URL } from './Api_key.js';
 import{ handleDownloadButtonClick} from './download.js'
 import{updateFavoriteButtons} from './updateFavoriteButton.js';
 import {searchImages} from './searchImage.js';

refs.searchInput.addEventListener('keyup', searchImages);

window.addEventListener('DOMContentLoaded', () => {
    updateFavoriteButtons();
});

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMoreImages();
    }
});




export let myQuery = '';
export let page = 1;
export let total = 0;
export let totalHits = 0;
export let isFetching = false;
// let perPage = 40; 

console.log('Api_key.js :>> ', API_KEY);
console.log('BASE_URL :>> ', BASE_URL);
console.log('refs :>> ', refs);



export async function fetchArticles() {
    try {
        const perPage = 40; 
        const url = `${BASE_URL}?key=${API_KEY}&q=&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        total += data.hits.length;
        console.log(total);
        totalHits = data.totalHits;

        if (total >= totalHits) {
            console.log('You have reached the end of available images.')
            showAlert('You have reached the end of available images.');
        }

        return data;
    } catch (error) {
        showAlert('Sorry, an error occurred');
    }
}

function showAlert(message) {
    const alertContainer = document.getElementById('alert-container');
    console.log(alertContainer)
    const alert = document.createElement('div');
    console.log(alert)
    alert.classList.add('alert');
    alert.textContent = message || 'Sorry, an error occurred'; 
    alertContainer.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

export function createMarkup({ hits }) {
    if (!hits) {
        console.error('Hits are undefined');
        return; 
    }

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!Array.isArray(favorites)) {
        favorites = [];
    }

    const markup = hits.map(({ id, webformatURL, tags, likes, views, comments, downloads }) => {
        const isFavorite = favorites.some(
            (favorite) => favorite.id === id 
        );

        const favoriteButtonText = isFavorite ? '💔' : '❤️';
  
        
        return `
        <div class="card-container">
            <div class="photo-card" data-id="${id}">
                <a href="${webformatURL}" class="image-link">
                    <div class="button-container">
                        <button class="toggle-favorite">
                            ${favoriteButtonText}
                        </button>
                        <button class="download-button" data-url="${webformatURL}" data-filename="${tags}.jpg"> 
                            ⬇️
                        </button>
                    </div>
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item"><b>Likes:<br>${likes}</b></p>
                    <p class="info-item"><b>Views:<br>${views}</b></p>
                    <p class="info-item"><b>Comments:<br>${comments}</b></p>
                    <p class="info-item"><b>Downloads:<br>${downloads}</b></p>
                </div>
            </div>
        </div>
        `;
    }).join('');

    refs.div.insertAdjacentHTML('beforeend', markup);

    // Add event listener to open modal
    const imageLinks = document.querySelectorAll('.image-link');
    imageLinks.forEach((link) => {
        link.addEventListener('click', openModal); // Додати обробник події openModal
    });

    // Add event listener to toggle favorite buttons
    const toggleFavoriteButtons = document.querySelectorAll('.toggle-favorite');
    toggleFavoriteButtons.forEach((button) => {
        button.addEventListener('click', toggleFavorites);
    });

    // Add event listener to download buttons
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach((button) => {
        button.addEventListener('click', handleDownloadButtonClick);
    });

    // Update favorite buttons
    updateFavoriteButtons();

    return markup;
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
    document.body.classList.add('modal-open'); // Додати клас до body
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // Видалити клас з body
}


document.querySelector('.close').addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
});


async function loadMoreImages() {
    if (!isFetching) { // Перевіряємо, чи вже йде процес завантаження
        isFetching = true; // Встановлюємо прапорець, що йде процес завантаження
        page++; // Збільшуємо номер сторінки для завантаження наступної порції картинок
        try {
            const data = await fetchArticles(); // Завантажуємо дані для нової сторінки
            if (!data || !data.hits) {
                // Якщо дані або властивість hits невизначені, вийти з функції
                return;
            }
            createMarkup(data); // Оновлюємо вміст сторінки з новими даними
        } catch (error) {
            console.error('Error loading more images:', error);
        } finally {
            isFetching = false; // Збираємо прапорець про завершення процесу завантаження
        }
    }
}





fetchArticles().then(createMarkup);









// export async function fetchArticles() {
//     try {
//         const url = `https://pixabay.com/api/?key=12397794-3c79aefa4a299d9b97accc173&q=&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         total += data.hits.length;
//         console.log(total);
//         totalHits = data.totalHits;
//         return data;
//     } catch (error) {
//         alert('Sorry, an error occurred');
//     }
// }

// export async function fetchMoreArticles() {
//     try {
//         page++; // Збільшити номер сторінки
//         const moreData = await fetchArticles();
//         totalHits = moreData.totalHits;

//         console.log("more art", moreData);
//         createMarkup(moreData);
//         if (total >= totalHits) {
//             alert('We`re sorry, but you`ve reached the end of search results.');
//         } else if (total === totalHits) {
//             alert('All images have been loaded.');
//         }
//     } catch (error) {
//         console.error('Error fetching more articles:', error);
//     }
// }
// export function handleScroll() {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//     // Перевіряємо, чи не здійснюється вже запит та чи прокручено сторінку достатньо
//     if (!isFetching && (scrollTop + clientHeight >= scrollHeight * 0.9) && (scrollTop > 0)) {
//         // Встановлюємо флаг isFetching в true, щоб запобігти подвійному запуску запиту
//         isFetching = true;

//         // Затримуємо виклик функції на 500 мілісекунд для плавного прокручування
//         setTimeout(async () => {
//             // Викликаємо функцію для отримання додаткових статей
//             await fetchMoreArticles();

//             // Після отримання даних перевіряємо, чи досягли максимальної кількості результатів
//             if (total >= totalHits) {
//                 alert('We`re sorry, but you`ve reached the end of search results.');
//             } else if (total === totalHits) {
//                 alert('All images have been loaded.');
//             }

//             // Повертаємо флаг isFetching в false для того, щоб знову дозволити виконання запиту
//             isFetching = false;
//         }, 500);
//     }
// }

// export async function searchImages() {
//     try {
//         // Отримуємо пошуковий запит з поля вводу та обрізаємо його
//         const searchQuery = refs.searchInput.value.trim();

//         // Перевіряємо, чи не порожній пошуковий запит
//         if (searchQuery === '') {
//             fetchArticles().then(createMarkup); // Викликаємо fetchArticles та createMarkup
//             return;
//         }

//         // Скидуємо значення total перед новим пошуком
//         total = 0;

//         // Будуємо URL для запиту до API
//         const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

//         // Виконуємо запит до API
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
        
//         // Отримуємо дані з відповіді
//         const data = await response.json();
        
//         // Додаємо кількість отриманих зображень до загальної кількості
//         total += data.hits.length;

//         // Викликаємо функцію для створення розмітки на основі отриманих даних
//         createMarkup(data);
//     } catch (error) {
//         console.error('Error searching images:', error);
//         alert('Sorry, an error occurred while searching for images');
//     }
// }











// export function displayFavoritesMarkup(markup) {
//     const favoritesContainer = document.getElementById('favorites-container');
//     favoritesContainer.innerHTML = markup;
// }

// Функція для відображення улюблених зображень
// export async function renderFavorites() {
//     try {
//         // Отримати збережені улюблені зображення з локального сховища
//         const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//         // Створити розмітку для кожного улюбленого зображення
//         const markup = favorites.map(({ id, src, alt }) => {
//             return `
//                  <div class="photo-card" data-id="${id}">
//             <img src="${src}" alt="${alt}" loading="lazy" />
//             <div class="button-container">
//                 <button class="toggle-favorite">Видалити з улюбленого</button>
//                 <button class="download-button">Завантажити</button>
//             </div>
//         </div>
//             `;
//         }).join('');

//         // Відобразити розмітку на сторінці Favorites
//         displayFavoritesMarkup(markup);

//         // Додати обробники подій до кнопок "Видалити з улюбленого"
//         const toggleFavoriteButtons = document.querySelectorAll('.toggle-favorite');
//         toggleFavoriteButtons.forEach((button) => {
//             button.addEventListener('click', toggleFavorites);
//         });
//     } catch (error) {
//         console.error('Error rendering favorites:', error);
//     }
// }


// document.addEventListener('DOMContentLoaded', function() {
//     // Retrieve favorite images from local storage
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//     // Render favorite images markup
//     createMarkup({ hits: favorites });
// });

