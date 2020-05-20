const knex = require('knex');

const logger = require('../lib/logger');
const knexFile = require('../../knexfile').development;
const db = knex(knexFile);

const insert = (tableName, data) => {

  return db(tableName)
          .insert(data)
          .then(resp => resp)
          .catch(error => {
            logger.error(error);
            throw new Error(error)
          });
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
          .catch(error => {
            logger.error(error);
            throw new Error(error)
          });
}

module.exports = {
  insert,
  select
}