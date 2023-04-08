const { Schema, model } = require('mongoose');

const userWorkoutsSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
    duration: {
        type: Number,
        required: false,
    },
    sets: {
        type: Number,
        required: false,
    },
    repetitions: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    weightUom: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        require: true,
    },
    workouts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Workouts',
        },
      ],

})

const UserWorkouts = model('UserWorkouts', userWorkoutsSchema);

module.exports = UserWorkouts;