import { BaseComponent } from '../../factory-components/base-components';
import type ButtonView from '../../factory-components/button/button';
import InputContainer from './input-container/input-container';
import './login-input-block.scss';

export default class LoginInputBlock extends BaseComponent {
  private label;
  private inputBlock;
  constructor(name: string, type: string, submitButton: ButtonView, validation: () => void) {
    super({ tag: 'div', classNames: ['login-block'] });
    this.label = new BaseComponent({
      tag: 'label',
      classNames: ['login__input_label-main'],
      text: name,
      options: {
        for: name,
      },
    });
    this.inputBlock = new InputContainer(name, type, submitButton, validation);
    this.configureView();
  }

  public checkInput(): boolean {
    return this.inputBlock.checkValidationInput();
  }

  private configureView(): void {
    this.addChildren(this.label, this.inputBlock);
  }
}
