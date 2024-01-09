import axios from 'axios';

export class ApiService {
  // #baseUrl = 'https://meuapetite.com/api';
  #baseUrl = 'http://192.168.0.112:5000/api';

  getHeaders(multipart = false) {
    const headers = {};

    multipart ? headers['enctype'] = 'multipart/form-data' : headers['Content-Type'] = 'application/json';

    return headers;
  }

  verifyAuthetication(response) {
    if (response.status === 401 && this.isAuth) {
      return window.location.href = '/login'
    }
  }

  async get(route) {
    const response = await axios.get(this.#baseUrl + route, { headers: this.getHeaders() });
    this.verifyAuthetication(response);
    return response;
  }

  async post(route, data, multipart = false) {
    if(!data) throw new Error('Corpo da requisição nescessário');
    const response = await axios.post(this.#baseUrl + route, data, { headers: this.getHeaders(multipart) });
    this.verifyAuthetication(response);
    return response;
  }

  async put(route, data, multipart = false) {
    if(!data) throw new Error('Corpo da requisição nescessário');
    const response = await axios.put(this.#baseUrl + route, data, { headers: this.getHeaders(multipart) });
    this.verifyAuthetication(response);
    return response;
  }

  async delete(route) {
    const response = await axios.delete(this.#baseUrl + route, { headers: this.getHeaders() });
    this.verifyAuthetication(response);
    return response;
  }
}