import { createStandardAction, createAction } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { RootState } from '@types';
import { replace } from 'connected-react-router';

export const addGroup = createStandardAction('@@groups/addGroup')<{
  group?: BindingGroup;
  name: string;
}>();

export const renameGroup = createStandardAction('@@groups/renameGroup')<{
  oldName: string;
  nextName: string;
}>();

export const deleteGroup = createStandardAction('@@groups/deleteGroup')<
  string
>();

export const loadGroups = createStandardAction('@@groups/loadGroups')();

export const saveGroups = createStandardAction('@@groups/saveGroups')();

export const updateDefaultGroup = createStandardAction(
  '@@groups/updateDefaultGroup'
)<InputSettings>();

export const assignChampion = createStandardAction('@@groups/assignChampion')<{
  championId: number;
  group: string;
}>();

export const discardChanges = (redirect?: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  if (getState().groups.hasChanges) {
    dispatch(loadGroups());
  }

  if (redirect) dispatch(replace(redirect));
};

const getFinalGroupName = (
  initialName: string,
  groups: Record<string, InputSettings>
) => {
  const sanitizedName = initialName.replace('.', '').trim();

  if (!sanitizedName || sanitizedName.toLowerCase() === 'default') return;

  let name = sanitizedName;
  let suffix = 0;

  while (groups[name]) {
    suffix++;
    name = sanitizedName + ` (${suffix})`;
  }

  return name;
};

export const changeName = (nextName: string, oldName?: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  if (!oldName || nextName === oldName) return;

  const { groups } = getState();

  const finalName = getFinalGroupName(nextName, groups.groups);

  if (!finalName) return;

  dispatch(renameGroup({ oldName, nextName: finalName }));
  dispatch(saveGroups());
};

export const removeGroup = (groupName: string) => (dispatch: Dispatch) => {
  dispatch(deleteGroup(groupName));
  dispatch(saveGroups());
};

export const createGroup = (groupName: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { groups } = getState();
  const name = getFinalGroupName(groupName, groups.groups);

  if (!name) return;

  dispatch(addGroup({ name }));
  dispatch(saveGroups());
};

export const changeBinding = createAction(
  '@@groups/changeBinding',
  resolve => (
    groupName: string,
    path: string,
    value: Binding[],
    allowDuplicates = false
  ) => resolve({ groupName, path, value, allowDuplicates })
);

export const changeQuickcast = createAction(
  '@@groups/changeQuickcast',
  resolve => (groupName: string, dataKey: string) =>
    resolve({ groupName, dataKey })
);
