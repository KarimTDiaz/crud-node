const express = require('express');
const userRoutes = express.Router();
const controller = require('../controllers/users.controller');

// obtener todos los usuarios
userRoutes.get('/', controller.allUsers);

// obtener un usuario por id
userRoutes.get('/:id', controller.userId);

userRoutes.post('/', controller.createUser);

userRoutes.delete('/:id', controller.deleteUser);

userRoutes.patch('/:id', controller.updateUser);
module.exports = userRoutes;
