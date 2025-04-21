import { v4 as uuidv4 } from 'uuid';
import connection from '../../service/connection';
import { BaseComponent } from '../factory-components/base-components';
import ButtonView from '../factory-components/button/button';
import LoginInputBlock from './login-input-block/login-input-block';
import type Container from '../container/container';
import './login-page.scss';

export default class LoginPage extends BaseComponent {
  declare protected element: HTMLFormElement;
  private mainContainer;
  private nickname;
  private password;
  private submitButton;
  private aboutButton;
  private connection;
  constructor(mainContainer: Container) {
    super({
      tag: 'form',
      classNames: ['login'],
      text: 'Log In please',
    });
    this.mainContainer = mainContainer;
    this.connection = connection;
    this.submitButton = new ButtonView({
      text: 'Log In',
    });
    this.aboutButton = new ButtonView({
      text: 'About',
      listener: {
        event: 'click',
        callback: (event): void => {
          event.preventDefault();
          this.mainContainer.routerAbout();
        },
      },
    });
    this.nickname = new LoginInputBlock('login', 'text', this.submitButton, () => this.checkValidation());
    this.password = new LoginInputBlock('password', 'password', this.submitButton, () => this.checkValidation());
    this.configureInputView();
  }

  public checkValidation(): void {
    if (!this.nickname.checkInput() && !this.password.checkInput()) {
      this.submitButton.makeEnabled();
    } else {
      this.submitButton.makeDisabled();
    }
  }

  private configureInputView(): void {
    this.submitButton.makeDisabled();
    this.addChildren(this.nickname, this.password, this.submitButton, this.aboutButton);
    this.addListener('submit', (event) => {
      if (!event) {
        return;
      }
      event.preventDefault();
      this.checkValidation();
      const data = Object.fromEntries(new FormData(this.element));
      this.connection.auth.auth(uuidv4(), data);
    });
  }
}
