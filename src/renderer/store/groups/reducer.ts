import { get, set, cloneDeep, mapValues } from 'lodash';

import { createReducer } from '@utils/create-reducer';
import { updateInputSettings } from '@utils/parse-binding';
import store from '@utils/store';

import * as actions from './actions';

const initialState: GroupsState = {
  hasChanges: false,
  championGroups: store.get('championGroups', {}),
  groups: store.get('groups', {}),
};

export default createReducer(initialState, actions)({
  loadGroups: state => ({
    ...state,
    championGroups: store.get('championGroups'),
    groups: store.get('groups'),
    hasChanges: false,
  }),
  saveGroups: state => {
    store.set('groups', state.groups);
    store.set('championGroups', state.championGroups);

    return { ...state, hasChanges: false };
  },
  addGroup: (state, { name, group = cloneDeep(state.groups.default) }) => ({
    ...state,
    hasChanges: true,
    groups: { ...state.groups, [name]: group },
  }),
  renameGroup: (state, { oldName, nextName }) => {
    const championGroups = mapValues(state.championGroups, assignedGroup =>
      assignedGroup === oldName ? nextName : assignedGroup
    );

    const groups = { ...state.groups };

    groups[nextName] = groups[oldName];

    delete groups[oldName];

    return {
      ...state,
      groups,
      championGroups,
    };
  },
  deleteGroup: (state, name) => {
    const championGroups = mapValues(state.championGroups, assignedGroup =>
      assignedGroup === name ? 'default' : assignedGroup
    );

    delete state.groups[name];

    return {
      ...state,
      championGroups,
      groups: { ...state.groups },
    };
  },
  assignChampion: (state, { championId, group }) => {
    if (
      (!state.championGroups[championId] ||
        state.championGroups[championId] === 'default') &&
      group === 'default'
    ) {
      return state;
    }

    const championGroups = { ...state.championGroups };

    if (championGroups[championId] === group) {
      delete championGroups[championId];
    } else {
      championGroups[championId] = group;
    }

    return {
      ...state,
      hasChanges: true,
      championGroups,
    };
  },
  updateDefaultGroup: (state, defaultGroup) => ({
    ...state,
    groups: {
      ...state.groups,
      default: defaultGroup,
    },
  }),
  changeBinding: (state, { groupName, path, value, allowDuplicates }) => {
    const groups = state.groups;
    const group = groups[groupName];

    updateInputSettings(group, path, value, allowDuplicates);

    groups[groupName] = { ...group };

    return {
      ...state,
      hasChanges: true,
      groups,
    };
  },
  changeQuickcast: (state, { groupName, dataKey }) => {
    const groups = state.groups;
    const group = groups[groupName];

    set(
      group,
      ['Quickbinds', dataKey + 'smart'],
      !get(group, ['Quickbinds', dataKey + 'smart'])
    );

    groups[groupName] = { ...group };

    return {
      ...state,
      hasChanges: true,
      groups,
    };
  },
});
