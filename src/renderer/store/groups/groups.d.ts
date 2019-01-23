type ChampionId = number;

declare type BindingGroup = InputSettings;
declare type GroupByChampion = Record<ChampionId, string>;
declare type ChampionIdsByGroup = Record<string, string[]>;

declare interface GroupsState {
  hasChanges: boolean;
  // championId -> groupName
  championGroups: GroupByChampion;
  groups: Record<string, BindingGroup>;
}
