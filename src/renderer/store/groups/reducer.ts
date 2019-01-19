import Store from 'electron-store';
import { createReducer } from '@utils/create-reducer';

import * as actions from './actions';

const store = new Store();

const initialState: GroupsState = {
  hasChanges: false,
  groups: [],
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
  addGroup: (state, payload) => {
    let name = payload;
    let suffix = 0;

    while (state.groups.findIndex(g => g.name === name) !== -1) {
      suffix++;
      name = payload + ` (${suffix})`;
    }

    return {
      ...state,
      hasChanges: true,
      groups: state.groups.concat([{ name, champions: [] }]),
    };
  },
});
