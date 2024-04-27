import { refs } from './refs.js';
import { API_KEY, BASE_URL } from './js/Api_key.js';
import {  page, fetchArticles, createMarkup } from './index.js';


// import{createMarkup} from './markup.js';

// let total = 0;

// export async function searchImages() {
//     try {
//         // Отримуємо пошуковий запит з поля вводу та обрізаємо його
//         const searchQuery = refs.searchInput.value.trim();

//         if (searchQuery === '') {
            
//             return fetchArticles();
//         }
//         refs.div.innerHTML = '';
//         // Будуємо URL для запиту до API
//       const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;


//         // Виконуємо запит до API
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
        
//         // Отримуємо дані з відповіді
//         const data = await response.json();
//       if (data.totalHits === 0) {
//             // Якщо не знайдено жодного результату, відображаємо повідомлення про помилку
//             throw new Error('No results found');
//         }
        
//         // Викликаємо функцію для створення розмітки на основі отриманих даних
//         createMarkup(data);
//     } catch (error) {
//         console.error('Error searching images:', error);
//         if (error.message === 'Empty search query') {
//             alert('Please enter a search query');
//         } else if (error.message === 'No results found') {
//             alert('No results found. Please try again with a different search query');
//         } else {
//             alert('Sorry, an error occurred while searching for images');
//         }
//     }
// }

export async function searchImages(page) {
    try {
        const searchQuery = refs.searchInput.value.trim();

        if (searchQuery === '') {
            insertDefaultImage();
            return;
        }

        refs.div.innerHTML = '';

        const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.totalHits === 0) {
            insertDefaultImage();
            return;
        }

        createMarkup(data);
    } catch (error) {
        console.error('Error searching images:', error);
        alert('Sorry, an error occurred while searching for images');
    }
}


function insertDefaultImage() {
    refs.div.innerHTML = `
        <div class="default-image">
         <p>No results found. Please try again with a different search query.</p>
            <img  src="./img/noSearch.png" alt="Default Image">
           
        </div>
    `;
}
