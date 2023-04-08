const db = require('../config/connection');
const { Workouts } = require('../models');
const workoutsSeeds = require('./workoutsSeeds.json');

db.once('open', async () => {
  try {
    await Workouts.deleteMany({});

    await Workouts.create(workoutsSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
