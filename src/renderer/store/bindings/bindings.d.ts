declare type Binding = string;

declare interface Control {
  label: string;
  section: string;
  dataKey: string;
}

declare interface PrimaryBinding extends Control {
  quickCast: string;
}

declare interface Section {
  label?: string;
  twoSets?: boolean;
  controls: (Control | PrimaryBinding)[];
}

declare interface InputSettings {
  GameEvents: {
    [key: string]: string;
  };
  Quickcast: {
    [key: string]: boolean;
  };
}
