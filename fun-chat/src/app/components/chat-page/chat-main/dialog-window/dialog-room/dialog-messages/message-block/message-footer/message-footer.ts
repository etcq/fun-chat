import { type MessageData } from '../../../../../../../../utils/types';
import { BaseComponent } from '../../../../../../../factory-components/base-components';
import './message-footer.scss';

export default class MessageFooter extends BaseComponent {
  private messageStatus;
  private status;
  private author;
  private isEdited;
  constructor(author: string, status: MessageData['status']) {
    super({ tag: 'div', classNames: ['message-footer'] });
    this.status = status;
    this.author = author;
    this.messageStatus = new BaseComponent({
      tag: 'span',
      classNames: ['message-footer-status'],
      text: `${this.status.isDelivered ? 'Delivered' : 'Not Delivered'}`,
    });
    this.isEdited = new BaseComponent({
      tag: 'span',
      classNames: ['message-footer-edited'],
      text: `${this.status.isEdited ? 'Edited' : ''}`,
    });
    this.configureView();
  }

  public changeEditedStatus(): void {
    this.status.isEdited = true;
    this.isEdited.setTextContent('Edited');
  }

  public changeDeliverStatus(): void {
    this.messageStatus.setTextContent('Delivered');
  }

  public changeReadStatus(): void {
    this.messageStatus.setTextContent('Readed');
  }

  private configureView(): void {
    this.addChild(this.isEdited);
    if (this.author === 'mine') {
      this.addChild(this.messageStatus);
    }
  }
}
