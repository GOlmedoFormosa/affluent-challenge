const { code } = require('../errors/code');
const NotFound = require('../errors/NotFound');
const logger = require('../lib/logger');

const notFoundHandler = (req, res, next) => next(new NotFound());

const errorHandler = (err, req, res, next) => {
  logger.error(`errorHandler ${err}`);
  const message = err[code] ? err.message : 'Internal Server Error';
  res.status(err[code] || 500).json({
    message,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
  });
}

module.exports = [
  notFoundHandler,
  errorHandler
]