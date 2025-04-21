import { BaseComponent, type ComponentProps } from '../base-components';
import './button.scss';

const defaultButtonProps: ComponentProps = {
  tag: 'button',
  classNames: ['btn'],
  text: 'click',
};

export default class ButtonView extends BaseComponent {
  constructor(props: Partial<ComponentProps>) {
    super({
      ...defaultButtonProps,
      ...props,
      classNames: [...(defaultButtonProps.classNames || []), ...(props.classNames || [])],
    });
    if (props.listener) {
      this.element.addEventListener(props.listener.event, props.listener.callback);
    }
  }
}
