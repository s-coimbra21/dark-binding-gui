type Diff<
  T extends string | number | symbol,
  U extends string | number | symbol
> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends string | number | symbol> = Pick<T, Diff<keyof T, K>>;

declare module '*.scss' {
  const classNames: { [name: string]: string };

  export default classNames;
}

declare module 'semver' {
  export type SemVer = any;
}

declare module 'fuzzysearch' {
  const fuzzysearch: (needle: string, haystack: string) => boolean;

  export default fuzzysearch;
}

declare module 'react-hextech' {
  export const Button: React.ComponentType<any>;

  interface SwitcherItem {
    label: string;
    value?: string;
  }

  interface SwitcherProps {
    value?: SwitcherItem;
    items: SwitcherItem[];
    onChange: (nextValue: SwitcherItem) => any;
  }

  interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
    value?: boolean;
  }

  export const Switcher: React.ComponentType<SwitcherProps>;
  export const Checkbox: React.ComponentType<CheckboxProps>;

  interface Option<T = any> {
    label?: string;
    value: T;
    [key: string]: any;
  }

  interface DropdownProps<T = any> {
    className?: any;
    placeholder?: string | false;
    hideIcon?: boolean;
    tabIndex?: number;
    disabled?: boolean;
    value?: any;
    onChange?: (nextValue: Option<T>) => void;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onToggle?: (nextOpen: boolean) => void;
    options?: Option<T>[];
    transparent?: boolean;
    isOpen?: boolean;
  }

  export const Dropdown: React.ComponentType<DropdownProps>;

  export const TextInput: React.ComponentType<any>;
}

declare interface Credentials {
  port: number;
  password: string;
}

declare namespace NodeJS {
  interface Global {
    credentials?: Credentials;
    defaultSettings?: InputSettings;
    proxyPort: number;
  }
}

declare var __static: string;
