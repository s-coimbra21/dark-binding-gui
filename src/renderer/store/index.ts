import { ipcRenderer } from 'electron';
import logger from 'electron-log';

import configureStore, { history } from './configure-store';
import * as lcu from '@lcu/actions';
import * as groups from '@groups/actions';

const store = configureStore({});

ipcRenderer.on('lcu-connect', (evt: any, state: LCUState) => {
  logger.debug('LCU Found');

  global.credentials = state.credentials;

  store.dispatch(lcu.up(state));
});

ipcRenderer.on(
  'lcu-login',
  (evt: any, data: { summoner: number; champions: Champions }) => {
    logger.debug('LCU Login detected');

    store.dispatch(lcu.login(data.summoner, data.champions));
  }
);

ipcRenderer.on('lcu-disconnect', () => {
  logger.debug('LCU Disconnected');

  store.dispatch(lcu.down());
});

ipcRenderer.on('lcu-game-settings', (evt: any, settings: InputSettings) => {
  logger.debug('Received new LCU default group');

  store.dispatch(groups.updateDefaultGroup(settings));
});

ipcRenderer.send('lcu-hydrate');

export { history };

export default store;
