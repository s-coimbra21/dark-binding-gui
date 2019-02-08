import WebSocket from 'ws';
import logger from 'electron-log';
import { Connector } from './connector';

export type EventType = 'Create' | 'Update' | 'Delete';

export type WAMPMessage = [
  number,
  string,
  {
    eventType: EventType;
    uri: string;
    data: any;
  }
];

// The list of events we dispatch, in the format of [uri, eventType, eventName].
export const EVENTS: [string, EventType, string][] = [
  ['/lol-champ-select/v1/session', 'Update', 'champSelect'],
  ['/lol-gameflow/v1/gameflow-phase', 'Update', 'gameFlow'],
];

export class LeagueMonitor extends Connector {
  public state: LCUState = {
    champions: [],
    gameFlow: 'None',
  };
  private socket?: WebSocket;
  private connected = false;
  private watchTimer?: NodeJS.Timer;

  constructor() {
    super();

    this.on('connect', (settings: Credentials) => {
      this.lockfile = settings;
      this.state.credentials = settings;

      // Check if league is running every 5s.
      this.watchTimer = setInterval(() => {
        if (!this.connected) this.monitor_connect();
      }, 5000);

      this.monitor_connect();

      setImmediate(() => this.pollLogin());
    });

    this.on('login', data => {
      this.state = { ...this.state, ...data };
    });

    this.on('disconnect', () => {
      this.lockfile = undefined;
      delete this.state.credentials;
      this.monitor_disconnect();
    });
  }

  protected async monitor_disconnect() {
    if (this.connected) {
      this.socket!.close();
    }
    clearInterval(this.watchTimer!);
  }

  /**
   * Checks if league is running, and connects to the websocket if it is.
   * @returns {Promise<void>}
   */
  protected async monitor_connect() {
    if (!this.lockfile || this.connected) return;

    this.socket = new WebSocket(
      `wss://riot:${this.lockfile!.password}@127.0.0.1:${this.lockfile!.port}`,
      'wamp',
      { rejectUnauthorized: false }
    );

    this.socket.onopen = this.onSocketConnect;
    this.socket.onclose = this.onSocketDisconnect;
    this.socket.onmessage = this.onSocketMessage;
    this.socket.onerror = this.onSocketError;
  }

  /**
   * Called when we receive a websocket message.
   * @returns {Promise<void>}
   */
  private onSocketMessage = async (ev: { data: any }) => {
    let message: WAMPMessage;
    try {
      message = JSON.parse(ev.data as string);
    } catch (e) {
      logger.debug('[-] League socket sent invalid JSON?');
      return;
    }

    // We're only interested in events.
    if (message[0] !== 8 || message[1] !== 'OnJsonApiEvent') return;

    // Check if we found an event.
    for (const [uri, type, event] of EVENTS) {
      if (message[2].uri === uri && message[2].eventType === type) {
        this.emit(event, message[2].data);
      }
    }
  };

  /**
   * Called when the websocket successfully connects.
   * @returns {Promise<void>}
   */
  private onSocketConnect = async () => {
    logger.debug('[+] Connected to League client.');

    if (!this.socket) return;

    this.connected = true;
    this.socket.send(`[5,"OnJsonApiEvent"]`);
    this.emit('monitor-connect');
  };

  /**
   * Called when the websocket disconnects.
   * @returns {Promise<void>}
   */
  private onSocketDisconnect = async () => {
    logger.debug('[-] Disconnected from League client.');

    this.connected = false;
    this.emit('monitor-disconnect');
  };

  private onSocketError = async () => {
    this.socket!.terminate();
  };
}

export const monitor = new LeagueMonitor();
