import api from "./api";
const base_url = 'https://lar.modbender.com';

export default {
  createSession() {
    return api.get(base_url + '/sanctum/csrf-cookie');
  },

  login(params) {
    return api.post(base_url + '/api/login', params);
  },

  logout() {
    return api.delete(base_url + '/api/logout');
  },

  getPosts() {
    return api.get(base_url + '/api/posts');
  },

  registration(params) {
    return api.post(base_url + '/api/registration', params);
  }
};
