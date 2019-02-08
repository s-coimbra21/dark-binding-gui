import { createReducer } from '@utils/create-reducer';

import * as actions from './actions';

const initialState: LCUState = { champions: [], gameFlow: 'None' };

export default createReducer(initialState, actions)({
  up: (state, payload) => ({
    ...state,
    ...payload,
  }),
  down: () => initialState,
});
