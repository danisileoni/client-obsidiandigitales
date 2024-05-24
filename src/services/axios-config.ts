import axios from 'axios';

export const config = axios.create({
  baseURL: import.meta.env.VITE_HOST_BACKEND,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});
