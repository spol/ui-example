import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  classNames: 'todo-form',

  store: service(),

  todo: null,

  didReceiveAttrs() {
    this._super(...arguments);
    set(this, 'todo', this.todo || this.store.createRecord('todo'));
  },

  didRender() {
    this._super(...arguments);

    if (this.todo.isNew) {
      this.element.querySelector('.todo-form-task').focus();
    }
  },

  actions: {
    save() {
      if (this.todo.isSaving) {
        return;
      }

      const todo = this.todo;
      const isNew = this.todo.isNew;

      if (todo.task) {
        if (isNew) {
          set(this, 'todo', this.store.createRecord('todo'));
        }

        return todo.save();
      } else if (!isNew) {
        return todo.destroyRecord();
      }
    },
  }
})
