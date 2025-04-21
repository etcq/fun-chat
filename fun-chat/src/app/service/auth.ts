import { type UserData, typeOfRequest } from '../utils/types';
import { isValidUser } from '../utils/validate-functions';
import getRequestBody from '../utils/configure-request-body';
import type { Connection } from './connection';
export default class Auth {
  private connection;
  private authData: UserData | undefined;
  constructor(connection: Connection) {
    this.connection = connection;
    this.authData = undefined;
  }

  public get getAuthData(): UserData | undefined {
    return this.authData;
  }

  public set setAuthData(data: unknown) {
    if (!isValidUser(data)) {
      return;
    }
    this.authData = data;
  }

  public checkAuth(id: string): void {
    const storage = sessionStorage.getItem('fun-chat');
    if (storage) {
      const data: unknown = JSON.parse(storage);
      if (isValidUser(data)) {
        this.authData = data;
        this.auth(id, data);
      }
    }
  }

  public auth(id: string, data: unknown): void {
    if (!isValidUser(data)) {
      return;
    }
    const requestBody = getRequestBody(id, typeOfRequest.USER_LOGIN, data);
    this.authData = data;
    this.connection.getSocket.send(JSON.stringify(requestBody));
  }

  public logOut(id: string): void {
    const requestBody = getRequestBody(id, typeOfRequest.USER_LOGOUT, this.authData);
    sessionStorage.removeItem('fun-chat');
    this.connection.getSocket.send(JSON.stringify(requestBody));
  }
}
