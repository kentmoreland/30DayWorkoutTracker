const express = require('express');
const workoutController = require('../../controllers/workouts');

const Router = express.Router();

Router.route('/:id')
  .get(workoutController.getWorkouts);

Router.route('/add')
  .post(workoutController.addWorkouts);

module.exports = Router;
