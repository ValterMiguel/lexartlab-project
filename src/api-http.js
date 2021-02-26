import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://api.mercadolibre.com/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})