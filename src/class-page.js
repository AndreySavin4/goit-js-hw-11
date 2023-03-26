import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default class MarkupPage {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async cards() {
    const URL = 'https://pixabay.com/api/';
    const KEY_API = '34705867-b6a2f9003b4e51dcc54f2c2fa';
    const requestParametrs =
      'image_type=photo&orientation=horizontal&safesearch=true';

    try {
      const result = await fetch(
        `${URL}?key=${KEY_API}&q=${this.searchQuery}&${requestParametrs}&page=${this.page}&per_page=40`
      );
      const responce = await result.json();
      return this.total(responce);
    } catch (error) {
      console.log(error);
    }
  }

  total(gallery) {
    if (gallery.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    const createCards = gallery.hits.map(card => {
      return this.onGallery(card);
    });
    galleryList.insertAdjacentHTML('beforeend', createCards.join(''));
    this.addPage();
    if (gallery.hits.length === 0) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }
  }

  onGallery(card) {
    const { webformatURL, tags, likes, views, comments, downloads } = card;
    const markup = `
    <div class="photo-card ">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="320"/>
    <div class="info ">
      <p class="info-item">
        <b>Likes:${likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${views}</b>
      </p>
      <p class="info-item">
        <b>Comments:${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:${downloads}</b>
      </p>
    </div>
  </div>
      `;
    return refs.galleryList.insertAdjacentHTML('beforeend', markup);
  }

  addPage() {
    this.page += 1;
  }

  resetPage() {
    return (this.page = 1);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
