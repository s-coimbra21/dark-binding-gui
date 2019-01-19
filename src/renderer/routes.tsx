import React, { FC, memo } from 'react';
import { Switch, Route } from 'react-router';

import Intro from './views/Intro';
import Dashboard from './views/Dashboard';
import Editor from './views/Editor';

const Routes: FC = memo(() => (
  <Switch>
    <Route path="/" component={Intro} exact />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/editor/:group" component={Editor} />
  </Switch>
));

export default Routes;
