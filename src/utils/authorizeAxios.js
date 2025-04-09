import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "./formatter";
const authorizeAxiosInstance = axios.create();
//thoi gian cho toi da 1 request la 10p
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;

//withCredentials: cho phep axios tu dong gui cookie trong moi request len BE
authorizeAxiosInstance.defaults.withCredentials = true;

//cau hinh interceptors
// Add a request interceptor: can thiep vao giua cac request
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor: can thiep vao giua cac response
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    //moi status code nam ngoai 200-299 se la loi va chay vao day
    console.log("error", error);
    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }
    //dung toastify de hien thi loi tru loi 410 - GONE phuc vu viec tu dong refresh token
    if (error.response?.status !== 410) {
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default authorizeAxiosInstance;
