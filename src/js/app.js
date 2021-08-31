import sampleGallery from '../templates/gallery.hbs';

const containerGallery = document.querySelector('.gallery');
const valueInput = document.querySelector('.input');
const btnclear = document.querySelector('.button-clear');
const btnsearch = document.querySelector('.button-search');
const btnmore = document.querySelector('.btn-more');



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

        fetchPhotoAPI(valueInput.value)
        .then(fetchPhotoData)
        .catch(error => { console.log('error!')});
    }
    
}

async function fetchPhotoAPI(text) {
    const result = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${text}&page=1&per_page=12&key=23116655-204395131977af9122e6962dd`);
    const response = await result.json();
    return response;
}

function fetchPhotoData(data) {
    const object = data.hits;
        const markup = object.map(sampleGallery).join('');
        containerGallery.insertAdjacentHTML('beforeend', markup); 
}


function onValueClear(evt) {
    valueInput.value = '';
    containerGallery.innerHTML = '';
    btnsearch.removeAttribute('disabled'); 
}

btnsearch.addEventListener('click', onValueInput);
btnclear.addEventListener('click', onValueClear);
//btnmore.addEventListener('click', onLoadMore);