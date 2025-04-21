import { type MessageData } from '../../../../../../../../utils/types';
import { BaseComponent } from '../../../../../../../factory-components/base-components';
import ButtonView from '../../../../../../../factory-components/button/button';
import type MessageBlock from '../message-block';
import './message-header.scss';

export default class MessageHeader extends BaseComponent {
  private author;
  private datetime;
  private title;
  private messageBlock;
  private datetimeView;
  private deleteButton;
  private editButton;
  constructor(messageBlock: MessageBlock, author: string, messageData: MessageData) {
    super({ tag: 'div', classNames: ['message-header'] });
    this.author = author;
    this.messageBlock = messageBlock;
    this.datetime = new Date(messageData.datetime);
    this.title = new BaseComponent({
      tag: 'span',
      classNames: ['message-header-name'],
      text: `${messageData.from}${author === 'mine' ? ' (You)' : ''}`,
    });
    this.datetimeView = new BaseComponent({
      tag: 'span',
      classNames: ['message-header-datetime'],
      text: `${this.datetime.toLocaleTimeString('en-US')}`,
    });
    this.deleteButton = new ButtonView({
      classNames: ['message-header-button'],
      text: '✗',
      listener: {
        event: 'click',
        callback: (): void => {
          this.messageBlock.deleteMessageView();
        },
      },
    });
    this.editButton = new ButtonView({
      classNames: ['message-header-button', 'edit'],
      text: '✎',
      listener: {
        event: 'click',
        callback: (): void => {
          this.messageBlock.toFormForEdit();
        },
      },
    });
    this.configureView();
  }

  private configureView(): void {
    if (this.author === 'mine') {
      this.addChildren(this.deleteButton, this.editButton);
    }
    this.addChildren(this.title, this.datetimeView);
  }
}
