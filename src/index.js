import backend from './backend';
export const refs = {
  onForm: document.querySelector('form#search-form'),
  allPictures: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const { onForm, allPictures, loadMore } = refs;
const markupPage = new backend();

onForm.addEventListener('submit', onSubmit);

loadMore.addEventListener('click', moreCards);

async function onSubmit(e) {
  e.preventDefault();
  markupPage.searchQuery = e.target.elements.searchQuery.value.trim();
  markupPage.resetPage();
  markupPage.onSearch();
}

function moreCards() {
  markupPage.onSearch().then(createMarkup);
}
