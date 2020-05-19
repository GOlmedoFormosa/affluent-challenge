const knex = require('knex');
const knexFile = require('../../knexfile').development;
const db = knex(knexFile);

const insert = (tableName, data) => {

  return db(tableName)
          .insert(data)
          .then(resp => resp)
          .finally(() => db.destroy());
}

const select = (tableName, options = { fields: [], filteringConditions: [] }) => {

  const { fields, filteringConditions } = options

  return db(tableName)
          .select(fields)
          .where(builder => {
              filteringConditions.forEach(condition => {
                  builder.where(...condition)
              });

          })
          .then(data => data)
          .finally(() => db.destroy());
}

module.exports = {
  insert,
  select
}