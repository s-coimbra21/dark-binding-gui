import React from 'react';
import { Switch, Route } from 'react-router';

import { TitleBar } from '@components/TitleBar';

import App from './views/App';
import Dashboard from './views/Dashboard';
import Editor from './views/Editor';

const routes = () => (
  <TitleBar>
    <App>
      <Switch>
        <Route path="/editor/:group" component={Editor} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </App>
  </TitleBar>
);

export default routes;
