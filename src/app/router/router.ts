import type Container from '../components/container/container';

export default class Router {
  private container: Container;
  constructor(container: Container) {
    this.container = container;
    globalThis.addEventListener('popstate', this.handlePopState.bind(this));
    this.handlePopState();
  }

  public navigateTo(path: string): void {
    history.pushState({}, '', path);
    this.handlePopState();
  }

  private handlePopState(): void {
    const path = globalThis.location.pathname;
    if (path === '/') {
      globalThis.location.pathname = '/login';
      this.container.setContentToLoginPage();
    }
    switch (path) {
      case `/login`: {
        this.container.setContentToLoginPage();
        break;
      }
      case `/chat`: {
        if (sessionStorage.getItem('fun-chat')) {
          this.container.setContentToChatPage();
        } else {
          globalThis.location.pathname = '/';
        }
        break;
      }
      case `/about`: {
        this.container.setContentToAboutPage();
        break;
      }
      default: {
        break;
      }
    }
  }
}
