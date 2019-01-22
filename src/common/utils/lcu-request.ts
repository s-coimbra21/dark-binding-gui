import { RequestCallback } from 'request';
import req, { Options } from 'request-promise';

export { Options };

export const baseRequest = (options: Options, callback?: RequestCallback) => {
  const { port, password } = global.credentials!;
  const authorization = new Buffer(`riot:${password}`).toString('base64');

  return req(
    {
      baseUrl: `https://127.0.0.1:${port}`,
      headers: {
        Authorization: `Basic ${authorization}`,
        Referer: `https://127.0.0.1:${port}/index.html`,
      },
      rejectUnauthorized: false,
      ...options,
    },
    callback
  );
};

export function request<T = any>(
  uri: string,
  options?: Partial<Options>,
  forceCredentials?: Credentials,
  callback?: RequestCallback
) {
  return (baseRequest(
    {
      ...options,
      uri,
      json: true,
    },
    callback
  ) as unknown) as Promise<T>;
}

export const get = <ResponseType>(
  path: string,
  options?: Partial<Options>
) => () => request<ResponseType>(path, { ...options, method: 'GET' });

export const patch = <BodyType, ResponseType>(
  path: string,
  options?: Partial<Options>
) => (body: BodyType) =>
  request<ResponseType>(path, { ...options, body, method: 'PATCH' });

export const post = <BodyType, ResponseType>(
  path: string,
  options?: Partial<Options>
) => (body: BodyType) =>
  request<ResponseType>(path, { ...options, method: 'POST' });

export default request;
