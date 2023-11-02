const config = require('../config/config');
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: config.audience,
  issuerBaseURL: config.issuerBaseURL,
});

module.exports = checkJwt