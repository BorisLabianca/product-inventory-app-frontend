import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const API_URL = `${SERVER_URL}/api/products`;

const createProductRequest = async (formData) => {
  const response = await axios.post(`${API_URL}/create`, formData);
  return response.data;
};

const productServices = { createProductRequest };

export default productServices;
