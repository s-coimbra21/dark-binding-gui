// import os from 'os';
// import { autoUpdater } from 'electron-updater';
// import { dispatchToRenderer, env } from 'utils';

// import { newVersion, updateProgress } from 'actions/app';

// const debug = require('debug')('lsv:AutoUpdater');

// export default function AutoUpdater (browserWindow) {
//   if (!env.isProd()) {
//     return;
//   }

//   const platform = os.platform();
//   if (platform === 'linux') {
//     // ¯\_(ツ)_/¯ sorry blitzcrankBot
//     return;
//   }

//   (browserWindow || global.mainWindow).webContents.once('did-finish-load', () => {
//     autoUpdater.checkForUpdates();
//   });

//   autoUpdater.addListener('update-available', () => {
//     debug('New update available');
//     dispatchToRenderer(newVersion());
//   });
//   autoUpdater.addListener('update-not-available', () => {
//     debug('No new updates');
//   });
//   autoUpdater.addListener('update-downloaded', () => {
//     debug('Quitting to install new update');
//     autoUpdater.quitAndInstall();
//     return true;
//   });
//   autoUpdater.addListener('download-progress', progress => {
//     debug('Update Progress', progress);
//     dispatchToRenderer(updateProgress(Math.floor(progress.percent) || 0));
//   });
//   autoUpdater.addListener('error', error => {
//     debug(error);
//   });
// }
