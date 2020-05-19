
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', function(table) {
      table.increments();
      table.string('email');
      table.string('first_name');
      table.string('last_name');
      table.string('avatar');
  });
};

exports.down = function(knex) {
  
};
