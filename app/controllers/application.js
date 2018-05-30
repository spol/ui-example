import Controller from '@ember/controller';
import { alias, filter } from '@ember/object/computed';

export default Controller.extend({
  todos: alias('model'),

  visibleTodos: filter('todos.@each.{id,done}', function(todo) {
    return todo.id && !todo.done;
  }),
})
