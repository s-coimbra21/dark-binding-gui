import { createSelector } from 'reselect';
import { RootState } from '@types';

import { defaultGroup } from '@groups/selectors';

const lcu = (state: RootState) => state.lcu;

export const lcuStatus = createSelector(
  lcu,
  defaultGroup,
  ({ credentials, summoner }, defaultGroup) => {
    if (!credentials) return 'closed';

    const { port, password } = credentials;

    if (!port || !password) return 'closed';
    if (!summoner || !defaultGroup) return 'loggedOut';

    return 'loggedIn';
  }
);
