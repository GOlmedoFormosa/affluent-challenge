const db = require('../db/db');

const get = async () => {
  return await db.select('users');
}

module.exports = { get };