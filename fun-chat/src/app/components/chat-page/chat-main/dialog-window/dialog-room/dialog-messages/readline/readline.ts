import { BaseComponent } from '../../../../../../factory-components/base-components';
import './readline.scss';

export default class ReadLine extends BaseComponent {
  constructor() {
    super({ tag: 'div', classNames: ['readline'] });
    this.configureView();
  }

  public get getRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  private configureView(): void {
    const separatorStart = new BaseComponent({ tag: 'span', classNames: ['readline-separator'] });
    const separatorEnd = new BaseComponent({ tag: 'span', classNames: ['readline-separator'] });
    const title = new BaseComponent({
      tag: 'span',
      classNames: ['readline-title'],
      text: 'new messages',
    });
    this.addChildren(separatorStart, title, separatorEnd);
  }
}
