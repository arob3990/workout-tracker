const db = require('../config/connection');
const { WorkoutCategories, Workouts } = require('../models');
// const categorySeeds = require('./categorySeeds.json');
// const workoutsSeeds = require('./workoutsSeeds.json');




db.once('open', async () => {
  
  await WorkoutCategories.deleteMany();

  const workoutCategories = await WorkoutCategories.insertMany([
    { name: "Upper Body"},
    { name: "Lower Body"}
  ]);

  console.log('workout categories seeded');

  await Workouts.deleteMany();

  await Workouts.insertMany([
    {
      category: workoutCategories[0]._id,
      description: "Bicep Curl"
  },
  {
      category: workoutCategories[0]._id,
      description: "Tricep Extension"
  },
  {
    category: workoutCategories[0]._id,
      description: "Dumbbell Bench Press"
  },
  {
    category: workoutCategories[0]._id,
      description: "Dubmmbell Incline Press"
  },
  {
    category: workoutCategories[0]._id,
      description: "Shoulder Press"
  },
  {
    category: workoutCategories[0]._id,
      description: "Chest Fly"
  },
  {
    category: workoutCategories[0]._id,
      description: "Lat Pulldown"
  },
  {
    category: workoutCategories[0]._id,
      description: "Cable Row"
  },
  {
    category: workoutCategories[1]._id,
      description: "Leg Press"
  },
  {
    category: workoutCategories[1]._id,
      description: "Hamstring Curl"
  },
  {
    category: workoutCategories[1]._id,
      description: "Hamstring Extension"
  },{
    category: workoutCategories[1]._id,
      description: "Calf Raise"
  },
  {
    category: workoutCategories[1]._id,
      description: "Squat"
  },
  {
    category: workoutCategories[1]._id,
      description: "Bulgarian Split Squat"
  },
  {
    category: workoutCategories[1]._id,
      description: "Romanian Deadlift"
  },
  {
    category: workoutCategories[1]._id,
      description: "Deadlift"
  }
  ])

  console.log('workouts seeded');
  process.exit();
});
