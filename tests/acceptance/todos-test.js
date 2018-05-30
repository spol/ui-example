import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | todos', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('I can see my todos', async function(assert) {
    this.server.create('todo', { task: 'brush the dog' });

    await visit('/');

    assert.equal(currentURL(), '/');
    assert.equal(findAll('.todo-form').length, 2);
    assert.equal(find('.todo-form input[type="text"]').value, 'brush the dog');
  });

  test('I can complete a todo', async function(assert) {
    this.server.create('todo', { task: 'brush the dog' });

    await visit('/');
    await click('.todo-form:first-child input[type="checkbox"]');

    assert.equal(findAll('.todo-form').length, 1);
  });

  test('I can view a completed todo', async function(assert) {
    this.server.create('todo', { task: 'brush the dog' });

    await visit('/');
    await click('.todo-form:first-child input[type="checkbox"]');
    await click('.show-completed input[type="checkbox"]');

    assert.equal(findAll('.todo-form').length, 2);
  });

  test('I can add a new todo', async function(assert) {
    await visit('/');
    await fillIn('.todo-form input[type="text"]', 'brush the dog');
    await triggerKeyEvent('.todo-form input[type="text"]', 'keyup', 13);

    assert.equal(findAll('.todo-form').length, 2);
    assert.equal(find('.todo-form:first-child input[type="text"]').value, 'brush the dog');
    assert.equal(find('.todo-form:last-child input[type="text"]').value, '');
  });
});
