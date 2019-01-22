import { createStandardAction, createAction } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { RootState } from '@types';
import { replace } from 'connected-react-router';
import { cloneDeep } from 'lodash';

export const addGroup = createStandardAction('@@groups/addGroup')<{
  group: BindingGroup;
  name: string;
}>();

export const loadGroups = createStandardAction('@@groups/loadGroups')();

export const saveGroups = createStandardAction('@@groups/saveGroups')();

export const updateDefaultGroup = createStandardAction(
  '@@groups/updateDefaultGroup'
)<InputSettings>();

export const discardChanges = (redirect?: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  if (getState().groups.hasChanges) {
    dispatch(loadGroups());
  }

  if (redirect) dispatch(replace(redirect));
};

export const createGroup = (groupName: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { groups } = getState();
  const defaultGroup = groups.groups.default;

  if (!defaultGroup) {
    // handle error... eventually

    return;
  }

  const sanitizedName = groupName.replace('.', '').trim();

  if (!sanitizedName) return;

  let name = sanitizedName;
  let suffix = 0;

  while (groups.groups[name]) {
    suffix++;
    name = sanitizedName + ` (${suffix})`;
  }

  dispatch(addGroup({ name, group: cloneDeep(defaultGroup) }));
  dispatch(saveGroups());
};

export const changeBinding = createAction(
  '@@groups/changeBinding',
  resolve => (groupName: string, path: string, value: Binding[]) =>
    resolve({ groupName, path, value })
);

export const changeQuickcast = createAction(
  '@@groups/changeQuickcast',
  resolve => (groupName: string, dataKey: string) =>
    resolve({ groupName, dataKey })
);
