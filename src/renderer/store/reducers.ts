import { combineReducers, AnyAction, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { RootState } from '@types';

import lcu from './lcu/reducer';
import groups from './groups/reducer';

export const createRootReducer = (history: History<any>) =>
  combineReducers<RootState>({
    lcu,
    groups,
    router: connectRouter(history) as Reducer<RouterState, AnyAction>,
  });
