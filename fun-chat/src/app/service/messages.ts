import getRequestBody from '../utils/configure-request-body';
import { type MessageData, typeOfRequest, type UserData } from '../utils/types';
import { type Connection } from './connection';

export default class MessagesService {
  private connection;
  constructor(connection: Connection) {
    this.connection = connection;
  }

  public getMessageHistory(id: string, userData: UserData): void {
    const requestBody = getRequestBody(id, typeOfRequest.MSG_FROM_USER, userData);
    this.connection.getSocket.send(JSON.stringify(requestBody));
  }

  public messageReaded(id: string, messageID: string): void {
    const requestBody = {
      id: id,
      type: typeOfRequest.MSG_READ,
      payload: {
        message: {
          id: messageID,
        },
      },
    };
    this.connection.getSocket.send(JSON.stringify(requestBody));
  }

  public sendMessage(id: string, messageData: Pick<MessageData, 'to' | 'text'>): void {
    const requestBody = {
      id: id,
      type: typeOfRequest.MSG_SEND,
      payload: {
        message: {
          to: messageData.to,
          text: messageData.text,
        },
      },
    };
    this.connection.getSocket.send(JSON.stringify(requestBody));
  }

  public deleteMessage(id: string, messageID: string): void {
    const requestBody = {
      id: id,
      type: typeOfRequest.MSG_DELETE,
      payload: {
        message: {
          id: messageID,
        },
      },
    };
    this.connection.getSocket.send(JSON.stringify(requestBody));
  }

  public editMessage(id: string, messageID: string, text: string): void {
    const requestBody = {
      id: id,
      type: typeOfRequest.MSG_EDIT,
      payload: {
        message: {
          id: messageID,
          text: text,
        },
      },
    };
    this.connection.getSocket.send(JSON.stringify(requestBody));
  }
}
