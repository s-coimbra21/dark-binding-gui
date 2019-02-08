import { ipcRenderer } from 'electron';
import logger from 'electron-log';

import configureStore, { history } from './configure-store';
import * as lcu from '@lcu/actions';
import * as groups from '@groups/actions';

const store = configureStore({});

ipcRenderer.on('lcu-sync', (evt: any, state: LCUState) => {
  store.dispatch(lcu.up(state));
});

ipcRenderer.on('lcu-disconnect', () => {
  logger.debug('LCU Disconnected');

  store.dispatch(lcu.down());
});

ipcRenderer.on(
  'lcu-default-input-settings',
  (evt: any, settings: InputSettings) => {
    logger.debug('Received new LCU default group');

    store.dispatch(groups.updateDefaultGroup(settings));
  }
);

ipcRenderer.on('lcu-input-settings', () => {
  store.dispatch(groups.loadGroups());
});

ipcRenderer.send('lcu-hydrate');

export { history };

export default store;
