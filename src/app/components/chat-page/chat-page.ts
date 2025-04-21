import { v4 as uuidv4 } from 'uuid';
import connection from '../../service/connection';
import { BaseComponent } from '../factory-components/base-components';
import ChatPageControls from './chat-header/chat-header';
import ChatMainContent from './chat-main/chat-main';
import type Container from '../container/container';
import './chat-page.scss';

export default class ChatPage extends BaseComponent {
  private controls;
  private connection;
  private mainContent;
  constructor(mainContainer: Container) {
    super({ tag: 'div', classNames: ['chat-page'] });
    this.connection = connection;
    this.controls = new ChatPageControls(mainContainer, this);
    this.mainContent = new ChatMainContent();
    this.configureView();
  }

  public logOut(): void {
    this.connection.auth.logOut(uuidv4());
  }

  private configureView(): void {
    this.addChildren(this.controls, this.mainContent);
  }
}
