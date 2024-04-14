const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users/users.controler');

router.post('/', usersController.createUser);

module.exports = router;
