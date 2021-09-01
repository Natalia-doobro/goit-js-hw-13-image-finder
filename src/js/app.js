import sampleGallery from '../templates/gallery.hbs';
import API from './apiService.js';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css'

const containerGallery = document.querySelector('.gallery');
const valueInput = document.querySelector('.input');
const btnclear = document.querySelector('.button-clear');
const btnsearch = document.querySelector('.button-search');
const btnmore = document.querySelector('.btn-more');
const btnelement = document.querySelector('.element-skroll');

let page = 1;
//-----------------------------------------------начальная версия запроса для проверки----------------------------------------------------------------------------
// fetch('https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=blue&page=1&per_page=12&key=23116655-204395131977af9122e6962dd')
//     .then(response => {
//         return response.json();
//     }).then(data => {
//         console.log(data)
//         const object = data.hits;
//         const markup = object.map(sampleGallery).join('');
//         containerGallery.insertAdjacentHTML('beforeend', markup); 
//     })
//     .catch(error => {
//     console.log('error!')
//     });
//-----------------------------------------------начальная версия запроса----------------------------------------------------------------------------
function onValueInput(evt) {
    evt.preventDefault();
   
    if (valueInput.value !== "") {
        btnsearch.setAttribute('disabled', true);
        
        API.fetchPhotoAPI(valueInput.value , page)
        .then(fetchPhotoData)
        .catch(onValueError);
    } 
}

function fetchPhotoData(data) {
    btnmore.setAttribute("style", "display: block;");
    const object = data.hits;
    const markup = object.map(sampleGallery).join('');
    containerGallery.insertAdjacentHTML('beforeend', markup); 
}
function onValueError(er) {
    btnmore.setAttribute("style", "display: none;");

    error({
        title: 'Oh No!',
        text: 'Something went wrong . Try to enter more correct data.',
    });
}


function onValueClear(evt) {
    valueInput.value = '';
    containerGallery.innerHTML = '';
    page = 1;
    btnsearch.removeAttribute('disabled');
    btnmore.setAttribute("style", "display: none;");
}


async function onLoadMore() {
    page = page + 1;
    const render = await API.fetchPhotoAPI(valueInput.value , page)
        .then(fetchPhotoData)
        .catch(error => { console.log('error!') });
    
    scrollLoadMore()
}

function scrollLoadMore() { 
    containerGallery.lastChild.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
    
}


btnsearch.addEventListener('click', onValueInput);
btnclear.addEventListener('click', onValueClear);
btnmore.addEventListener('click', onLoadMore);
