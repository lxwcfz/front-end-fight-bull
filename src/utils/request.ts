import axios from "axios";
import store from '../store/index'
import {removeStorage} from "@/utils/storage";
import { API_URL, storageName } from '@/config/config';
import { Notify } from 'vant';

axios.defaults.baseURL = API_URL;
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(store.getters.token) {
      config.headers.token = store.getters.token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if(response.data) {
      const code = response.data.status;
      if (code === 403) {
        removeStorage(storageName);
        window.location.reload();
        return;
      }
      if (code === 400) {
        // Message.error(response.data.msg);
        Notify({ type: 'danger', message: response.data.msg });
      }
      if (code === 500) {
        Notify({ type: 'danger', message: '服务器异常' });
      }
    }
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export default axios;