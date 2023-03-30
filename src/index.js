import BackendApi from './backend';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  onForm: document.querySelector('form#search-form'),
  allPictures: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const { onForm, allPictures, loadMore } = refs;
const markupPage = new BackendApi();
loadMore.classList.add('hidden');

onForm.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', moreImages);

async function onSubmit(e) {
  e.preventDefault();
  markupPage.searchQuery = e.target.elements.searchQuery.value.trim();

  allPictures.innerHTML = '';
  const { totalHits, hits, total } = await markupPage.onSearch();
  try {
    if (markupPage.searchQuery === '' || totalHits === 0) {
      loadMore.classList.add('hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notify.info(`"Hooray! We found ${total} images."`);
    markupPage.resetPage();
    await markupPage.onSearch();
    appendCards();
    loadMore.classList.remove('hidden');
  } catch (error) {
    console.log(error);
  }
}

async function moreImages() {
  const { totalHits, hits } = await markupPage.onSearch();
  await markupPage.onSearch();
  appendCards();
  if (hits.length < 40) {
    loadMore.classList.add('hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
}

async function appendCards() {
  const { hits } = await markupPage.onSearch();
  const markup = hits
    .map(
      hit => `
    <div class="photo-card ">
    <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="320"/>
    <div class="info ">
      <p class="info-item">
        <b>Likes:${hit.likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${hit.views}</b>
      </p>
      <p class="info-item">
        <b>Comments:${hit.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:${hit.downloads}</b>
      </p>
    </div>
  </div>
      `
    )
    .join('');
  allPictures.insertAdjacentHTML('beforeend', markup);
}
