import { ipcMain, WebContents } from 'electron';
import logger from 'electron-log';

import { Connector } from '@utils/lcu-connector';

logger.debug('starting LCU Connector');

const connector = new Connector();

connector.on('connect', (settings: LockfileData) => {
  logger.debug('LCU connected, updating main process cache');

  global.credentials = settings;

  connector.on('login', (summoner: string) => {
    if (!global.credentials) return;

    global.credentials.summoner = summoner;
  });

  connector.on('disconnect', () => {
    logger.debug('LCU disconnected, updating main process cache');

    global.credentials = undefined;
  });
});

ipcMain.on('lcu-subscribe', (event: { sender: WebContents }) => {
  const webContents = event.sender;

  if (global.credentials) webContents.send('lcu-connect', global.credentials);

  const handleConnect = (settings: LockfileData) => {
    logger.debug('LCU connected, notifying renderer');

    webContents.send('lcu-connect', settings);
  };

  const handleDisconnect = () => {
    webContents.send('lcu-disconnect');
  };

  const handleLogin = (summoner: string) => {
    webContents.send('lcu-login', summoner);
  };

  connector.on('connect', handleConnect);
  connector.on('login', handleLogin);
  connector.on('disconnect', handleDisconnect);

  webContents.once('destroyed', () => {
    connector.off('connect', handleConnect);
    connector.off('login', handleLogin);
    connector.off('disconnect', handleDisconnect);
  });
});

connector.start();
