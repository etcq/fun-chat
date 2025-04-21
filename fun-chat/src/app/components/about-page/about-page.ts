import { BaseComponent } from '../factory-components/base-components';
import ButtonView from '../factory-components/button/button';

import './about-page.scss';

export default class AboutPage extends BaseComponent {
  private buttonBack;
  constructor() {
    super({ tag: 'div', classNames: ['about'] });
    this.buttonBack = new ButtonView({
      text: 'Back',
      listener: {
        event: 'click',
        callback: (): void => {
          globalThis.history.back();
        },
      },
    });
    this.configureView();
  }

  private configureView(): void {
    const header = new BaseComponent({ tag: 'h2', classNames: ['about-header'], text: 'Welcome to FUN CHAT!' });
    const consist = new BaseComponent({
      tag: 'p',
      classNames: ['about-text'],
      text: 'This application is developed without using typescript frameworks and using websocket technology.',
    });
    const goal = new BaseComponent({
      tag: 'p',
      classNames: ['about-text'],
      text: 'The application is a completed project as part of a rsschool course in front-end development.',
    });
    this.addChildren(header, consist, goal, this.buttonBack);
  }
}
