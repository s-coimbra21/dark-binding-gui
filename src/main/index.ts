import { app } from 'electron';

app.setAppUserModelId('com.jinx.binding');

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  require('./lcu-proxy');
  const { getMainWindow } = require('./main-window');

  getMainWindow();
});
