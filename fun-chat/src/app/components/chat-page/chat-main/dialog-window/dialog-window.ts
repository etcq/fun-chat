import { type UserData } from '../../../../utils/types';
import { BaseComponent } from '../../../factory-components/base-components';
import type UserElement from '../chat-users/users-list/user-element/user-element';
import DialogRoom from './dialog-room/dialog-room';
import './dialog-window.scss';

export default class DialogWindow extends BaseComponent {
  private rooms: Map<string, BaseComponent>;
  constructor() {
    super({ tag: 'div', classNames: ['chat-dialog-window'] });
    this.rooms = new Map();
  }
  public get getRooms(): Map<string, BaseComponent> {
    return this.rooms;
  }

  public getRoom(userData: UserData): void {
    const createdRoom = this.rooms.get(userData.login);
    if (createdRoom) {
      this.clearContent();
      this.addChild(createdRoom);
    }
  }

  public createRoom(userListElement: UserElement, userData: UserData): void {
    const room = new DialogRoom(userListElement, userData);
    this.rooms.set(userData.login, room);
  }
}
