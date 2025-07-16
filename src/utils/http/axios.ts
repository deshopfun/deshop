import axios from 'axios';
import { useUserPresistStore } from 'lib';
const { setShowProgress, getAuth, resetUser } = useUserPresistStore.getState();

axios.interceptors.request.use(
  (config) => {
    // setShowProgress(true);

    if (!config.headers.get('Content-Type')) {
      config.headers.set('Content-Type', 'application/json; charset=utf-8');
    }

    if (!config.headers.get('Accept')) {
      config.headers.set('Accept', 'application/json');
    }

    const auth = getAuth();
    if (auth != '') {
      config.headers.set('Authorization', auth);
    }
    config.timeout = 100000;
    return config;
  },
  (error) => {
    // setShowProgress(false);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    // setShowProgress(false);

    if (response && response.status === 200) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response);
  },
  (error) => {
    // setShowProgress(false);

    if (error.response && error.response.status === 401) {
      resetUser();
      window.location.href = '/';
    } else {
      return Promise.reject(error);
    }
  },
);

export default axios;
