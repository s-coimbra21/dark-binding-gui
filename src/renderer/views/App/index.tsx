import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { RootState } from '@types';

import { lcuStatus } from '@lcu/selectors';

const styles = require('./index.scss');

interface AppProps {
  lcuStatus: ReturnType<typeof lcuStatus>;
}

const App: FC<AppProps> = ({ lcuStatus, children }) => {
  if (lcuStatus === 'loggedIn') return <Fragment>{children}</Fragment>;

  return (
    <div className={styles.app}>
      {lcuStatus === 'closed' && <h1>Waiting for the League Client...</h1>}
      {lcuStatus === 'loggedOut' && (
        <h1>Login on the League Client to start managing your keybindings</h1>
      )}
      {lcuStatus === 'inGame' && <h1>Waiting for your game to finish</h1>}
    </div>
  );
};

export default connect<AppProps, {}, {}, RootState>(state => ({
  lcuStatus: lcuStatus(state),
}))(App);
