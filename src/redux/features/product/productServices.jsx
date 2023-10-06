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

const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};

const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}/update/${id}`, formData);
  return response.data;
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${API_URL}/product/${id}`);
  return response.data;
};

const productServices = {
  createProductRequest,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
};

export default productServices;
