exports.getWorkouts = async (req, res) => {
  console.log(res.locals.db);
  res.send('test');
}
