import Checkbox from '@ember/component/checkbox';

Checkbox.reopen({
  toggle() {},

  change() {
    let newValue = this.element.checked;

    // If `toggle` returns anything but false (including `undefined`), accept the change;
    // otherwise, revert to the previous value of checked
    if (this.toggle(newValue) !== false) {
      this._super();
    } else {
      this.element.checked = !newValue;
    }
  },
});

export default Checkbox;
