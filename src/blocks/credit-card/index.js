import { InputValidate } from '@/js/inputCreadit';
import { FormValidation } from '@/js/formValidation';
import tippy from 'tippy.js';

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
    this.creditCardEl = this.block.querySelector('.js-credit-mask');
    this.creditCardDateEl = this.block.querySelectorAll('.js-credit-date');
    this.creditCardCVVEl = this.block.querySelector('.js-cvv-mask');
    this.creditCardNameEl = this.block.querySelector('.js-credit-name');
    this.setupCreditCardMask();
    this.setupToolTip();
    this.setupValidation();
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
    const validation = new FormValidation(this.block, {
      onSuccess: (e) => {
        alert('Form send success');
      },
    });
    validation.addField(
      this.creditCardNameEl,
      [
        {
          rule: 'required',
          message: 'field is required',
        },
      ],
      this.creditCardNameEl.parentNode.querySelector('.field-error')
    );
    validation.addField(
      this.creditCardEl,
      [
        {
          rule: 'required',
          message: 'field is required',
        },
        {
          rule: 'minLength',
          value: 19,
          message: 'The field must contain 16 characters',
        },
      ],
      this.creditCardEl.parentNode.parentNode.querySelector('.field-error')
    );
    validation.addField(
      this.creditCardCVVEl,
      [
        {
          rule: 'required',
          message: 'field is required',
        },
        {
          rule: 'minLength',
          value: 3,
          message: 'The field must contain 3 characters',
        },
      ],
      this.creditCardCVVEl.parentNode.parentNode.querySelector('.field-error')
    );
    for (const item of this.creditCardDateEl) {
      validation.addField(
        item,
        [
          {
            rule: 'required',
            message: 'field is required',
          },
          {
            rule: 'minLength',
            value: 2,
            message: 'The field must contain 2 characters',
          },
        ],
        item.parentNode.querySelector('.field-error')
      );
    }
    const policyEl = this.block.querySelector('.js-policy-validate');
    validation.addField(
      policyEl,
      [
        {
          rule: 'required',
          message: 'field is required',
        },
      ],
      policyEl.parentNode.parentNode.querySelector('.field-error')
    );
  };
}
