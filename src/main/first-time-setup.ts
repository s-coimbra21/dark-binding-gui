import { app, dialog } from 'electron';
import store from '@utils/store';

import { broadcast } from './utils';

const SETUP_KEY = '_setupFinished';

const checkIfNeeded = () => store.get(SETUP_KEY, false);

export const firstTimeSetup = (settings: InputSettings, force?: boolean) => {
  const setupFinished = checkIfNeeded() || force;

  if (setupFinished) {
    if (!store.get('groups.default')) store.set('groups.default', settings);
  }

  try {
    store.set('groups.default', settings);
    broadcast('lcu-default-input-settings', settings);
    store.set(SETUP_KEY, true);
  } catch (e) {
    dialog.showErrorBox(
      'Fatal Error',
      'An error ocurred while performing the first time setup'
    );
    return app.exit(1);
  }
};
