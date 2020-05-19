const { code } = require('./code');

class NotFound extends Error {
  constructor(message = 'Not Found', ...args) {
    super(message, ...args);
    this[code] = 404;
  }
}

module.exports = NotFound;