import { app, dialog } from 'electron';
import logger from 'electron-log';
import * as fs from 'fs-extra';
import { join } from 'path';

import { LeagueMonitor } from '@utils/lcu-ws';
import { inputSettings } from '@utils/lcu-api';
import store from '@utils/store';

import { connector } from './lcu-proxy';
import { showNotification } from './notifications';

const replaceConfig = async (group: string) => {
  const settings = store.get(`groups.${group}`);

  if (!settings)
    return dialog.showErrorBox(
      'Dark Binding',
      `Could not find a group named ${group}`
    );

  const lockPath = join(app.getPath('userData'), 'lock');

  try {
    const lock = await fs.readFile(lockPath, 'utf8').catch(() => false);

    if (lock !== group) {
      await inputSettings.patch(settings);

      showNotification({
        title: 'Bindings Applied',
        body: `Switched bindings to ${group}`,
      });

      await fs.writeFile(lockPath, group, 'utf8');
    }
  } catch (e) {
    dialog.showErrorBox('Dark Binding', `Could not apply group ${group}`);
  }
};

const restoreConfig = async (config = store.get('groups.default')) => {
  const lockPath = join(app.getPath('userData'), 'lock');

  try {
    const isLocked = await fs.pathExists(lockPath);

    if (isLocked) {
      const group = await fs.readFile(lockPath, 'utf8');

      store.set(`store.${group}`, await inputSettings.get());
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
    await inputSettings.patch(config);

    showNotification({
      title: 'Bindings Restored',
      body:
        'Your bindings have been restored. Changes made during the game have been applied',
    });
  } catch (e) {
    dialog.showErrorBox('Dark Binding', 'Error restoring settings to default');
  }
};

export const start = (summonerId: number, settings: InputSettings) => {
  logger.debug('starting binding manager');
  const monitor = new LeagueMonitor();

  monitor.on('connect', () =>
    showNotification({
      title: 'Ready',
      body: 'You can now go into champion select!',
    })
  );

  monitor.on('champSelect', async data => {
    if (data.timer.phase !== 'FINALIZATION') return;

    logger.debug('received champion select packet');

    const self = data.myTeam.find(
      player => +player.summonerId === +summonerId
    )!;

    if (!self || !self.championId) return;

    const groupName = store.get('championGroups')[self.championId] || 'default';

    logger.debug(`applying config: ${groupName}`);

    await replaceConfig(groupName);
  });

  monitor.on('gameFlow', status => {
    if (status === 'WaitingForStats') {
      restoreConfig();

      return;
    }

    if (status === 'TerminatedInError') {
      // think about this case
      restoreConfig();

      return;
    }
  });

  connector.on('disconnect', () => {
    monitor.removeAllListeners();
    monitor.disconnect();
  });
};
