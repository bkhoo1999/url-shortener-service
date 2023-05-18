import { AxiosInstance } from "axios";

const onRequest = (config: any) => config;

const onRequestError = (error: any) => {
  throw new Error(error);
};

const onResponse = (response: any) => response;

const onResponseError = (error: any) => {
  const response = error?.response?.data;
  throw response?.error || "No error message returned.";
};

export function interceptor(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
