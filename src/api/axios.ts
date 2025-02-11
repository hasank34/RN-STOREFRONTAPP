import axios from 'axios';

const api = axios.create({
  baseURL: 'https://testcase.myideasoft.com/admin-api',
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX',
  },
});



export default api;
