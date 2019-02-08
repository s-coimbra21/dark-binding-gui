import { ipcMain, WebContents } from 'electron';
import logger from 'electron-log';

import { broadcast } from '../utils';
import { monitor } from './ws';

logger.debug('starting LCU monitor');

monitor.on('connect', (credentials: Credentials) => {
  logger.debug('LCU connected, updating main process cache');

  global.credentials = credentials;

  broadcast('lcu-sync', { credentials });
});

monitor.on('login', ({ summoner, gameFlow, champions }) => {
  logger.debug('LCU logged in, ready to handle requests');

  broadcast('lcu-sync', { summoner, gameFlow, champions });
});

monitor.on('gameFlow', gameFlow => {
  monitor.state.gameFlow = gameFlow;

  broadcast('lcu-sync', { gameFlow });
});

monitor.on('disconnect', () => {
  logger.debug('LCU disconnected, updating main process cache');

  global.credentials = undefined;

  broadcast('lcu-disconnect');
});

ipcMain.on('lcu-hydrate', (event: { sender: WebContents }) => {
  const webContents = event.sender;

  webContents.send('lcu-sync', monitor.state);
});

// @ts-ignore
monitor.start();
