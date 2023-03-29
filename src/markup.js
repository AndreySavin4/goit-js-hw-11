import backend from './backend';
const markupPage = new backend();
const t = markupPage.onSearch().then(data => appendCards(data));

export default function appendCards() {
  // const { webformatURL, tags, likes, views, comments, downloads } = data;
  return (markup = `<div class="photo-card">
<img src="${webformatURL}" alt="${tags}" loading="lazy" />
<div class="info">
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
</div>`);
}
