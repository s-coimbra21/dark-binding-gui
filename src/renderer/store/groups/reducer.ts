import { get, set } from 'lodash';

import { createReducer } from '@utils/create-reducer';
import { updateInputSettings } from '@utils/parse-binding';
import store from '@utils/store';

import * as actions from './actions';

const initialState: GroupsState = {
  hasChanges: false,
  championGroups: store.get('champions', {}),
  groups: store.get('groups', {}),
};

export default createReducer(initialState, actions)({
  loadGroups: state => ({
    ...state,
    groups: store.get('groups'),
    hasChanges: false,
  }),
  saveGroups: state => {
    store.set('groups', state.groups);

    return { ...state, hasChanges: false };
  },
  addGroup: (state, { name, group }) => ({
    ...state,
    hasChanges: true,
    groups: { ...state.groups, [name]: group },
  }),
  updateDefaultGroup: (state, defaultGroup) => ({
    ...state,
    groups: {
      ...state.groups,
      default: defaultGroup,
    },
  }),
  changeBinding: (state, { groupName, path, value }) => {
    const groups = state.groups;
    const group = groups[groupName];

    updateInputSettings(group, path, value);

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
