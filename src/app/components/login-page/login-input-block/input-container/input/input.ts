import { BaseComponent, type ComponentProps } from '../../../../factory-components/base-components';
import './input.scss';

export type ComponentInputProps = ComponentProps & {
  options: {
    placeholder?: string;
    type?: string;
    name?: string;
    min?: string;
    max?: string;
    rows?: string;
    cols?: string;
    required?: boolean;
  };
};

const defaultInputProps: ComponentInputProps = {
  tag: 'input',
  classNames: ['login-block-input'],
  options: {
    type: 'text',
  },
};

export default class InputComponent extends BaseComponent {
  declare protected element: HTMLElementTagNameMap['input'] | HTMLElementTagNameMap['textarea'];
  constructor(props: Partial<ComponentInputProps>) {
    super({
      ...defaultInputProps,
      ...props,
      classNames: [...(defaultInputProps.classNames || []), ...(props.classNames || [])],
    });
  }

  public getValue(): string {
    return this.element.value;
  }

  public setValue(value: string = ''): void {
    this.element.value = value;
  }

  public setInvalid(message: string): void {
    this.element.setCustomValidity(message);
  }

  public removeInvalid(): void {
    this.element.setCustomValidity('');
  }
}
