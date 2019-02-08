import { BrowserWindow } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

import { getInitialWindowDimensions } from './window-scale';

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | void;

export function getMainWindow() {
  if (mainWindow) return mainWindow;

  const { dimensions, scale } = getInitialWindowDimensions();

  const window = new BrowserWindow({
    show: isDevelopment,
    width: dimensions.width,
    //  maxWidth: 1600,
    minWidth: 1024,
    height: dimensions.height,
    //  maxHeight: 900,
    minHeight: 540,
    frame: false,
    resizable: false,
    fullscreenable: false,
    hasShadow: false,
    webPreferences: {
      zoomFactor: scale,
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      webaudio: false,
      webgl: false,
    },
  });

  if (isDevelopment) {
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]).then(() =>
      window.webContents.openDevTools()
    );
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    );
  }

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  window.webContents.on('did-finish-load', () => {
    window.show();
  });

  window.on('closed', () => {
    mainWindow = undefined;
  });

  mainWindow = window;

  return window;
}

export const showMainWindow = () => {
  if (mainWindow) {
    mainWindow.show();
  }

  getMainWindow();
};
