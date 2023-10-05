import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const API_URL = `${SERVER_URL}/api/products`;

const createProductRequest = async (formData) => {
  const response = await axios.post(`${API_URL}/create`, formData);
  return response.data;
};

const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/all-products`);
  return response.data;
};

const productServices = { createProductRequest, getAllProducts };

export default productServices;
