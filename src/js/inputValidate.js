export class InputValidate {
  constructor(block, options) {
    const defaultOptions = {
      creditCardFormater: true,
      maxSize: null,
    };
    this.block = block;
    this.options = { ...defaultOptions, ...options };
    this.regexp = new RegExp('^[0-9]$');
    this.setupListener();
  }
  setupListener = () => {
    ['keydown', 'keyup', 'input'].forEach((event) => {
      this.block.addEventListener(event, (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (!this.options.maxSize) {
          e.target.value = this.formatToCredit(value);
        } else {
          value.length <= this.options.maxSize
            ? (e.target.value = value)
            : (e.target.value = value.substring(0, value.length - 1));
        }
      });
    });
  };
  formatToCredit = (value) => {
    const arr = value.split('');
    let res = [];
    for (let i = 0; i < arr.length; i += 4) {
      const chunk = arr.slice(i, i + 4);
      res.push(chunk.join(''));
      if (i >= 12) {
        break;
      }
    }
    return res.join(' ');
  };
}
