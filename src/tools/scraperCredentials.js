require('dotenv-safe').config({ 
  allowEmptyValues: true
});
const configDev = {
  SC_USER_DEV: process.env.SC_USER_DEV,
  SC_PASSWORD_DEV: process.env.SC_PASSWORD_DEV,
};

module.exports = configDev;