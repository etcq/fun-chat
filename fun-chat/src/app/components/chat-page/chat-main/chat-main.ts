import { BaseComponent } from '../../factory-components/base-components';
import ChatUsers from './chat-users/chat-users';
import DialogWindow from './dialog-window/dialog-window';

import './chat-main.scss';

export default class ChatMainContent extends BaseComponent {
  private users;
  private dialog;
  constructor() {
    super({ tag: 'div', classNames: ['chat-main'] });
    this.dialog = new DialogWindow();
    this.users = new ChatUsers(this.dialog);
    this.configureView();
  }

  private configureView(): void {
    this.addChildren(this.users, this.dialog);
  }
}
