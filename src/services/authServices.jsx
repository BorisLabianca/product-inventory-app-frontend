import axios from "axios";
import { toast } from "react-toastify";

export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/users/register`,
      userData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("User registered successfully.");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
