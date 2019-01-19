type ChampionId = string;

declare interface BindingGroup {
  name: string;
  champions: ChampionId[];
  settings?: InputSettings;
}

declare interface GroupsState {
  hasChanges: boolean;
  groups: BindingGroup[];
}
