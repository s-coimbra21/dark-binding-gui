declare module '*.scss' {
  const classNames: { [name: string]: string };

  export default classNames;
}

declare module 'semver' {
  export type SemVer = any;
}

declare module 'react-hextech' {
  export const Button: React.ComponentType<any>;
}

declare interface Credentials {
  port: number;
  password: string;
}

declare interface LockfileData extends Credentials {
  summoner?: string;
}

declare namespace NodeJS {
  interface Global {
    credentials?: LockfileData;
  }
}
