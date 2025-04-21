import { BaseComponent } from '../../../../../../factory-components/base-components';
import './header-status-view.scss';

export default class HeaderStatusView extends BaseComponent {
  constructor(isLogined: boolean | undefined) {
    super({
      tag: 'div',
      classNames: ['user-status', `${isLogined ? 'active' : 'inactive'}`],
    });
  }

  public changeStatus(isLogined: boolean | undefined): void {
    if (isLogined) {
      this.element.classList.add('active');
    } else {
      this.element.classList.remove('active');
    }
  }
}
