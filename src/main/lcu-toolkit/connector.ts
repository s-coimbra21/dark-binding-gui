import logger from 'electron-log';
import { EventEmitter } from 'events';

import { sleep } from '@utils/sleep';

import * as api from '@utils/lcu/api';

const LCUConnector: typeof EventEmitter = require('lcu-connector');

export class Connector extends LCUConnector {
  public lockfile?: Credentials;

  /* Connector */
  public on(event: 'connect', handler: (lockfile: Credentials) => any): this;
  public on(event: 'disconnect', handler: () => any): this;
  public on(
    event: 'login',
    handler: (data: {
      summoner: number;
      settings: InputSettings;
      champions: Champions;
      gameFlow: string;
    }) => any
  ): this;

  /* Monitor */
  public on(event: 'monitor-connect', handler: () => any): this;
  public on(event: 'monitor-disconnect', handler: () => any): this;

  public on(
    event: 'champSelect',
    handler: (data: ChampSelectPacket) => any
  ): this;

  public on(event: 'gameFlow', handler: (data: string) => any): this;

  public on(event: string, handler: (...args: any[]) => void): this {
    return super.on(event, handler);
  }

  constructor(executablePath?: string) {
    // @ts-ignore
    super(executablePath);
  }

  protected async pollLogin() {
    if (!this.lockfile) return;
    logger.debug('Polling LCU summoner name');

    try {
      const summoner = await api.summoner.currentSummoner();
      logger.debug('Found LCU summoner name', summoner);

      this.pollSettings(+summoner.summonerId);
    } catch (e) {
      logger.error(e);
      await sleep(5000);
      this.pollLogin();
    }
  }

  protected async pollSettings(summonerId: number) {
    if (!this.lockfile) return;
    logger.debug('Polling LCU input settings');

    try {
      const settings = await api.inputSettings.get();
      logger.debug('Found LCU input settings');
      const champions = await api.champions.get(summonerId);
      logger.debug('Found LCU champions list');
      const gameFlow = await api.gameFlow.phase();

      this.emit('login', {
        summoner: summonerId,
        settings,
        champions,
        gameFlow,
      });
    } catch (e) {
      logger.error(e);
      await sleep(5000);
      this.pollLogin();
    }
  }
}
