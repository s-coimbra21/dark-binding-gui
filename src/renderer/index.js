import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { TitleBar } from '@components/TitleBar';

import 'normalize.css/normalize.css';
import './hextech.css';

import store, { history } from './store';
import Routes from './routes';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <TitleBar />
        <Routes />
      </Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
