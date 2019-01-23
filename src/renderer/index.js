import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { TitleBar } from '@components/TitleBar';

import './hextech.css';

import store, { history } from './store';
import routes from './routes';
import { ipcRenderer } from 'electron';
import { ContextMenuProvider } from './containers/ContextMenu';

global.proxyPort = ipcRenderer.sendSync('proxy-port');

render(
  <Provider store={store}>
    <ContextMenuProvider>
      <ConnectedRouter history={history}>{routes()}</ConnectedRouter>
    </ContextMenuProvider>
  </Provider>,
  document.getElementById('app')
);
