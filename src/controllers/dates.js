const db = require('../db/db');

const get = async() => {
  return await db.select('dates');
}

module.exports = { get };