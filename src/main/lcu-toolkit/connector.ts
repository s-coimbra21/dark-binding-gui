import { app, dialog } from 'electron';
import logger from 'electron-log';
import { EventEmitter } from 'events';
import { join } from 'path';
import { readFile } from 'fs-extra';

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

  constructor() {
    super();

    // @ts-ignore
    this._onFileCreated = async (path: string) => {
      const config = await readFile(
        // @ts-ignore
        join(this._dirPath, 'Config/LeagueClientSettings.yaml'),
        'utf8'
      );

      if (config.match(/region:\W*"KR"/gi)) {
        dialog.showMessageBox({
          type: 'error',
          message:
            'Unfortunately, 3rd Party LCU applications are not available in your region, the app will now exit',
          buttons: ['I understand'],
        });
        return app.exit(1);
      }

      // @ts-ignore
      return super._onFileCreated(path);
    };
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
