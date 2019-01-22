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

declare namespace NodeJS {
  interface Global {
    credentials?: Credentials;
    defaultSettings?: InputSettings;
  }
}

declare var __static: string;
