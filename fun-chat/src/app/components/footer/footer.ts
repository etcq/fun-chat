import { BaseComponent } from '../factory-components/base-components';

import './footer.scss';

export default class Footer extends BaseComponent {
  constructor() {
    super({ tag: 'footer', classNames: ['footer'] });
    this.configureView();
  }

  private configureView(): void {
    const github = new BaseComponent({
      tag: 'a',
      classNames: ['footer-anchor', 'github'],
      options: { href: 'https://github.com/etcq' },
    });
    const year = new BaseComponent({
      tag: 'span',
      classNames: ['footer-span'],
      text: '2025',
    });
    const school = new BaseComponent({
      tag: 'a',
      classNames: ['footer-anchor', 'school'],
      options: { href: 'https://rs.school/courses/javascript-ru' },
    });
    this.addChildren(github, year, school);
  }
}
