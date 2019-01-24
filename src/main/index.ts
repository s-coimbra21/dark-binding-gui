import { app } from 'electron';

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  require('./lcu-proxy');
  const { getMainWindow } = require('./main-window');

  getMainWindow();
});
