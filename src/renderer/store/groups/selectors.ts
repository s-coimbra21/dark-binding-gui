import { invertBy, reduce } from 'lodash';
import { RootState } from '@types';
import { createSelector } from 'reselect';
import * as lcuSelectors from '@lcu/selectors';

export const groups = (state: RootState) => state.groups;

export const championsGroups = (state: RootState) =>
  state.groups.championGroups;

export const unassignedChampions = createSelector(
  [lcuSelectors.champions, championsGroups],
  (champions = [], championsGroups) =>
    champions.filter(c => championsGroups[c.id])
);

export const championsByGroup = createSelector(
  [lcuSelectors.championsById, championsGroups, unassignedChampions],
  (championsById, championsGroups, unassigned) => {
    const inverted = reduce(
      invertBy(championsGroups),
      (result, value, key) => {
        result[key] = value.map(id => championsById[+id]);

        return result;
      },
      {} as Record<string, Champion[]>
    );

    if (!inverted.default) {
      inverted.default = unassigned;
    } else {
      inverted.default = inverted.default.concat(unassigned);
    }

    return inverted;
  }
);

export const bindingGroups = createSelector(
  groups,
  groups => groups.groups
);

export const defaultGroup = createSelector(
  bindingGroups,
  groups => groups.default
);

export const userGroups = createSelector(
  bindingGroups,
  championsByGroup,
  (groups, championsByGroup) =>
    Object.entries(groups)
      .filter(([name]) => name !== 'default')
      .map(([name, settings]) => [name, settings, championsByGroup[name]]) as [
      string,
      InputSettings,
      Champions
    ][]
);
