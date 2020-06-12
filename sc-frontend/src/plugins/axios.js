"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: "http://localhost:8080/api",
  timeout: 60 * 1000 // Timeout
};
const myAxios = function (addconfig) {
  const _axios = axios.create({ ...config, ...addconfig });

  _axios.defaults.headers.post["Content-Type"] = "application/json";
  _axios.defaults.headers.put["Content-Type"] = "application/json";

  _axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  _axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return _axios;
}

const useAxios = myAxios();

Plugin.install = function (Vue) {
  Vue.axios = useAxios;
  window.axios = useAxios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return useAxios;
      }
    },
    $axios: {
      get() {
        return useAxios;
      }
    },
    myAxios: {
      get() {
        return myAxios;
      }
    }
  });
};

Vue.use(Plugin)

export default useAxios;
