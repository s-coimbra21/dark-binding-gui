type ChampionId = string;

declare type BindingGroup = InputSettings;

declare interface GroupsState {
  hasChanges: boolean;
  // championId -> groupName
  championGroups: Record<ChampionId, string>;
  groups: Record<string, BindingGroup>;
}
