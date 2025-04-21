import Container from './components/container/container';
import Footer from './components/footer/footer';
import Header from './components/header/header';

export default class App {
  private body: HTMLElement;
  private container: Container;
  private header: Header;
  private footer;
  constructor() {
    this.body = document.body;
    this.container = new Container();
    this.header = new Header();
    this.footer = new Footer();
  }

  public createView(): void {
    this.header.appendToParent(this.body);
    this.container.appendToParent(this.body);
    this.footer.appendToParent(this.body);
  }
}
