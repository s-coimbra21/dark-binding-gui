import WebSocket from 'ws';
import logger from 'electron-log';
import { EventEmitter } from 'events';

type EventType = 'Create' | 'Update' | 'Delete';

type WAMPMessage = [
  number,
  string,
  {
    eventType: EventType;
    uri: string;
    data: any;
  }
];

// The list of events we dispatch, in the format of [uri, eventType, eventName].
const EVENTS: [string, EventType, string][] = [
  ['/lol-champ-select/v1/session', 'Update', 'champSelect'],
  ['/lol-gameflow/v1/gameflow-phase', 'Update', 'gameFlow'],
];

export class LeagueMonitor extends EventEmitter {
  private socket?: WebSocket;
  private connected = false;
  private watchTimer: NodeJS.Timer;

  constructor() {
    super();

    // Check if league is running every 5s.
    this.watchTimer = setInterval(() => {
      if (this.connected) return;
      this.connect();
    }, 5000);

    // Check immediately without waiting 5s.
    this.connect();
  }

  public on(event: 'connect', handler: () => any): this;
  public on(event: 'disconnect', handler: () => any): this;

  public on(
    event: 'champSelect',
    handler: (data: ChampSelectPacket) => any
  ): this;

  public on(event: 'gameFlow', handler: (data: string) => any): this;

  public on(event: string, handler: (...args: any[]) => void): this {
    return super.on(event, handler);
  }

  public emit(event: string, ...args: any[]) {
    return super.emit(event, ...args);
  }

  public async disconnect() {
    if (this.connected) {
      this.socket!.close();
    }
    clearInterval(this.watchTimer);
  }

  /**
   * Checks if league is running, and connects to the websocket if it is.
   * @returns {Promise<void>}
   */
  public async connect() {
    if (!global.credentials || this.connected) return;

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    this.socket = new WebSocket(
      `wss://riot:${global.credentials.password}@127.0.0.1:${
        global.credentials.port
      }`,
      'wamp'
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
  private onSocketMessage = async (ev: { data: WebSocket.Data }) => {
    let message: WAMPMessage;
    try {
      message = JSON.parse(<string> ev.data);
    } catch (e) {
      logger.log('[-] League socket sent invalid JSON?');
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
    logger.log('[+] Connected to League client.');

    if (!this.socket) return;

    this.connected = true;
    this.socket.send(`[5,"OnJsonApiEvent"]`);
    this.emit('connect');
  };

  /**
   * Called when the websocket disconnects.
   * @returns {Promise<void>}
   */
  private onSocketDisconnect = async () => {
    logger.log('[-] Disconnected from League client.');

    this.connected = false;
    this.emit('disconnect');
  };

  private onSocketError = async () => {
    this.socket!.terminate();
  };
}
