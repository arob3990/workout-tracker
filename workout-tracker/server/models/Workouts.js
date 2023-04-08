const { Schema, model } = require('mongoose');

const workoutsSchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true,

    },
    description: {
        type: String,
        required: true,
        unique: true,
    }
})

const Workouts = model('Workouts', workoutsSchema);

module.exports = Workouts;