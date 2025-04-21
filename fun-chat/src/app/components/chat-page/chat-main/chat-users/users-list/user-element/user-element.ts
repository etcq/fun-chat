import { type UserData } from '../../../../../../utils/types';
import { BaseComponent } from '../../../../../factory-components/base-components';
import type DialogWindow from '../../../dialog-window/dialog-window';
import './user-element.scss';

export default class UserElement extends BaseComponent {
  private userData;
  private dialogWindow;
  private status;
  private name;
  private counterView;
  constructor(userData: UserData, dialogWindow: DialogWindow) {
    super({ tag: 'li', classNames: ['user-element'] });
    this.userData = userData;
    this.status = new BaseComponent({
      tag: 'div',
      classNames: ['user-element-status', `${this.userData.isLogined ? 'active' : 'inactive'}`],
    });
    this.name = new BaseComponent({ tag: 'div', classNames: ['user-element-name'], text: this.userData.login });
    this.counterView = new BaseComponent({ tag: 'span', classNames: ['user-element-counter'] });
    this.dialogWindow = dialogWindow;
    this.dialogWindow.createRoom(this, this.userData);
    this.configureView();
  }

  public get getLogin(): string {
    return this.userData.login;
  }

  public updateCounter(count: number): void {
    this.counterView.setTextContent(count === 0 ? '' : count);
  }

  private configureView(): void {
    this.addListener('click', (): void => {
      this.dialogWindow.getRoom(this.userData);
    });
    this.addChildren(this.status, this.name, this.counterView);
  }
}
