import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImg } from './js/pixabay-api';
import { showGLR } from './js/render-functions';

export const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const waitMsg = document.querySelector('.wait-msg');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', e => {
  e.preventDefault();

  let searchName = input.value.trim();

  if (!searchName) {
    iziToast.show({
      backgroundColor: 'rgba(239, 64, 64, 1)',
      messageColor: `rgba(255, 255, 255, 1)`,
      close: `true`,
      position: 'topRight',
      title: 'Error',
      titleColor: '#fff',
      titleSize: '16px',
      message: 'Input search string',
    });
    return;
  }
  gallery.innerHTML = '';
  waitMsg.innerHTML =
    '"Wait, the image is loaded" <span class="loader"></span>';
  getImg(searchName)
    .then(response => {
      if (response.data.hits.length == 0) {
        iziToast.show({
          backgroundColor: 'rgba(239, 64, 64, 1)',
          messageColor: `rgba(255, 255, 255, 1)`,
          close: `true`,
          position: 'topRight',
          title: 'Error',
          titleColor: '#fff',
          titleSize: '16px',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        // gallery.innerHTML = '';
      } else {
        showGLR(response.data.hits, '.gallery');
      }
      waitMsg.textContent = '';
    })
    .catch(error => {
      waitMsg.textContent = 'Ups ...';
      console.log(error);
      gallery.innerHTML = '';
    });

  form.reset();
});
