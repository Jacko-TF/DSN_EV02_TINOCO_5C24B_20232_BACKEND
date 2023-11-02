const express = require('express');
const app = express.Router();
const checkJwt = require('../config/auth')

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Accediste correctamente a un endpoint público'
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Accediste correctamente a un endpoint privado'
  });
});

// const { requiredScopes } = require('express-oauth2-jwt-bearer');

// const checkScopes = requiredScopes('read:messages');

// app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//   });
// });

module.exports = app