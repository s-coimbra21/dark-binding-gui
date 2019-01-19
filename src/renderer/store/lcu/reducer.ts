import { createReducer } from '@utils/create-reducer';

import * as actions from './actions';

const initialState: LCUState = { username: 'riot' };

export default createReducer(initialState, actions)({
  up: (state, payload) => payload,
  down: () => initialState,
  login: (state, summoner) => ({ ...state, summoner }),
});
