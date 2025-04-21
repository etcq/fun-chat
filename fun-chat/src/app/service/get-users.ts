import { typeOfRequest } from '../utils/types';
import { type Connection } from './connection';
export default class GetUsers {
  private connection;
  constructor(connection: Connection) {
    this.connection = connection;
  }

  public getAuthUsers(messageId: string): void {
    const requestBody = {
      id: messageId.toString(),
      type: typeOfRequest.USER_ACTIVE,
      // eslint-disable-next-line unicorn/no-null
      payload: null,
    };
    this.connection.getSocket.send(JSON.stringify(requestBody));
  }

  public getUnauthUsers(messageId: string): void {
    const requestBody = {
      id: messageId.toString(),
      type: typeOfRequest.USER_INACTIVE,
      // eslint-disable-next-line unicorn/no-null
      payload: null,
    };
    this.connection.getSocket.send(JSON.stringify(requestBody));
  }
}
