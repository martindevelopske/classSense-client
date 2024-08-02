import { api } from "@/endpoints";
import { useAppStore } from "@/store";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

interface ErrorResponseData {
  message: string;
  // Add other properties if needed
}

const apiclient: AxiosInstance = axios.create({
  baseURL: api,
  timeout: 10000,

  withCredentials: true,
});

//request interceptor
apiclient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = useAppStore.getState().user;
    const token: string | undefined = user?.accessToken;
    //add auth header
    if (!token || token == undefined) {
      return Promise.reject("login");
    }
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// add a response interceptor
apiclient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      //check token issue and redirect to login page
      const errorResponse = error.response.data as ErrorResponseData;
      const errorMessage: string = errorResponse?.message;

      if (
        errorMessage.includes(
          "No access token attached to the request. Log in"
        ) ||
        errorMessage.includes("Invalid token. Please Log in and try again") ||
        errorMessage.includes("User not found. Log in again") ||
        errorMessage.includes(
          "Unauthorized. Please Log in and try again. Get CU"
        )
      ) {
        return Promise.reject("login");
      }
      return Promise.reject(error.response); // Pass the error back to the calling function
    } else {
      return Promise.reject(error);
    }
  }
);
export default apiclient;
