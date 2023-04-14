const { Schema, model } = require('mongoose');

const workoutsSchema = new Schema({
    
    description: {
        type: String,
        required: true,

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutCategories',
        required: true
      },
})

const Workouts = model('Workouts', workoutsSchema);

module.exports = Workouts;