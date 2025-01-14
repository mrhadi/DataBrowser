import axios, { AxiosInstance } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const BASE_URL = 'https://api.mediastack.com/v1';
const API_KEY = '06fc0d439e58e5892e7bef246d3afc45';

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
