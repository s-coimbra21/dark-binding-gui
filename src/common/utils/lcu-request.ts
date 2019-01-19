import { RequestCallback } from 'request';
import req, { Options } from 'request-promise';

export { Options };

export function request<T = any>(
  uri: string,
  options?: Partial<Options>,
  forceCredentials?: Credentials,
  callback?: RequestCallback
) {
  const credentials = global.credentials || forceCredentials;

  if (!credentials) return Promise.reject(new Error('LCU not ready'));

  const { port, password } = credentials;

  const authorization = new Buffer(`riot:${password}`).toString('base64');

  return (req(
    Object.assign(
      {
        uri,
        baseUrl: `https://127.0.0.1:${port}`,
        headers: {
          authorization: `Basic ${authorization}`,
          Referer: `https://127.0.0.1:${port}/index.html`,
        },
        rejectUnauthorized: false,
        json: true,
      },
      options
    )
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
