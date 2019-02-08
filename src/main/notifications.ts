import {
  app,
  Tray,
  Menu,
  Notification,
  nativeImage,
  NotificationConstructorOptions,
} from 'electron';
import AutoLauncher from 'auto-launch';
import { platform } from 'os';
import { join } from 'path';
import { showMainWindow } from './main-window';
import logger from 'electron-log';

const isWin = platform() === 'win32';

const icon = nativeImage.createFromPath(
  join(__static, isWin ? 'icons/dark-binding.png' : 'icons/16.png')
);

export let tray = new Tray(icon);

const launcher = new AutoLauncher({ name: 'Dark Binding' });

const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Open',
    type: 'normal',
    click: () => showMainWindow(),
  },
  {
    label: 'Run on system startup',
    type: 'checkbox',
    checked: true,
    click: handleRunOnStartClick,
  },
  { label: 'Exit', type: 'normal', click: () => app.quit() },
]);

tray.setToolTip('Manage your League of Legends keybindings');

launcher.isEnabled().then(isEnabled => {
  logger.debug(`current run on startup status: ${isEnabled}`);

  contextMenu.items[1].checked = isEnabled;

  tray.setContextMenu(contextMenu);
});

app.on('window-all-closed', () => {
  showNotification({
    title: 'Window closed',
    body: 'Dark Binding is still running in the background',
  });
});

export function showNotification(options: NotificationConstructorOptions) {
  new Notification({
    silent: true,
    icon: isWin ? icon : undefined,
    ...options,
  }).show();
}

async function handleRunOnStartClick() {
  const status = contextMenu.items[1].checked;

  logger.debug(`Changing run on startup starting to ${status}`);

  if (!status) await launcher.disable();
  if (status) await launcher.enable();
}

setInterval(() => {
  if (tray.isDestroyed()) tray = new Tray(icon);
}, 30000);
