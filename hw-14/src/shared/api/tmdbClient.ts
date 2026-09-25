import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const tmdbClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/json',
  },
  params: {
    language: 'uk-UA',
  },
});

export const apiClient = tmdbClient;
