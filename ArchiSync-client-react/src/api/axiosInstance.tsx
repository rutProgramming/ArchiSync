import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";

export const GetHeaders = (): Record<string, string> => {
  const token = sessionStorage.getItem("token") || "";
  return {
    Authorization: `Bearer ${token.replace(/"/g, "")}`,
    "Content-Type": "application/json",
  };
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // אם אין headers, ניצור AxiosHeaders חדש
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }

  // עכשיו נעביר את ההדרים מהפונקציה שלנו
  const headersToAdd = GetHeaders();

  // מיזוג ההדרים
  Object.entries(headersToAdd).forEach(([key, value]) => {
    config.headers!.set(key, value);
  });

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Unknown error";
    console.error("API Error:", message);
    return Promise.reject(message);
  }
);

  

export default api;
