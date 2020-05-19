const db = require('../db/db');

const get = async () => {
  return db.select('users');
}

module.exports = { get };