const express = require('express');
const userRoutes = express.Router();
const controller = require('../controllers/users.controller');

// obtener todos los usuarios
userRoutes.get('/', controller.allUsers);

// obtener un usuario por id
userRoutes.get('/:id', controller.userId);

module.exports = userRoutes;
