
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('dates', function(table) {
      table.increments();
      table.string('date');
      table.string('commissionsTotal');
      table.string('salesNet');
      table.string('leadsNet');
      table.string('clicks');
      table.string('epc');
      table.string('impressions');
      table.string('cr');
  });
};

exports.down = function(knex) {
  
};
