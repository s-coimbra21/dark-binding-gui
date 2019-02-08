import { dialog, BrowserWindow, shell } from 'electron';
import os from 'os';
import logger from 'electron-log';
import { autoUpdater } from 'electron-updater';

import { isDev } from '@utils/env';
import { broadcast } from './utils';

autoUpdater.autoDownload = false;
autoUpdater.logger = logger;

const promptUpdate = (wnd: BrowserWindow) =>
  !dialog.showMessageBox(wnd, {
    title: 'New Update',
    message:
      'A new update is available, would you like to install it?\nVisit https://github.com/s-coimbra21/dark-binding-gui/releases for release notes',
    buttons: ['Yes', 'No'],
    defaultId: 0,
  });

export function checkForUpdates(mainWindow: BrowserWindow) {
  if (isDev) {
    return;
  }

  const platform = os.platform();
  if (platform === 'linux') {
    // ¯\_(ツ)_/¯ sorry blitzcrankBot
    return;
  }

  autoUpdater.addListener('update-available', () => {
    logger.debug('New update available');

    if (promptUpdate(mainWindow)) {
      if (platform === 'darwin') {
        shell.openExternal(
          'https://github.com/s-coimbra21/dark-binding-gui/releases'
        );

        return;
      }

      autoUpdater.downloadUpdate();
    }
  });

  autoUpdater.addListener('update-not-available', () => {
    logger.debug('No new updates');
  });

  autoUpdater.addListener('update-downloaded', () => {
    logger.debug('Quitting to install new update');

    autoUpdater.quitAndInstall();
  });

  autoUpdater.addListener('download-progress', progress => {
    logger.debug('Update Progress', progress);

    broadcast('lcu-sync', { updateProgress: progress.percent });
  });

  autoUpdater.addListener('error', error => {
    logger.debug(error);
  });

  autoUpdater.checkForUpdates();
}
