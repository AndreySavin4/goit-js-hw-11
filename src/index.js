import BackendApi from './backend';
import lodash from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export const refs = {
  onForm: document.querySelector('form#search-form'),
  allPictures: document.querySelector('.gallery'),
};

const { onForm, allPictures } = refs;
const markupPage = new BackendApi();

onForm.addEventListener('submit', onSubmit);

window.addEventListener(
  'scroll',
  lodash(() => {
    const loadingMore = document.documentElement.getBoundingClientRect();
    if (loadingMore.bottom < document.documentElement.clientHeight + 50) {
      markupPage.onSearch();
      appendCards();
    }
  }, 200)
);

async function onSubmit(e) {
  e.preventDefault();
  markupPage.searchQuery = e.target.elements.searchQuery.value.trim();
  allPictures.innerHTML = '';

  if (markupPage.searchQuery === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  console.log(await markupPage);
  markupPage.resetPage();
  await markupPage.onSearch();
  appendCards();
}

function appendCards() {
  const cards = markupPage.getCards();
  const markup = cards
    .map(
      card => `
    <div class="photo-card ">
    <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" width="320"/>
    <div class="info ">
      <p class="info-item">
        <b>Likes:${card.likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${card.views}</b>
      </p>
      <p class="info-item">
        <b>Comments:${card.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:${card.downloads}</b>
      </p>
    </div>
  </div>
      `
    )
    .join('');
  allPictures.insertAdjacentHTML('beforeend', markup);
}
