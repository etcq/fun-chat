import { BaseComponent } from '../../../../factory-components/base-components';
import './validity-error.scss';

export default class ValidityError extends BaseComponent {
  constructor(name: string, text: string) {
    super({
      tag: 'label',
      classNames: ['login-input-validity'],
      options: { for: name },
      text: text,
    });
  }
}
