import type { UserData } from '../../../../../utils/types';
import { BaseComponent } from '../../../../factory-components/base-components';
import type UserElement from '../../chat-users/users-list/user-element/user-element';
import DialogForm from './dialog-form/dialog-form';
import DialogHeader from './dialog-header/dialog-header';
import DialogMessages from './dialog-messages/dialog-messages';

import './dialog-room.scss';

export default class DialogRoom extends BaseComponent {
  private header;
  private messages;
  private form;
  private userData;
  constructor(useListElement: UserElement, userData: UserData) {
    super({ tag: 'div', classNames: ['chat-dialog-room'] });
    this.userData = userData;
    this.header = new DialogHeader(this.userData);
    this.form = new DialogForm(this, this.userData.login);
    this.messages = new DialogMessages(useListElement, userData.login, this.form);
    this.configureView();
  }

  public readMessages(): void {
    this.messages.makeUnreadToRead();
  }

  private configureView(): void {
    this.addChildren(this.header, this.messages, this.form);
  }
}
