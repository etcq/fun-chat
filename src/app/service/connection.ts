import { v4 as uuidv4 } from 'uuid';
import { type Callback, type Subscriptions, type typeOfRequest, type UserData } from '../utils/types';
import { parseData } from '../utils/parse-data';
import GetUsers from './get-users';
import Auth from './auth';
import MessagesService from './messages';
import Reconnect from '../components/reconnect/reconnect';

class Connection {
  public getUsers;
  public auth;
  public messages;
  private socket;
  private authData: UserData | undefined;
  private subscriptions: Subscriptions;
  private reconnectInterval;
  private reconnectView;
  constructor() {
    this.reconnectView = new Reconnect();
    this.socket = new WebSocket('ws://127.0.0.1:4000');
    this.getUsers = new GetUsers(this);
    this.auth = new Auth(this);
    this.messages = new MessagesService(this);
    this.authData = undefined;
    this.subscriptions = [];
    this.reconnectInterval = 1000;
    this.messageListener();
  }

  public get getSocket(): WebSocket {
    return this.socket;
  }

  public get nickname(): string | undefined {
    console.log(this.authData);
    return this.authData?.login;
  }

  public subscribe(type: typeOfRequest, callback: Callback): void {
    this.subscriptions.push({ type, callback });
  }

  private reconnect(): void {
    this.reconnectView.showRecconect();
    setTimeout(() => {
      console.log('reconnecting');
      this.socket = new WebSocket('ws://127.0.0.1:4000');
      this.messageListener();
      this.reconnectInterval = Math.min(this.reconnectInterval * 2, 30_000);
    }, this.reconnectInterval);
  }

  private messageListener(): void {
    this.socket.addEventListener('open', () => {
      console.log('connection open');
      this.auth.checkAuth(uuidv4());
      this.reconnectInterval = 1000;
      this.reconnectView.hideRecconect();
    });
    this.socket.addEventListener('error', () => {
      this.socket.close();
    });
    this.socket.addEventListener('close', () => {
      console.log('connection close');
      this.reconnect();
    });
    this.socket.addEventListener('message', (event) => {
      const response = parseData(event.data);
      if (!response) {
        return;
      }

      for (const sub of this.subscriptions) {
        if (sub.type === response.type) {
          sub.callback(response);
        }
      }
    });
  }
}

const connection = new Connection();
export { type Connection };
export default connection;
