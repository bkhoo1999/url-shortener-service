import axios, { Method, ResponseType } from "axios";

export class FetchUtil {
  callFetch = (request: FetchRequest) => {
    const headers = {};
    if (request.method !== "GET") {
      headers["Content-Type"] = "application/json";
    }
    return new Promise<any>((resolve, reject) => {
      axios({
        url: request.url,
        method: request.method,
        headers,
        params: request.params,
        responseType: request.responseType,
        data: request.body,
        timeout: request.timeout || 0,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export interface FetchRequest {
  url: string;
  method: Method;
  params?: GenericObject;
  body?: GenericObject;
  responseType?: ResponseType;
  timeout?: number;
}

type GenericObject = Record<string, any>;

const FetchUtilClass = new FetchUtil();

export default FetchUtilClass;
