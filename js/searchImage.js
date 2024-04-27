import { refs } from './refs.js';
import { API_KEY, BASE_URL } from './Api_key.js';
import {  page, fetchArticles, createMarkup } from '../index.js';

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
