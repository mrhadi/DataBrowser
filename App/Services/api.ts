import axios, { AxiosInstance } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import ENV from './env';

const BASE_URL = ENV.BASE_API_URL;
const API_KEY = ENV.API_KEY;

const ApiService = () => {
  const client: AxiosInstance = applyCaseMiddleware(axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
  }));

  const getNews = async (category: string = '') => {
    const url = `/news?access_key=${API_KEY}&categories=${category}&limit=100`;
    return client.get(url);
  };

  const searchNews = async (keywords: string = '') => {
    const url = `/news?access_key=${API_KEY}&keywords=${keywords}&limit=100`;
    return client.get(url);
  };

  return {
    getNews,
    searchNews,
  };
};

export default ApiService;
