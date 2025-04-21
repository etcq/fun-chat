import connection from '../../../../../../service/connection';
import { type UserData, typeOfRequest } from '../../../../../../utils/types';
import { BaseComponent } from '../../../../../factory-components/base-components';
import './dialog-header.scss';
import HeaderStatusView from './header-status-view/header-status-view';

export default class DialogHeader extends BaseComponent {
  private title;
  private connection;
  private opponentLogin;
  private statusView;
  constructor(userData: UserData) {
    super({ tag: 'div', classNames: ['dialog-header'] });
    this.connection = connection;
    this.opponentLogin = userData.login;
    this.title = new BaseComponent({ tag: 'span', classNames: ['user-name'], text: userData.login });
    this.statusView = new HeaderStatusView(userData.isLogined);
    this.configureView();
    this.connection.subscribe(typeOfRequest.USER_EXTERNAL_LOGIN, (response) => {
      if (response.payload.user?.login === this.opponentLogin) {
        this.statusView.changeStatus(response.payload.user.isLogined);
      }
    });
    this.connection.subscribe(typeOfRequest.USER_EXTERNAL_LOGOUT, (response) => {
      if (response.payload.user?.login === this.opponentLogin) {
        this.statusView.changeStatus(response.payload.user.isLogined);
      }
    });
  }

  private configureView(): void {
    this.addChildren(this.statusView, this.title);
  }
}
