import { useLocalStorage } from "@/composables/useLocalStorage";
import { ACCESS_TOKEN } from "@/constants";
import axios, { AxiosInstance } from "axios";
import { history } from "./history";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "content-type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    const tokenStorage = useLocalStorage(ACCESS_TOKEN);
    config.headers["Authorization"] = "Bearer " + tokenStorage.getItem();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   history.push("/login");
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
