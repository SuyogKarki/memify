import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://memify34.herokuapp.com/api/',
  headers: {
    token: `Bearer ${JSON.parse(localStorage.getItem('memify-cache-user'))?.accessToken}`,
  },
});

export const unverifiedInstance = axios.create({
  baseURL: 'https://memify34.herokuapp.com/api/',
});
