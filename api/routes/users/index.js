const express = require('express');
const userController = require('../../controllers/users');

const Router = express.Router();

Router.route('/signup')
  .post(userController.signup);

Router.route('/signin')
  .post(userController.signin);

module.exports = Router;
