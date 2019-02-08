import { ipcMain, WebContents } from 'electron';
import logger from 'electron-log';

import { broadcast } from '../utils';
import { connector } from './connector';

logger.debug('starting LCU Connector');

const state: LCUState = {
  champions: [],
};

connector.on('connect', (credentials: Credentials) => {
  logger.debug('LCU connected, updating main process cache');

  global.credentials = credentials;
  state.credentials = credentials;

  broadcast('lcu-connect', { credentials });
});

connector.on('login', ({ summoner, settings, champions }) => {
  logger.debug('LCU logged in, ready to handle requests');

  state.summoner = summoner;
  state.champions = champions;

  broadcast('lcu-login', { summoner, settings, champions });
});

connector.on('disconnect', () => {
  logger.debug('LCU disconnected, updating main process cache');

  global.credentials = undefined;

  broadcast('lcu-disconnect');
});

ipcMain.on('lcu-hydrate', (event: { sender: WebContents }) => {
  const webContents = event.sender;

  webContents.send('lcu-connect', state);
});

connector.start();
