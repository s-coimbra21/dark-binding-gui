import axios, { AxiosRequestConfig } from 'axios';

let httpsAgent: any;
if (typeof window === 'undefined') {
  httpsAgent = require('https').Agent({
    rejectUnauthorized: false,
    keepAlive: true,
    keepAliveMsecs: 60000,
  });
}

const getURL = () => {
  if (global.credentials) {
    const { password, port } = global.credentials;

    return `https://riot:${password}@127.0.0.1:${port}`;
  }

  return `lcu://`;
};

async function request<T>(path: string, options?: AxiosRequestConfig) {
  const response = await axios(path, {
    // @ts-ignore
    baseURL: getURL(),
    httpsAgent,
    ...options,
  });

  return response.data as Promise<T>;
}

export const get = <ResponseType>(path: string, options?: RequestInit) => () =>
  request<ResponseType>(path, { ...options, method: 'GET' });

export const patch = <BodyType, ResponseType>(
  path: string,
  options?: Partial<RequestInit>
) => (data: BodyType) =>
  request<ResponseType>(path, {
    ...options,
    data,
    method: 'PATCH',
  });

export const post = <BodyType, ResponseType>(
  path: string,
  options?: Partial<RequestInit>
) => (data: BodyType) =>
  request<ResponseType>(path, {
    ...options,
    data,
    method: 'POST',
  });
