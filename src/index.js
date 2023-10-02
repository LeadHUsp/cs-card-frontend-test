// Test import of styles
import '@/styles/index.scss';

// import libs

import { Modal } from '@/blocks/modal/modal';
import { ClassicTabs } from '@/js/tabs';
import { CreditCard } from '@/blocks/credit-card';

// Appending to the DOM

class Root {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initApp();
      this.afterInitApp();
    });
  }
  initApp = () => {
    //init tabs
    const tabsEl = document.querySelectorAll('.js-simple-tabs');
    if (tabsEl.length > 0)
      for (const item of tabsEl) {
        new ClassicTabs({
          blockSelector: item,
        });
      }
    new CreditCard();
    new Modal();
  };
  afterInitApp = () => {};
}
new Root();
