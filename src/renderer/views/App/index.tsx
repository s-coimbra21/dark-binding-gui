import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { RootState } from '@types';

import { lcuStatus } from '@lcu/selectors';

const styles = require('./index.scss');

interface AppProps {
  updateProgress?: number;
  lcuStatus: ReturnType<typeof lcuStatus>;
}

const App: FC<AppProps> = ({ lcuStatus, updateProgress, children }) => {
  if (updateProgress) {
    return (
      <div className={styles.app}>
        <h1>Updating {updateProgress}%</h1>
      </div>
    );
  }

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
  updateProgress: state.lcu.updateProgress,
}))(App);
