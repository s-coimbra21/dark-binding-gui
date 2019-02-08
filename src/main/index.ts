import { app } from 'electron';

import './lcu-toolkit';
import { checkForUpdates } from './auto-update';

app.setAppUserModelId('com.jinx.binding');

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  require('./binding-manager');
  const { getMainWindow } = require('./main-window');

  checkForUpdates(getMainWindow());
});
