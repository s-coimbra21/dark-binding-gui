import { createAction } from 'typesafe-actions';

export const up = createAction('@@lcu/up', resolve => (settings: LCUState) =>
  resolve(settings)
);

export const down = createAction('@@lcu/down');

export const login = createAction(
  '@@lcu/login',
  resolve => (summonerId: number, champions: Champions) =>
    resolve({ summonerId, champions })
);
