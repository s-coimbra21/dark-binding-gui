import {
  app,
  Tray,
  Menu,
  Notification,
  nativeImage,
  NotificationConstructorOptions,
} from 'electron';
import { platform } from 'os';
import { join } from 'path';
import { showMainWindow } from './main-window';

const isWin = platform() === 'win32';

const icon = nativeImage.createFromPath(
  join(__static, isWin ? 'icons/dark-binding.png' : 'icons/16.png')
);

export const tray = new Tray(icon);

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Open',
    type: 'normal',
    click: () => showMainWindow(),
  },
  { label: 'Exit', type: 'normal', click: () => app.quit() },
]);

tray.setToolTip('Manage your League of Legends keybindings');
tray.setContextMenu(contextMenu);

app.on('window-all-closed', () => {
  tray.displayBalloon({
    title: 'Window closed',
    content: 'Dark Binding is still running in the background',
  });
});

export const showNotification = (options: NotificationConstructorOptions) =>
  new Notification({
    silent: true,
    ...options,
  }).show();
