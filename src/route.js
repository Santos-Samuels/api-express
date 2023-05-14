const express = require('express');

const userController = require('./controllers/UserController');
const route = express.Router();

route.get('/api/user/list', userController.listUsers);
route.get('/api/user/show/:id', userController.getUserById);
route.post('/api/user/create', userController.createUser);
route.put('/api/user/update/:id', userController.updateUser);
route.delete('/api/user/delete/:id', userController.deleteUser);

module.exports = route;
