const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users/search', userController.searchUsers);


module.exports = router;