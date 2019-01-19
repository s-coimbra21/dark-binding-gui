import logger from 'electron-log';

import { chat } from './lcu-api';
import { sleep } from './sleep';

const LCUConnector = require('lcu-connector');

export class Connector extends LCUConnector {
  public lockfile?: LockfileData;

  constructor(executablePath?: string) {
    super(executablePath);

    this.on('connect', (settings: LockfileData) => {
      this.lockfile = settings;

      this.pollLogin();
    });

    this.on('disconnect', () => {
      this.lockfile = undefined;
    });
  }

  private async pollLogin() {
    if (!this.lockfile) return;
    logger.debug('Polling LCU summoner name');

    try {
      const summoner = await chat.me();
      logger.debug('Found LCU summoner name', summoner);

      this.emit('login', summoner.id);
    } catch (e) {
      await sleep(5000);
      this.pollLogin();
    }
  }
}
