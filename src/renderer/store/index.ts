import { ipcRenderer } from 'electron';
import logger from 'electron-log';

import configureStore, { history } from './configure-store';
import * as lcu from '@lcu/actions';

const store = configureStore({});

ipcRenderer.on('lcu-connect', (evt: any, settings: LockfileData) => {
  logger.debug('LCU Found');

  global.credentials = settings;

  store.dispatch(lcu.up(settings as LCUState));
});

ipcRenderer.on('lcu-login', (evt: any, summoner: string) => {
  logger.debug('LCU Login detetcted');

  (global.credentials as any).summoner = summoner;

  store.dispatch(lcu.login(summoner));
});

ipcRenderer.on('lcu-disconnect', () => {
  logger.debug('LCU Disconnected');

  store.dispatch(lcu.down());
});

ipcRenderer.send('lcu-subscribe');

export { history };

export default store;
