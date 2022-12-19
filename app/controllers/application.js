import Controller from '@ember/controller';
import {computed} from '@ember/object';
import { alias } from '@ember/object/computed';

export default class ApplicationController extends Controller {
  @alias('model')
  todos;

  // TODO: persist user state?
  @computed('todos.@each.{id,done}', 'showCompleted')
  get visibleTodos() {
    return this.get('todos').filter((todo) => {

      if (!todo.id) {
        return false;
      }

      return this.showCompleted || !todo.done;
    });
  }
}
