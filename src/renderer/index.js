import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { webFrame } from 'electron';

import { TitleBar } from '@components/TitleBar';

import './hextech.css';

import store, { history } from './store';
import routes from './routes';
import { ContextMenuProvider } from './containers/ContextMenu';

webFrame.registerURLSchemeAsPrivileged('lcu');

render(
  <Provider store={store}>
    <ContextMenuProvider>
      <ConnectedRouter history={history}>{routes()}</ConnectedRouter>
    </ContextMenuProvider>
  </Provider>,
  document.getElementById('app')
);
