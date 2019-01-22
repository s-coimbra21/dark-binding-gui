import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { TitleBar } from '@components/TitleBar';

import './hextech.css';

import store, { history } from './store';
import routes from './routes';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>{routes()}</ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
