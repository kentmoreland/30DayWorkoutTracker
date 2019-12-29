exports.getWorkouts = async (req, res) => {
  const { db } = res.locals;
  const { id } = req.params.id;
  const result = await db.collection('workouts').find({user: id}).toArray();;
  res.send({
    message: 'Successful workouts request',
    payload: result
  });
}

exports.addWorkouts = async (req, res) => {
  const { db } = res.locals;

  const result = await db.collection('workouts').insertOne(req.body);
  res.send({
    message: 'Successful workout update',
    payload: result
  });
};
