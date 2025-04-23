import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const getProducts = () => axios.get(`${BASE_URL}/ShowProducts`);
export const getProduct = (id) => axios.get(`${BASE_URL}/product/${id}`);
export const createProduct = (data) => axios.post(`${BASE_URL}/Addproduct`, data);
export const updateProduct = (id, data) => axios.post(`${BASE_URL}/updateProduct/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${BASE_URL}/deleteProduct/${id}`);