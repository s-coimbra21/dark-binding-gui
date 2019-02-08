import { app, dialog } from 'electron';
import logger from 'electron-log';
import * as fs from 'fs-extra';
import { join } from 'path';

import store from '@utils/store';
import * as api from '@utils/lcu/api';

import { monitor } from './lcu-toolkit';
import { showNotification } from './notifications';
import { firstTimeSetup } from './first-time-setup';
import { broadcast } from './utils';

const replaceConfig = async (group: string) => {
  const settings = store.get(`groups.${group}`);
  logger.debug(`patching settings to group ${group}`, settings);

  if (!settings)
    return dialog.showErrorBox(
      'Dark Binding',
      `Could not find a group named ${group}`
    );

  const lockPath = join(app.getPath('userData'), 'lock');

  try {
    const lock = await fs.readFile(lockPath, 'utf8').catch(() => null);

    if (lock !== group) {
      logger.debug(
        'input settings patched',
        await api.inputSettings.patch(settings)
      );

      showNotification({
        title: 'Bindings Applied',
        body: `Switched bindings to ${group}`,
      });

      await fs.writeFile(lockPath, group, 'utf8');
    }
  } catch (e) {
    logger.error(e);
    dialog.showErrorBox('Dark Binding', `Could not apply group ${group}`);
  }
};

const restoreConfig = async (config = store.get('groups.default')) => {
  logger.debug('restoring settings');
  const lockPath = join(app.getPath('userData'), 'lock');

  try {
    const isLocked = await fs.pathExists(lockPath);
    if (isLocked) {
      const group = await fs.readFile(lockPath, 'utf8');
      store.set(`store.${group}`, await api.inputSettings.get());
      broadcast('lcu-input-settings');
    }
  } catch (e) {
    showNotification({
      title: 'Error',
      body: 'Could not synchronize settings changed during the game',
    });
  } finally {
    fs.unlink(lockPath);
  }
  try {
    await api.inputSettings.patch(config);

    showNotification({
      title: 'Bindings Restored',
      body:
        'Your bindings have been restored. Changes made during the game have been applied',
    });
  } catch (e) {
    dialog.showErrorBox('Dark Binding', 'Error restoring settings to default');
  }
};

monitor.on('login', ({ settings }) => {
  firstTimeSetup(settings);

  logger.debug('Binding Manager started');

  showNotification({
    title: 'Ready',
    body: 'You can now go into champion select!',
  });
});

monitor.on('champSelect', async data => {
  if (data.timer.phase !== 'FINALIZATION') return;

  logger.debug('received champion select packet');

  const self = data.myTeam.find(
    player => +player.summonerId === +monitor.state.summoner!
  )!;

  if (!self || !self.championId) return;

  const groupName = store.get('championGroups')[self.championId] || 'default';

  logger.debug(`applying config: ${groupName}`);

  await replaceConfig(groupName);
});

monitor.on('gameFlow', status => {
  logger.debug('gameFlow', status);
  if (status === 'WaitingForStats' || status === 'TerminatedInError') {
    restoreConfig();

    return;
  }
});
