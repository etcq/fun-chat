import { v4 as uuidv4 } from 'uuid';
import Router from '../../router/router';
import ChatPage from '../chat-page/chat-page';
import { BaseComponent } from '../factory-components/base-components';
import LoginPage from '../login-page/login-page';
import { typeOfRequest } from '../../utils/types';
import connection from '../../service/connection';
import './_container.scss';
import { isValidUser } from '../../utils/validate-functions';
import AboutPage from '../about-page/about-page';

export default class Container extends BaseComponent {
  private router;
  private login;
  private chat;
  private about;
  private connection;
  constructor() {
    super({
      tag: 'main',
      classNames: ['container'],
    });
    this.connection = connection;
    this.login = new LoginPage(this);
    this.chat = new ChatPage(this);
    this.about = new AboutPage();
    this.router = new Router(this);
    this.connection.subscribe(typeOfRequest.USER_LOGIN, (response) => {
      if (response.payload.user?.isLogined) {
        this.connection.getUsers.getAuthUsers(uuidv4());
        this.connection.getUsers.getUnauthUsers(uuidv4());
        if (isValidUser(this.connection.auth.getAuthData)) {
          sessionStorage.setItem('fun-chat', JSON.stringify(this.connection.auth.getAuthData));
        }
        this.routerChat();
      }
    });
    this.connection.subscribe(typeOfRequest.USER_LOGOUT, (response) => {
      if (!response.payload.user?.isLogined) {
        sessionStorage.removeItem('fun-chat');
        this.routerChat();
      }
    });
  }

  public routerLogin(): void {
    this.router.navigateTo('/login');
  }

  public routerChat(): void {
    this.router.navigateTo('/chat');
  }

  public routerAbout(): void {
    this.router.navigateTo('/about');
  }

  public setContentToLoginPage(): void {
    this.clearContent();
    this.addChild(this.login);
  }

  public setContentToChatPage(): void {
    this.clearContent();
    this.addChild(this.chat);
  }

  public setContentToAboutPage(): void {
    this.clearContent();
    this.addChild(this.about);
  }
}
