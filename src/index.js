import MarkupPage from './class-page';
import lodash from 'lodash.throttle';

form = document.querySelector('form#search-form');
loadMore = document.querySelector('.load-more');
galleryList = document.querySelector('.gallery');

form.addEventListener('submit', onGalleryPage);
window.addEventListener(
  'scroll',
  lodash(() => {
    const loadingMore = document.documentElement.getBoundingClientRect();
    if (loadingMore.bottom < document.documentElement.clientHeight + 50) {
      markupPage.cards();
    }
  }, 300)
);

const markupPage = new MarkupPage();

function onGalleryPage(e) {
  e.preventDefault();

  markupPage.query = e.target.elements.searchQuery.value.trim();
  if (markupPage.query === '') {
    return alert('Пустая строка!');
  }
  galleryList.innerHTML = '';
  markupPage.resetPage();
  markupPage.cards();
}
