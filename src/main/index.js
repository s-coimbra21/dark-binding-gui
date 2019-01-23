import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

import { getInitialWindowDimensions } from './window-scale';

const isDevelopment = process.env.NODE_ENV !== 'production';

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

// quit application when all windows are closed
app.on('window-all-closed', () => {
  app.quit();
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  require('./lcu-proxy');
  const { createMainWindow } = require('./main-window');

  mainWindow = createMainWindow();
});
