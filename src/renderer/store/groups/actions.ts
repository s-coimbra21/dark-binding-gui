import { createStandardAction } from 'typesafe-actions';

export const addGroup = createStandardAction('@@groups/addGroup')<string>();

export const loadGroups = createStandardAction('@@groups/loadGroups')();

export const saveGroups = createStandardAction('@@groups/saveGroups')();
