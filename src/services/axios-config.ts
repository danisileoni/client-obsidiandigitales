import axios from 'axios';

export const config = axios.create({
  baseURL: import.meta.env.VITE_HOST_BACKEND,
  headers: { 'Content-Type': 'application/json' },
});
