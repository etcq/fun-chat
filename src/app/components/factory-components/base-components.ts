export type ComponentProps = {
  tag: keyof HTMLElementTagNameMap;
  text?: string | number;
  classNames?: string[];
  listener?: { event: string; callback: (event: Event) => void };
  options?: {
    id?: string;
    for?: string;
    href?: string;
    src?: string;
  };
};

export class BaseComponent {
  protected element: HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
  private props: ComponentProps;

  constructor(props: ComponentProps) {
    if (!props) {
      throw new Error('Props cannot be undefined');
    }
    const element = document.createElement(props.tag);
    this.element = element;
    this.props = props;
    if (props.classNames) {
      this.element.classList.add(...props.classNames);
    }
    if (props.options) {
      for (const [key, value] of Object.entries(props.options)) {
        this.element.setAttribute(key, value);
      }
    }
    this.setTextContent();
  }

  public addChild(child: BaseComponent | Node, prepend: boolean = false): void {
    if (child instanceof BaseComponent) {
      if (prepend) {
        this.element.prepend(child.element);
      } else {
        this.element.append(child.element);
      }
    } else {
      if (prepend) {
        this.element.prepend(child);
      } else {
        this.element.append(child);
      }
    }
  }

  public makeDisabled(): void {
    this.element.setAttribute('disabled', 'true');
  }

  public makeEnabled(): void {
    this.element.removeAttribute('disabled');
  }

  public addChildren(...children: (BaseComponent | Node)[]): void {
    for (const child of children) {
      this.addChild(child);
    }
  }

  public addListener(event: string, callback: (event: Event | KeyboardEvent | undefined) => void): void {
    this.element.addEventListener(event, callback);
  }

  public appendToParent(parent: HTMLElement): void {
    parent.append(this.element);
  }

  public removeElement(): void {
    this.element.remove();
  }

  public setTextContent(text?: string | number): void {
    this.element.textContent = (text || this.props.text || '').toString();
  }

  public clearContent(): void {
    while (this.element.firstElementChild) {
      this.element.firstElementChild.remove();
    }
  }
}
