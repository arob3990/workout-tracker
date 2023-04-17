const { Schema, model } = require('mongoose');

const userWorkoutsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: false,
        trim: true,
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
        required: true,
    },
    warmup_cooldown: {
        type: String,
        required: false
    },
    workouts: 
        {
          type: Schema.Types.ObjectId,
          ref: 'Workouts',
        },
      

})

const UserWorkouts = model('UserWorkouts', userWorkoutsSchema);

module.exports = UserWorkouts;