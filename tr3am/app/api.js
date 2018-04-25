import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:49558/api',
});