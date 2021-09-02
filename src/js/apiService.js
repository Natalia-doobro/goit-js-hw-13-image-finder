import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css'

const BASE_URL = 'https://pixabay.com/api';
const myKey = '23116655-204395131977af9122e6962dd';

async function fetchPhotoAPI(text, page) {
    const result = await fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${text}&page=${page}&per_page=12&key=${myKey}`);
    const response = await result.json();
    return response;  
    
        
}
    


export default { fetchPhotoAPI };