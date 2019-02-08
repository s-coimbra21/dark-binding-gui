import fetchPonyfill from 'fetch-ponyfill';

const { fetch } = fetchPonyfill();

let agent: any;
if (typeof window === 'undefined') {
  agent = require('https').Agent({
    rejectUnauthorized: false,
    keepAlive: true,
    keepAliveMsecs: 60000,
  });
}

const getURL = (path: string) => {
  if (global.credentials) {
    const { password, port } = global.credentials;

    return `https://riot:${password}@127.0.0.1:${port}${path}`;
  }

  return `lcu:/${path}`;
};

async function request<T>(path: string, options?: RequestInit | undefined) {
  const url = getURL(path);

  const response = await fetch(url, {
    keepalive: true,
    // @ts-ignore
    agent,
    ...options,
  });

  return response.json() as Promise<T>;
}

export const get = <ResponseType>(path: string, options?: RequestInit) => () =>
  request<ResponseType>(path, { ...options, method: 'GET' });

export const patch = <BodyType, ResponseType>(
  path: string,
  options?: Partial<RequestInit>
) => (body: BodyType) =>
  request<ResponseType>(path, {
    ...options,
    body: JSON.stringify(body),
    method: 'PATCH',
  });

export const post = <BodyType, ResponseType>(
  path: string,
  options?: Partial<RequestInit>
) => (body: BodyType) =>
  request<ResponseType>(path, {
    ...options,
    body: JSON.stringify(body),
    method: 'POST',
  });
