import './sass/main.scss';
import galleryCards from './templates/galleryCard.hbs';
import ApiService from './js/apiService.js';
import refs from './js/refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
// import { error } from '@pnotify/core';
import LoadMoreBtn from './js/load-more-btn';

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const API = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGalleryCards);

function onSearch(e) {
  e.preventDefault();

  API.query = e.currentTarget.elements.query.value;

  if (API.query === '') {
    return alert('Let`s enter your request');
  }

  loadMoreBtn.show();

  API.resetPage();
  clearGalleryContainer();
  fetchGalleryCards();
}

function fetchGalleryCards() {
  loadMoreBtn.disable();
  API.fetchGalleryCards()
    .then(galleryCard => {
      appendGalleryMarkup(galleryCard);
      loadMoreBtn.enable();
    })
    .catch(onFetchError);
}

function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryCards(hits));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function onFetchError() {
  alert('It is not find. Let`s try again');
}
