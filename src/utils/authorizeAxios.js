import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "./formatter";
import { refreshTokenAPI } from "~/apis";
import { LogoutUserAPI, selectCurrentUser } from "~/redux/user/userSlice";

let axiosReduxStore;
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore;
};
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

let refreshTokenPromise = null;

// Add a response interceptor: can thiep vao giua cac response
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    //moi status code nam ngoai 200-299 se la loi va chay vao day
    // console.log("error", error);
    interceptorLoadingElements(false);

    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(LogoutUserAPI(false));
    }

    const originalRequest = error.config;

    if (error.response?.status === 410 && !originalRequest._retry) {
      //410 Gone: token da het han, can phai refresh token
      originalRequest._retry = true;
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            return data?.accessToken;
          })
          .catch((err) => {
            axiosReduxStore.dispatch(LogoutUserAPI(false));
            return Promise.reject(err);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      return refreshTokenPromise.then((accessToken) => {
        return authorizeAxiosInstance(originalRequest);
      });
    }
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
