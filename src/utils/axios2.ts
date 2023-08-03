import axios from 'axios';

export const BASE_IMAGE_PATH = 'https://17cd-103-163-182-160.ngrok-free.app'; 
// export const BASE_IMAGE_PATH = 'https://esan.hikingbees.com';
const axiosInstance2 = axios.create({ baseURL: `${BASE_IMAGE_PATH}/api` });
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axiosInstance2.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance2;
