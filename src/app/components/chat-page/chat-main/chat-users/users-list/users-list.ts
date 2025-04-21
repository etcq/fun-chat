import { BaseComponent } from '../../../../factory-components/base-components';
import type UserElement from './user-element/user-element';

import './users-list.scss';

export default class ChatUsersBlock extends BaseComponent {
  private users: UserElement[];
  private searchUsers: UserElement[];
  constructor() {
    super({ tag: 'ul', classNames: ['chat-users-block'] });
    this.users = [];
    this.searchUsers = [];
  }

  public addUser(user: UserElement): void {
    this.users.push(user);
    this.renderUsers();
  }

  public filterUsers(inputData: string): void {
    this.searchUsers = this.users.filter((user) =>
      user.getLogin.toLocaleLowerCase().includes(inputData.toLocaleLowerCase()),
    );
    this.clearContent();
    this.renderUsers(this.searchUsers);
  }

  public removeUser(login: string): void {
    for (const user of this.users) {
      if (login === user.getLogin) {
        this.users = this.users.filter((userInArray) => userInArray.getLogin !== user.getLogin);
        user.removeElement();
      }
    }
  }

  public renderUsers(users: UserElement[] = this.users): void {
    for (const user of users) {
      this.addChild(user);
    }
  }
}
