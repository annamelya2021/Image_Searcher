import { refs } from './refs.js';
import { API_KEY, BASE_URL } from './Api_key.js';
import {  page, fetchArticles, createMarkup } from './index.js';
// import{createMarkup} from './markup.js';

// let total = 0;

export async function searchImages() {
    try {
        // Отримуємо пошуковий запит з поля вводу та обрізаємо його
        const searchQuery = refs.searchInput.value.trim();

        if (searchQuery === '') {
            return fetchArticles();
        }
        refs.div.innerHTML = '';
        // Будуємо URL для запиту до API
        const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

        // Виконуємо запит до API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Отримуємо дані з відповіді
        const data = await response.json();
        
        // Викликаємо функцію для створення розмітки на основі отриманих даних
        createMarkup(data);
    } catch (error) {
        console.error('Error searching images:', error);
        alert('Sorry, an error occurred while searching for images');
    }
}
