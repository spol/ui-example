export default function() {
  this.namespace = '/api';
  this.logging = true;

  this.get('/todos');
  this.post('/todos');
  this.get('/todos/:id');
  this.patch('/todos/:id');
  this.del('/todos/:id');
}
