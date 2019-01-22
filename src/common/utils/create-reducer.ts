import { Reducer, AnyAction } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { ActionCreator, StringOrSymbol } from 'typesafe-actions/dist/types';

type ActionMap = { [key: string]: ActionType<any> };
type Handlers<S, T extends ActionMap> = {
  [K in keyof T]?: T[K] extends ActionCreator<StringOrSymbol>
    ? (
        prevState: S,
        payload: ReturnType<T[K]>['payload'],
        meta: ReturnType<T[K]>['meta']
      ) => S
    : T[K] extends object
    ? Handlers<S, T[K]>
    : never
};

export function createReducer<S, T extends ActionMap>(
  initialState: S | undefined,
  actions: T
): (handlers: Handlers<S, T>) => Reducer<S, ActionType<T>> {
  return handlers => {
    const actionTypes: any = {};

    const processHandlers = (handlerGroup: any) => {
      Object.keys(actions).forEach(key => {
        if (typeof handlerGroup[key] === 'object') {
          return Object.assign(actionTypes, processHandlers(handlerGroup[key]));
        }

        if (!handlerGroup[key]) return;

        actionTypes[getType(actions[key])] = handlerGroup[key];
      });
    };

    processHandlers(handlers);

    return (state: S | undefined = initialState, action: AnyAction) => {
      if (actionTypes[action.type]) {
        return actionTypes[action.type](state, action.payload, action.meta);
      }

      return state;
    };
  };
}
