import { RootState } from '@types';
import { createSelector } from 'reselect';

export const groups = (state: RootState) => state.groups;

export const defaultGroup = createSelector(
  groups,
  groups => groups.groups.default
);
