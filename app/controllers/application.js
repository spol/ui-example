import Controller from '@ember/controller';
import { alias, filter } from '@ember/object/computed';

export default class ApplicationController extends Controller {
  @alias('model')
  todos;

  @filter('todos.@each.{id,done}', function(todo){
    return todo.id && !todo.done;
  })
  visibleTodos;
}
