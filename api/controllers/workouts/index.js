exports.getWorkouts = async (req, res) => {
  console.log(res.locals.db);
  res.send('test');
}

exports.addWorkouts = async (req, res) => {
  const { db } = res.locals;

  const result = await db.collection('workouts').insertOne(req.body);
  res.send({
    message: 'Successful signup',
    payload: result
  });
};
