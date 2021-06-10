export default function getrefs() {
  return {
    searchForm: document.querySelector('.js-search-form'),
    galleryContainer: document.querySelector('.js-gallery-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  };
}
