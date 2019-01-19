import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '@types';

import { lcuStatus } from '@lcu/selectors';

interface IntroProps {
  lcuStatus: 'closed' | 'loggedOut' | 'loggedIn';
}

const Intro: FC<IntroProps> = ({ lcuStatus }) => {
  if (lcuStatus === 'loggedIn') return <Redirect to="/dashboard" />;

  if (lcuStatus === 'loggedOut') {
    return (
      <h1>Login on the League Client to start managing your keybindings</h1>
    );
  }

  return <h1>Waiting for the League Client...</h1>;
};

export default connect<IntroProps, {}, {}, RootState>(state => ({
  lcuStatus: lcuStatus(state),
}))(Intro);
