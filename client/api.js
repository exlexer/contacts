import axios from 'axios';
import store from './store';

const api = axios.create({ baseURL: 'api' });

api.interceptors.response.use(null, (error) => {
  store.dispatch('error',
    error.response.data.message
    || error.response.data);
  return Promise.reject(error);
});

export default api;
