import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  task() {
    return `${faker.hacker.verb()} ${faker.hacker.noun()}`;
  },
});
