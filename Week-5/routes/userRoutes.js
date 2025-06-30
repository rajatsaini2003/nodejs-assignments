const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/createUser', userController.createUser);
router.get('/getUserById/:id', userController.getUserById);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.get('/users/search', userController.searchUsers);


module.exports = router;