import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, action } from '@ember/object';

export default class TodoForm extends Component {
  @service store;

  todo = null;

  didReceiveAttrs() {
    set(this, 'todo', this.todo || this.store.createRecord('todo'));
  }

  didRender() {
    if (this.todo.isNew) {
      this.element.querySelector('.todo-form-task').focus();
    }
  }

  @action save(event) {
    if (event) {
      event.preventDefault();
    }

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
  }
}
