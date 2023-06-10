import { EventCallback, UpdateEvent } from '.';

class WebSocketManager {
  private static instance: WebSocketManager;
  private websocket: WebSocket | null = null;
  private callbacks: Map<string, EventCallback<any>> = new Map();
  private topicRegexMap: Map<string, RegExp> = new Map<string, RegExp>();
  private index = 1;

  private getIndex(): number {
    this.index = this.index + 1;
    return this.index;
  }

  private constructor() {
    this.initTopicRegexMap();
  }

  private initTopicRegexMap(): void {
    this.topicRegexMap.set('aggTrade', /@aggTrade$/);
    this.topicRegexMap.set(
      'markPriceUpdate',
      /(@markPrice|!markPrice)@arr(@\d+s)?$/,
    );
    this.topicRegexMap.set('kline', /@kline_([\w\d]+)$/);
    this.topicRegexMap.set('24hrTicker', /(@ticker$)|(!ticker@arr(@\d+s)?)$/);
    this.topicRegexMap.set(
      '24hrMiniTicker',
      /(@miniTicker$)|(!miniTicker@arr(@\d+s)?)$/,
    );
    // Add more mappings for other topic patterns and event names
  }

  private callCallbackFunctions(arg: UpdateEvent | UpdateEvent[]): void {
    let event: UpdateEvent;
    if (Array.isArray(arg)) {
      event = arg[0];
    } else {
      event = arg;
    }
    if (!this.isUpdateEvent(event)) return;
    for (const [topicName, callbackFunction] of this.callbacks) {
      const regex = this.topicRegexMap.get(event.e);
      if (regex && regex.test(topicName)) {
        callbackFunction(arg);
      }
    }
  }

  private isUpdateEvent(event: unknown): event is UpdateEvent {
    const { e, E, s } = event as UpdateEvent;
    return e !== undefined && s !== undefined && E !== undefined;
  }

  static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  connect() {
    return new Promise<void>((resolve, reject) => {
      try {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
          resolve();
        }
        this.websocket = new WebSocket('wss://fstream.binance.com/ws');

        this.websocket.onopen = () => {
          console.log('Connected.');
          resolve();
        };
        this.websocket.onmessage = (event) => {
          const data = JSON.parse(event.data);

          this.callCallbackFunctions(data);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  subscribe<T extends UpdateEvent>(
    topicName: string,
    callback: EventCallback<T>,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
          return reject({ message: 'No valid connection' });
        }
        if (this.callbacks.get(topicName)) {
          return reject({
            message: `Already subscribed to the topic ${topicName}`,
          });
        }

        this.callbacks.set(topicName, callback);

        const request = {
          method: 'SUBSCRIBE',
          params: [topicName],
          id: this.getIndex(),
        };

        this.websocket.send(JSON.stringify(request));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  unsubscribe(topic: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
          resolve();
        }
        this.callbacks.delete(topic);

        const request = {
          method: 'UNSUBSCRIBE',
          params: [topic],
          id: 1,
        };

        this.websocket?.send(JSON.stringify(request));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  close(): void {
    if (this.callbacks.size > 0)
      this.callbacks.forEach((_callback, topic) => this.unsubscribe(topic));
    if (this.websocket) {
      this.websocket.close();
    }
    this.callbacks.clear();
  }
}

export default WebSocketManager;
