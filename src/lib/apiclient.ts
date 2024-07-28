import { api } from "@/endpoints";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

const apiclient: AxiosInstance = axios.create({
  baseURL: api,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//request interceptor
apiclient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(config);
    return config;
  },
  (error: AxiosError) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  },
);

// add a response interceptor
apiclient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Response", response);
    return response;
  },
  (error: AxiosError) => {
    console.log(error);
    if (error.response) {
      console.log("Error response", error.response);
      return Promise.reject(error.response);
    } else if (error.request) {
      console.log("Error request: ", error.request);
    } else {
      console.log("Error message");
      return Promise.reject(error);
    }
  },
);
export default apiclient;
