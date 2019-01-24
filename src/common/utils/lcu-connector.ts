import logger from 'electron-log';

import * as api from './lcu-api';
import { sleep } from './sleep';

const LCUConnector = require('lcu-connector');

export class Connector extends LCUConnector {
  public lockfile?: Credentials;

  public on(event: 'connect', handler: (lockfile: Credentials) => any): this;
  public on(event: 'disconnect', handler: () => any): this;
  public on(
    event: 'login',
    handler: (
      data: { summoner: number; settings: InputSettings; champions: Champions }
    ) => any
  ): this;
  public on(event: string, handler: (...args: any[]) => void): this {
    return super.on(event, handler);
  }

  constructor(executablePath?: string) {
    super(executablePath);

    this.on('connect', (settings: Credentials) => {
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
      const summoner = await api.summoner.currentSummoner();
      logger.debug('Found LCU summoner name', summoner);

      this.pollSettings(+summoner.summonerId);
    } catch (e) {
      await sleep(5000);
      this.pollLogin();
    }
  }

  private async pollSettings(summonerId: number) {
    if (!this.lockfile) return;
    logger.debug('Polling LCU input settings');

    try {
      const settings = await api.inputSettings.get();
      logger.debug('Found LCU input settings', settings);
      const champions = await api.champions.get(/* summonerId */);
      logger.debug('Found LCU champions list', champions);

      this.emit('login', { summoner: summonerId, settings, champions });
    } catch (e) {
      await sleep(5000);
      this.pollLogin();
    }
  }
}
