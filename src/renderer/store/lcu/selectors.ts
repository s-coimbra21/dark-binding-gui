import { createSelector } from 'reselect';
import { RootState } from '@types';

const lcu = (state: RootState) => state.lcu;

export const lcuStatus = createSelector(
  lcu,
  ({ port, password, summoner }) => {
    if (!port || !password) return 'closed';
    if (!summoner) return 'loggedOut';

    return 'loggedIn';
  }
);
