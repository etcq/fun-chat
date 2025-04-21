import { BaseComponent } from '../factory-components/base-components';
import loadingImg from '../../../assets/loading.gif';
import './reconnect.scss';

export default class Reconnect extends BaseComponent {
  private loading;
  private title;
  constructor() {
    super({ tag: 'div', classNames: ['reconnect'] });
    this.loading = new BaseComponent({ tag: 'img', classNames: ['reconnect-image'], options: { src: loadingImg } });
    this.title = new BaseComponent({
      tag: 'h3',
      classNames: ['reconnect-title'],
      text: "I'm trying to reconnecting...",
    });

    this.appendToParent(document.body);
    this.addChildren(this.loading, this.title);
  }

  public showRecconect(): void {
    this.element.classList.add('show');
  }

  public hideRecconect(): void {
    this.element.classList.remove('show');
  }
}
