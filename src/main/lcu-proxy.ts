import { app, ipcMain, webContents, WebContents } from 'electron';
import http from 'http';
import connect from 'connect';
import url from 'url';
import logger from 'electron-log';

import { Connector } from '@utils/lcu-connector';
import { baseRequest } from '@utils/lcu-request';
import store from '@utils/store';

import { start } from './binding-manager';

logger.debug('starting LCU Connector');

export const connector = new Connector();

const connectApp = connect();
let server = http.createServer(connectApp);

connectApp.use((req: http.IncomingMessage, res: http.ServerResponse) => {
  if (!req.url) return res.writeHead(400);

  const path = url.parse(req.url).pathname;

  if (!path || !path.includes('/lol-game-data/assets'))
    return res.writeHead(500);

  baseRequest({ uri: path!, encoding: null }).pipe(res);
});

server.listen();

const broadcast = (event: string, data?: any) => {
  webContents.getAllWebContents().forEach(win => win.send(event, data));
};

const firstTimeSetup = (settings: InputSettings) => {
  const setupFinished = store.get('_setupFinished', false);
  if (setupFinished) return;

  try {
    store.set('groups.default', settings);
    broadcast('lcu-game-settings', settings);
    store.set('_setupFinished', true);
  } catch (e) {
    return app.exit(1);
  }
};

const state: LCUState = {
  champions: [],
};

connector.on('connect', (credentials: Credentials) => {
  logger.debug('LCU connected, updating main process cache');

  global.credentials = credentials;
  state.credentials = credentials;

  broadcast('lcu-connect', credentials);
});

connector.on('login', ({ summoner, settings, champions }) => {
  firstTimeSetup(settings);
  start(summoner, settings);

  state.summoner = summoner;
  state.champions = champions;

  broadcast('lcu-login', { summoner, settings, champions });
});

connector.on('disconnect', () => {
  logger.debug('LCU disconnected, updating main process cache');

  global.credentials = undefined;

  broadcast('lcu-disconnect');
});

ipcMain.on('lcu-subscribe', (event: { sender: WebContents }) => {
  const webContents = event.sender;

  if (global.credentials) webContents.send('lcu-connect', state);
});

connector.start();
