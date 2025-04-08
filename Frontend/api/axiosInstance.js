import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "./config";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Interceptor care adaugă token-ul JWT automat la toate requesturile
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
