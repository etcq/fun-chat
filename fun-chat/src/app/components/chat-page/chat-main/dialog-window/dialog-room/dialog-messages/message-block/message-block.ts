import { BaseComponent } from '../../../../../../factory-components/base-components';
import MessageFooter from './message-footer/message-footer';
import MessageHeader from './message-header/message-header';
import { typeOfRequest, type MessageData } from '../../../../../../../utils/types';
import './message-block.scss';
import connection from '../../../../../../../service/connection';
import { v4 as uuidv4 } from 'uuid';
import type DialogForm from '../../dialog-form/dialog-form';

export default class MessageBlock extends BaseComponent {
  private messageData;
  private connection;
  private header;
  private author;
  private text;
  private footer;
  private submitForm;
  constructor(login: string, messageData: MessageData, submitForm: DialogForm) {
    super({ tag: 'div', classNames: ['message'] });
    this.connection = connection;
    this.messageData = messageData;
    this.submitForm = submitForm;
    this.author = login === this.messageData.to ? 'mine' : 'alien';
    this.header = new MessageHeader(this, this.author, messageData);
    this.text = new BaseComponent({ tag: 'pre', classNames: ['message-text'], text: messageData.text });
    this.footer = new MessageFooter(this.author, messageData.status);
    this.subscribes();
    this.configureView();
  }

  public get messageId(): string {
    return this.messageData.id;
  }

  public toFormForEdit(): void {
    this.submitForm.getDataForEdit(this.messageData.id, this.messageData.text);
  }

  public deleteMessageView(): void {
    this.connection.messages.deleteMessage(uuidv4(), this.messageData.id);
  }

  private subscribes(): void {
    this.connection.subscribe(typeOfRequest.MSG_DELIVER, (response) => {
      if (response.payload.message?.id === this.messageData.id) {
        this.footer.changeDeliverStatus();
      }
    });
    this.connection.subscribe(typeOfRequest.MSG_READ, (response) => {
      if (response.payload.message?.id === this.messageData.id) {
        this.footer.changeReadStatus();
      }
    });
    this.connection.subscribe(typeOfRequest.MSG_DELETE, (response) => {
      if (response.payload.message?.id === this.messageData.id && response.payload.message.status.isDeleted) {
        this.removeElement();
      }
    });
    this.connection.subscribe(typeOfRequest.MSG_EDIT, (response) => {
      if (response.payload.message?.id === this.messageData.id && response.payload.message.status.isEdited) {
        this.messageData.text = response.payload.message.text;
        this.text.setTextContent(this.messageData.text);
        this.footer.changeEditedStatus();
      }
    });
  }

  private configureView(): void {
    this.element.classList.add(`${this.author}`);
    this.addChildren(this.header, this.text, this.footer);
  }
}
