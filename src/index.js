require('dotenv-safe').config({
  allowEmptyValues: true
});
const express = require('express');
const helmet = require('helmet');
const compress = require('compression');
const cors = require('cors');

const logger = require('./lib/logger');

const port = process.env.PORT || 8080;

/**
 * Express instance
 * @public
 */
const app = express();
// parse body params
app.use(express.json());
// gzip compression
app.use(compress());
// secure app by setting various HTTP headers
app.use(helmet());
app.use(helmet.hidePoweredBy());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.listen(port, () => logger.info(`Running on port ${port} env ${process.env.NODE_ENV}`));