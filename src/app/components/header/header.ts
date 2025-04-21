import { BaseComponent } from '../factory-components/base-components';

import './header.scss';

export default class Header extends BaseComponent {
  constructor() {
    super({
      tag: 'header',
      classNames: ['header'],
    });
    this.configureView();
  }

  private configureView(): void {
    const headerText = new BaseComponent({ tag: 'h1', classNames: ['header__text'], text: 'Fun-chat' });
    this.addChild(headerText);
  }
}
