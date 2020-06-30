const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router.route('/search').get(auth('searchUsers'), validate(userValidation.searchUser), userController.searchUsers);

router.route('/:userId').get(auth('getUsers'), validate(userValidation.getUser), userController.getUser);

module.exports = router;
