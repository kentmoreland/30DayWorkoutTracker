'use strict'
const { initDb } = require('../database/config');

module.exports.up = async function (next) {
  const db = await initDb();
  try {
    await db.collection('workouts').updateMany({ status: { $exists: false } },{ $set: { status: 0 } })
    next()
  } catch (error) {
    next(error);
  }
}

module.exports.down = async function (next) {
  const db = await initDb();
  try {
    await db.collection('workouts').updateMany({ status: { $exists: true } }, { $unset: { status: 0 } })
    next()
  } catch (error) {
    next(error);
  }
  next()
}
