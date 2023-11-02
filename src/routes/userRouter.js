const express = require("express");

const checkJwt = require('../config/auth')

const api = express.Router();

const userController = require('../controllers/userController')

const {validateRegister , validateDelete} = require('../middlewares/userMiddleware')

api.get('/listar',checkJwt, userController.listar)

api.post('/registrar', checkJwt, validateRegister, userController.registrar)

api.delete('/eliminar',checkJwt, validateDelete, userController.eliminar)

module.exports = api;