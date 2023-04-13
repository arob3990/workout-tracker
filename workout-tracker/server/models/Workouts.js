const { Schema, model } = require('mongoose');

const workoutsSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutCategories',
        required: true
      },
    description: {
        type: String,
        required: true,

    }
})

const Workouts = model('Workouts', workoutsSchema);

module.exports = Workouts;