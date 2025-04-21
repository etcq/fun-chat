import connection from '../../../../service/connection';
import { typeOfRequest, type UserData } from '../../../../utils/types';
import { BaseComponent } from '../../../factory-components/base-components';
import InputComponent from '../../../login-page/login-input-block/input-container/input/input';
import ChatUsersBlock from './users-list/users-list';
import './chat-users.scss';
import UserElement from './users-list/user-element/user-element';
import type DialogWindow from '../dialog-window/dialog-window';

export default class ChatUsers extends BaseComponent {
  private active;
  private inactive;
  private connection;
  private search;
  private dialogWindow;
  constructor(dialogWindow: DialogWindow) {
    super({ tag: 'aside', classNames: ['chat-users'] });
    this.active = new ChatUsersBlock();
    this.inactive = new ChatUsersBlock();
    this.connection = connection;
    this.dialogWindow = dialogWindow;
    this.search = new InputComponent({ options: { placeholder: 'Search user' } });
    this.configureView();
    this.subscribes();
  }

  public changeStatusUser(userData: UserData): void {
    const user = new UserElement(userData, this.dialogWindow);
    if (userData.isLogined) {
      this.active.addUser(user);
      this.inactive.removeUser(userData.login);
    } else {
      this.inactive.addUser(user);
      this.active.removeUser(userData.login);
    }
  }

  public showUsers(users: UserData[]): void {
    for (const userData of users) {
      if (userData.login !== this.connection.auth.getAuthData?.login) {
        const user = new UserElement(userData, this.dialogWindow);
        if (userData.isLogined) {
          this.active.addUser(user);
        } else {
          this.inactive.addUser(user);
        }
      }
    }
  }

  private subscribes(): void {
    this.connection.subscribe(typeOfRequest.USER_LOGIN, () => {
      console.log('cleaning');
      this.active.clearContent();
      this.inactive.clearContent();
    });
    this.connection.subscribe(typeOfRequest.USER_ACTIVE, (response) => {
      if (response.payload.users) {
        this.showUsers(response.payload.users);
      }
    });
    this.connection.subscribe(typeOfRequest.USER_INACTIVE, (response) => {
      if (response.payload.users) {
        this.showUsers(response.payload.users);
      }
    });
    this.connection.subscribe(typeOfRequest.USER_EXTERNAL_LOGIN, (response) => {
      if (response.payload.user) {
        this.changeStatusUser(response.payload.user);
      }
    });
    this.connection.subscribe(typeOfRequest.USER_EXTERNAL_LOGOUT, (response) => {
      if (response.payload.user) {
        this.changeStatusUser(response.payload.user);
      }
    });
  }

  private configureView(): void {
    this.search.addListener('input', () => {
      this.active.filterUsers(this.search.getValue());
      this.inactive.filterUsers(this.search.getValue());
    });
    this.addChildren(this.search, this.active, this.inactive);
  }
}
