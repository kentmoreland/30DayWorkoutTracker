const MongoClient = require('mongodb').MongoClient;

const initDb = async () => {
  const client = await MongoClient.connect(process.env.DB_HOST);
  const db = client.db('30dayworkout');
  db.collection('users').createIndex({ email: 1 }, { unique: true });
  return db;
}

const addDbToRequest = (dbase) => {
  return async (req, res, next) => {
    res.locals.db = await dbase;
    next();
  }
}

module.exports = {
  initDb,
  addDbToRequest
}
