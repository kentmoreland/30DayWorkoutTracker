const express = require('express');
const workoutController = require('../../controllers/workouts');

const Router = express.Router();

Router.route('/')
  .get(workoutController.getWorkouts);

Router.route('/add')
  .post(workoutController.addWorkouts);

module.exports = Router;
