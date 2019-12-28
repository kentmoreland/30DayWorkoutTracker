const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({path: 'variables.env'});
const { initDb, addDbToRequest } = require('./database/config');

const db = initDb();
const td = express();
setDb = addDbToRequest(db);

td.use(setDb);
td.use(bodyParser.json());
td.use(bodyParser.urlencoded({extended: true}));

td.use(morgan('dev'));

td.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
const userRouter = require('./routes/users');
const workoutRouter = require('./routes/workouts');

td.use( '/users', userRouter);
td.use( '/workouts', workoutRouter);

td.listen(process.env.PORT, () => {
  console.warn(`30 Day workout tracker is running on ${process.env.PORT}`);
});
