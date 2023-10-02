export class FormValidation {
  constructor(formEl, options) {
    const defaultOptions = {
      onSuccess: (e) => {},
    };
    this.options = { ...defaultOptions, ...options };
    this.formEl = formEl;
    this.formIsValid = false;
    this.state = new Map();
    this.formEl && this.init();
  }
  init = () => {
    this.formEl.addEventListener('submit', (e) => {
      for (let item of this.state.values()) {
        item.validator();
      }
      for (let item of this.state.values()) {
        if (!item.isValid) {
          this.formIsValid = false;
          break;
        } else {
          this.formIsValid = true;
        }
      }
      this.formIsValid && this.options.onSuccess(e);
    });
  };
  addField = (el, rules, errorContainer) => {
    if (el && rules.length > 0) {
      const validator = () => {
        const res = [];
        rules.forEach((rule) => {
          if (!this[rule.rule](el, rule.value)) {
            res.push(rule.message);
          }
        });

        if (res.length > 0) {
          this.state.get(el.getAttribute('id')).isValid = false;
          this.state.set(el.getAttribute('id'), {
            ...this.state.get(el.getAttribute('id')),
            ...{ errorMessage: res[res.length - 1] },
          });
          this.addErrorMessage(el.getAttribute('id'), errorContainer);
          !el.classList.contains('error') && el.classList.add('error');
        } else {
          this.state.get(el.getAttribute('id')).isValid = true;
          el.classList.remove('error');
          this.removeError(el, errorContainer);
        }
      };
      this.state.set(el.getAttribute('id'), {
        isValid: true,
        errorMessage: '',
        validator,
      });

      ['keydown', 'keyup', 'input', 'change'].forEach((event) => {
        el.addEventListener(event, (e) => {
          this.state.get(el.getAttribute('id')).validator();
        });
      });
    }
  };

  minLength = (el, param) => {
    return el.value.length >= param;
  };
  required = (el) => {
    if (el.getAttribute('type') == 'checkbox') {
      return el.checked;
    } else {
      return el.value.length > 0;
    }
  };
  addErrorMessage = (el, errorContainer) => {
    errorContainer.innerHTML = '';
    errorContainer.innerHTML = this.state.get(el).errorMessage;
  };
  removeError = (el, errorContainer) => {
    errorContainer.innerHTML = '';
  };
}
