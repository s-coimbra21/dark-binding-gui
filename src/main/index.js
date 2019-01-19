import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

import { getInitialWindowDimensions } from './window-scale';
import { createMainWindow } from './main-window';

import './lcu-proxy';

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

// quit application when all windows are closed
app.on('window-all-closed', () => {
  app.quit();
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
});
