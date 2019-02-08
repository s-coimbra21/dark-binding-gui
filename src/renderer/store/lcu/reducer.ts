import { createReducer } from '@utils/create-reducer';

import * as actions from './actions';

const initialState: LCUState = { champions: [] };

export default createReducer(initialState, actions)({
  up: (state, payload) => ({
    ...state,
    ...payload,
  }),
  down: () => initialState,
  login: (state, { summonerId, champions }) => ({
    ...state,
    summoner: summonerId,
    champions,
  }),
});
