import axios from 'axios';
import { Message } from 'element-ui';

const api = axios.create({ baseURL: 'api' });

api.interceptors.response.use(null, (error) => {
  const msg = typeof error.response.data === 'object' ? error.response.statusText : error.response.data;
  Message.error(msg);
  return Promise.reject(error);
});

export default api;
