import {
  app,
  Tray,
  Menu,
  MenuItem,
  Notification,
  nativeImage,
  NotificationConstructorOptions,
} from 'electron';
import AutoLauncher from 'auto-launch';
import { platform } from 'os';
import { join } from 'path';
import { showMainWindow } from './main-window';

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
    label: 'Run on start',
    type: 'checkbox',
    checked: false,
    click: handleRunOnStartClick,
  },
  { label: 'Exit', type: 'normal', click: () => app.quit() },
]);

tray.setToolTip('Manage your League of Legends keybindings');
tray.setContextMenu(contextMenu);
tray.setHighlightMode('always');

launcher.isEnabled().then(isEnabled => {
  contextMenu.items[1].checked = isEnabled;
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

async function handleRunOnStartClick(item: MenuItem) {
  if (item.checked) launcher.disable();
  if (!item.checked) launcher.enable();

  contextMenu.items[1].checked = !item.checked;
}

setInterval(() => {
  if (tray.isDestroyed()) tray = new Tray(icon);
}, 30000);
