import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { RootState } from '@types';

import { createRootReducer } from './reducers';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

export const history = createHashHistory();

const routerMiddleware = createRouterMiddleware(history);

const enhancer = compose(
  applyMiddleware(routerMiddleware, thunkMiddleware, loggerMiddleware)
);

export default function configureStore(initialState: Partial<RootState>) {
  const rootReducer = createRootReducer(history);

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').createRootReducer(history))
    );
  }

  return store;
}
