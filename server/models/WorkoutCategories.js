const { Schema, model } = require('mongoose');

const workoutsCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
      }
})

const WorkoutCategories = model('WorkoutCategories', workoutsCategorySchema );

module.exports = WorkoutCategories;