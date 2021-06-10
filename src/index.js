import './sass/main.scss';
import galleryCards from './templates/galleryCard.hbs';
import ApiService from './js/apiService.js';
import getRefs from './js/get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { alert, error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import * as basicLightbox from 'basiclightbox';
import LoadMoreBtn from './js/load-more-btn';

const refs = getRefs();
const API = new ApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGalleryCards);
refs.loadMoreBtn.addEventListener('click', handleButtonClick);
refs.galleryContainer.addEventListener('click', openLargeImg);

function onSearch(e) {
  e.preventDefault();

  API.query = e.currentTarget.elements.query.value;

  if (API.query === '') {
    return alert('Write your reqest!');
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
      handleButtonClick();
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
  return error('It is not find. Let`s try again');
}

function handleButtonClick() {
  refs.loadMoreBtn.scrollIntoView({ block: 'end', behavior: 'smooth' });
}

function openLargeImg(currentImg) {
  if (currentImg.target.nodeName !== 'IMG') {
    return;
  }
  const largeImageURL = currentImg.target.dataset.source;
  _openMobalBasic(largeImageURL);
}

function _openMobalBasic(url) {
  basicLightbox.create(`<img src="${url}" width="1600" height="900">`).show();
}
