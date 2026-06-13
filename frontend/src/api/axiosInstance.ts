import axios from "axios";
import type { AxiosError as AxiosErrorType } from "axios";
import useAuthStore from "../store/authStore";

const API_URL = import.meta.env.VITE_API_URL;
type ApiErrorResponse = {
  message?: string;
  error?: string;
};

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type' : 'application/json',
    }
});

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token ?? undefined

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

instance.interceptors.response.use(
  response => response,
  error => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();      
        window.location.href = "/login";
      }
      return Promise.reject(error);
  }
)


export const AxiosError = (
  error: AxiosErrorType,
  fallbackMessage = "Request failed"
) => {
  if (error.response) {
    const data = error.response.data as ApiErrorResponse;

    throw new Error(
      data.message ??
      data.error ??
      fallbackMessage
    );
  }

  if (error.request) {
    throw new Error(
      "No response from server. Please check your internet connection."
    );
  }

  return new Error(
    error.message || "Unexpected error occurred."
  );
};

export const convertToArray = <T>(data : T) => Array.isArray(data) ? data : [data];

export default instance;