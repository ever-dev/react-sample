import axios from 'axios';

const { apiUrl } = window['runConfig'];
axios.defaults.baseURL = apiUrl;

axios.defaults.params = {};
axios.defaults.params['api_key'] = '4e327adb1997498d9df6305a516f54b2';
axios.defaults.params['api_secret'] = 'd2f21c8e8c5d430f834cd6975e551952';

let authInterceptor;

export function setAuthHeader(authToken: string) {
  authInterceptor = axios.interceptors.request.use(config => {
    if (config.url && config.url.substring(0, 5) === '/api/') {
      config.headers['Authorization'] = `Token ${authToken}`;
    }
    return config;
  });
}

export function removeAuthHeader() {
  axios.interceptors.request.eject(authInterceptor);
}
