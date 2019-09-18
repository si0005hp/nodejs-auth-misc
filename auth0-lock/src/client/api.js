import axios from 'axios';
import auth0 from './auth0-util';

class Api {
  constructor() {
    this.buildHeaders = this.buildHeaders.bind(this);
    this.get = this.get.bind(this);
  }

  buildHeaders() {
    // return { headers: { Authorization: 'Bearer ' + auth0.getIdToken() } };
    return { headers: { Authorization: auth0.getIdToken() } };
  }

  get(url) {
    return axios.get(url, this.buildHeaders());
  }
}

const api = new Api();
export default api;
