import connection from '../../../../../../service/connection';
import { BaseComponent } from '../../../../../factory-components/base-components';
import ButtonView from '../../../../../factory-components/button/button';
import InputComponent from '../../../../../login-page/login-input-block/input-container/input/input';
import { v4 as uuidv4 } from 'uuid';

import './dialog-form.scss';
import type DialogRoom from '../dialog-room';

export default class DialogForm extends BaseComponent {
  declare protected element: HTMLFormElement;
  private connection;
  private messageArea;
  private submitButton;
  private room;
  private login;
  private isEdit;
  private messageIdToEdit;
  constructor(room: DialogRoom, login: string) {
    super({ tag: 'form', classNames: ['dialog-room-form'] });
    this.connection = connection;
    this.login = login;
    this.room = room;
    this.isEdit = false;
    this.messageIdToEdit = '';
    this.messageArea = new InputComponent({
      tag: 'textarea',
      classNames: ['dialog-room-form-textarea'],
      options: {
        placeholder: "let's talk",
        rows: '1',
        cols: '60',
      },
    });
    this.submitButton = new ButtonView({ text: 'SEND' });
    this.submitButton.makeDisabled();
    this.configureView();
  }

  public getDataForEdit(messageID: string, text: string): void {
    this.isEdit = true;
    this.messageArea.setValue(text);
    this.messageIdToEdit = messageID;
    this.submitButton.makeEnabled();
  }

  private configureView(): void {
    this.messageArea.addListener('keydown', (event) => {
      if (event instanceof KeyboardEvent && event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (this.messageArea.getValue().length > 0) {
          this.element.requestSubmit();
        }
      }
    });
    this.messageArea.addListener('input', () => {
      if (this.messageArea.getValue().length > 0) {
        this.submitButton.makeEnabled();
      } else {
        this.submitButton.makeDisabled();
      }
    });
    this.addChildren(this.messageArea, this.submitButton);
    this.addListener('submit', (event) => {
      event?.preventDefault();
      if (this.isEdit) {
        this.connection.messages.editMessage(uuidv4(), this.messageIdToEdit, this.messageArea.getValue());
      } else {
        this.connection.messages.sendMessage(uuidv4(), { to: this.login, text: this.messageArea.getValue() });
      }
      this.submitButton.makeDisabled();
      this.isEdit = false;
      this.room.readMessages();
      this.messageArea.setValue();
    });
  }
}
