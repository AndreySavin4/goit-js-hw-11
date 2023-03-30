const axios = require('axios').default;
export default class BackendApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async onSearch() {
    const URL = 'https://pixabay.com/api/';
    const KEY_API = '34705867-b6a2f9003b4e51dcc54f2c2fa';
    const searchParams = new URLSearchParams({
      key: KEY_API,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: 40,
    });
    try {
      const response = await axios.get(`${URL}?${searchParams}`);
      this.addPage();
      const { hits, totalHits, total } = response.data;

      return { hits, totalHits, total };
    } catch (error) {
      console.log('ERROR:', error.message);
    }
  }

  addPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get() {
    return this.searchQuery;
  }

  set(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
