import { InputValidate } from '@/js/inputCreadit';
import tippy from 'tippy.js';
import JustValidate from 'just-validate';
export class CreditCard {
  constructor() {
    this.block = document.querySelector('.js-credit-payment');
    this.creditCardEl = null;
    this.creditCardDateEl = null;
    this.creditCardCVVEl = null;
    this.creditCardNameEl = null;
    this.block && this.init();
  }
  init = () => {
    try {
      this.creditCardEl = this.block.querySelector('.js-credit-mask');
      this.creditCardDateEl = this.block.querySelectorAll('.js-credit-date');
      this.creditCardCVVEl = this.block.querySelector('.js-cvv-mask');
      this.creditCardNameEl = this.block.querySelector('.js-credit-name');
      this.setupCreditCardMask();
      this.setupToolTip();
      this.setupValidation();
    } catch (error) {
      //
    }
  };
  setupCreditCardMask = () => {
    new InputValidate(this.creditCardEl);
    new InputValidate(this.creditCardCVVEl, {
      maxSize: 3,
    });

    for (const item of this.creditCardDateEl) {
      new InputValidate(item, {
        maxSize: 2,
      });
    }
  };
  setupToolTip = () => {
    const block = this.block.querySelector('.js-cvv-tooltip');
    tippy(block, {
      placement: 'bottom',
      allowHTML: true,
      content: this.block.querySelector('#cvv-info').innerHTML,
      interactive: true,
    });
  };
  setupValidation = () => {
    const validator = new JustValidate(this.block, {
      errorFieldCssClass: 'error',
      errorLabelCssClass: 'field-error',
      errorLabelStyle: '',
    });
    validator.onSuccess(() => {
      alert('Form send success');
    });
    validator
      .addField(
        this.creditCardNameEl,
        [
          {
            rule: 'required',
          },
        ],
        {
          errorsContainer: this.creditCardNameEl.parentNode.parentNode,
        }
      )
      .addField(
        this.creditCardEl,
        [
          {
            rule: 'required',
          },
          {
            rule: 'minLength',
            value: 15,
            errorMessage: 'The field must contain 12 characters',
          },
        ],
        {
          errorsContainer: this.creditCardEl.parentNode.parentNode,
        }
      )
      .addField(
        this.creditCardCVVEl,
        [
          {
            rule: 'required',
          },
          {
            rule: 'minLength',
            value: 3,
            errorMessage: 'The field must contain 3 characters',
          },
        ],
        {
          errorsContainer: this.creditCardCVVEl.parentNode.parentNode,
        }
      );
    for (const item of this.creditCardDateEl) {
      validator.addField(item, [
        {
          rule: 'required',
        },
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'The field must contain 2 characters',
        },
      ]);
    }
    const policyEl = this.block.querySelector('.js-policy-validate');
    validator.addField(policyEl, [
      {
        rule: 'required',
      },
    ]);
  };
}
