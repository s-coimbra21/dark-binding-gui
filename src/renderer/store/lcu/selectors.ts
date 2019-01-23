import { createSelector } from 'reselect';
import { RootState } from '@types';

const lcu = (state: RootState) => state.lcu;

export const champions = (state: RootState) => state.lcu.champions;

export const championsById = createSelector(
  champions,
  (champions = []) =>
    champions.reduce<Record<ChampionId, Champion>>((result, champion) => {
      result[champion.id] = champion;

      return result;
    }, {})
);

export const lcuStatus = createSelector(
  lcu,
  ({ credentials, summoner }) => {
    if (!credentials) return 'closed';

    const { port, password } = credentials;

    if (!port || !password) return 'closed';
    if (!summoner) return 'loggedOut';

    return 'loggedIn';
  }
);
