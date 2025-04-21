import connection from '../../../../../../service/connection';
import { type MessageData, typeOfRequest } from '../../../../../../utils/types';
import { BaseComponent } from '../../../../../factory-components/base-components';
import { v4 as uuidv4 } from 'uuid';
import './dialog-messages.scss';
import MessageBlock from './message-block/message-block';
import ReadLine from './readline/readline';
import type UserElement from '../../../chat-users/users-list/user-element/user-element';
import type DialogForm from '../dialog-form/dialog-form';

export default class DialogMessages extends BaseComponent {
  private opponentLogin;
  private connection;
  private noMessages;
  private messageRequestId;
  private readedMessages: MessageBlock[];
  private unreadMessages: MessageBlock[];
  private autoScrollEnabled;
  private userListElement;
  private submitForm;
  private readLine;
  constructor(userListElement: UserElement, opponentLogin: string, submitForm: DialogForm) {
    super({ tag: 'div', classNames: ['dialog-room-messages'] });
    this.connection = connection;
    this.submitForm = submitForm;
    this.userListElement = userListElement;
    this.opponentLogin = opponentLogin;
    this.noMessages = new BaseComponent({
      tag: 'h3',
      classNames: ['dialog-room-messages-empty'],
      text: "Let's start to talk...",
    });
    this.readLine = new ReadLine();
    this.messageRequestId = uuidv4();
    this.readedMessages = [];
    this.unreadMessages = [];
    this.autoScrollEnabled = true;
    this.connection.messages.getMessageHistory(this.messageRequestId, { login: opponentLogin });
    this.subscribes();
    this.configureView();
  }

  public makeUnreadToRead(): void {
    for (const message of this.unreadMessages) {
      this.connection.messages.messageReaded(uuidv4(), message.messageId);
    }
    this.readLine.removeElement();
    this.readedMessages = [...this.readedMessages, ...this.unreadMessages];
    this.unreadMessages = [];
    this.userListElement.updateCounter(0);
  }

  private renderMessages(): void {
    const line = this.unreadMessages.length > 0 ? [this.readLine] : [];
    for (const message of [...this.readedMessages, ...line, ...this.unreadMessages]) {
      this.addChild(message, true);
      this.scrollToBottom();
    }
  }

  private subscribes(): void {
    this.connection.subscribe(typeOfRequest.MSG_FROM_USER, (response) => {
      if (response.id === this.messageRequestId && response.payload.messages) {
        if (response.payload.messages.length > 0) {
          this.noMessages.removeElement();
          for (const message of response.payload.messages) {
            if (message.status.isReaded || message.to === this.opponentLogin) {
              this.readedMessages.push(new MessageBlock(this.opponentLogin, message, this.submitForm));
            } else {
              this.unreadMessages.push(new MessageBlock(this.opponentLogin, message, this.submitForm));
            }
          }
          this.renderMessages();
          this.userListElement.updateCounter(this.unreadMessages.length);
        } else {
          this.addChild(this.noMessages);
        }
      }
    });
    this.connection.subscribe(typeOfRequest.MSG_SEND, (response) => {
      if (response.payload.message) {
        this.noMessages.removeElement();
        this.addNewMessage(response.payload.message);
      }
    });
  }

  private addNewMessage(messageData: MessageData): void {
    const message = new MessageBlock(this.opponentLogin, messageData, this.submitForm);
    if (messageData.from === this.opponentLogin) {
      if (this.unreadMessages.length === 0) {
        this.addChild(this.readLine, true);
      }
      this.unreadMessages.push(message);
      this.addChild(message, true);
      this.scrollToBottom();
    } else if (messageData.to === this.opponentLogin) {
      this.readedMessages.push(message);
      this.addChild(message, true);
      this.scrollToBottom();
    }
    this.userListElement.updateCounter(this.unreadMessages.length);
  }

  private handleScroll(): void {
    const readLineRect = this.readLine.getRect;
    const containerRect = this.element.getBoundingClientRect();
    if (readLineRect.top <= containerRect.top) {
      this.autoScrollEnabled = false;
    }
  }

  private scrollToBottom(): void {
    this.handleScroll();
    if (!this.autoScrollEnabled) return;
    this.element.scrollTo({
      top: this.element.scrollHeight,
      behavior: 'smooth',
    });
  }

  private configureView(): void {
    this.addListener('wheel', () => {
      this.makeUnreadToRead();
    });
    this.addListener('mousedown', () => {
      this.makeUnreadToRead();
    });
  }
}
