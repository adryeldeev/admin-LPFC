import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useAuth } from "../Context/AuthProvider";



const useApi = (): AxiosInstance => {
  const { token } = useAuth(); // Agora o TypeScript sabe que 'token' existe

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor para adicionar o token
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export default useApi;