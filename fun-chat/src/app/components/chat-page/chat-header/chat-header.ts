import connection from '../../../service/connection';
import { BaseComponent } from '../../factory-components/base-components';
import ButtonView from '../../factory-components/button/button';
import type ChatPage from '../chat-page';
import './chat-header.scss';
import { typeOfRequest } from '../../../utils/types';
import type Container from '../../container/container';

export default class ChatPageControls extends BaseComponent {
  private header;
  private mainContainer;
  private info;
  private logout;
  private chatPage;
  private connection;
  constructor(mainContainer: Container, chatPage: ChatPage) {
    super({ tag: 'div', classNames: ['chat-header'] });
    this.connection = connection;
    this.mainContainer = mainContainer;
    this.chatPage = chatPage;
    this.header = new BaseComponent({ tag: 'span', classNames: ['user-name'] });
    this.info = new ButtonView({
      text: 'About',
      listener: {
        event: 'click',
        callback: (): void => this.mainContainer.routerAbout(),
      },
    });
    this.logout = new ButtonView({
      text: 'Log OUT',
      listener: {
        event: 'click',
        callback: (): void => this.chatPage.logOut(),
      },
    });
    this.connection.subscribe(typeOfRequest.USER_LOGIN, (response) => {
      if (response.payload.user?.isLogined) {
        this.addName(response.payload.user.login);
      }
    });
    this.configureView();
  }

  public addName(name: string): void {
    this.header.setTextContent(`You: ${name}`);
  }

  private configureView(): void {
    const buttonWrapper = new BaseComponent({ tag: 'div', classNames: ['controls-buttons'] });
    buttonWrapper.addChildren(this.info, this.logout);
    this.addChildren(this.header, buttonWrapper);
  }
}
