import axios from 'axios';

export class ApiService {
  #baseUrl = 'http://192.168.0.122:5000';
  isAuth = false;
  #token;
  #_id;

  constructor(routeAuth = true) {

    if(routeAuth) {
      this.isAuth = true;
      this.token = localStorage.getItem('token').toString();
      this._id = localStorage.getItem('_id').toString();
    }
  }

  getHeaders(multipart = false) {
    const headers = {};

    if(this.isAuth) {
      if(!this.token || !this._id) throw new Error('Dados de autentucação ausente!');

      headers['Authorization'] = `Bearer ${this.token.replace(/"/g, '')}`;
      headers['_id'] = this._id.replace(/"/g, '');
    }

    multipart ? headers['enctype'] = 'multipart/form-data' : headers['Content-Type'] = 'application/json';

    return headers;
  }

  async get(route) {
    return await axios.get(this.#baseUrl + route, { headers: this.getHeaders() });
  }

  async post(route, data, multipart = false) {
    if(!data) throw new Error('Corpo da requisição nescessário');
    return await axios.post(this.#baseUrl + route, data, { headers: this.getHeaders(multipart) });
  }

  async put(route, data, multipart = false) {
    if(!data) throw new Error('Corpo da requisição nescessário');
    return await axios.put(this.#baseUrl + route, data, { headers: this.getHeaders(multipart) });
  }

  async delete(route) {
    return await axios.delete(this.#baseUrl + route, { headers: this.getHeaders() });
  }
}