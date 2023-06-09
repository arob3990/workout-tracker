const { AuthenticationError } = require('apollo-server-express');
const { User, UserWorkouts, WorkoutCategories, Workouts } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    
    workoutCategories: async() => {
      return await WorkoutCategories.find();
    },
    


    workouts: async(parent, { category }) => {
      const params = {};
      
      if (category){
        params.category = category;
      }

      const workouts = await Workouts.find(params).populate('category');

      return workouts;
    },
    
    workout: async (parent, { _id}) => {
      return await Workouts.findById(_id).populate('category')
    },
    
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById({ _id: context.user._id }).populate({
          path : 'userWorkouts',
          populate : {
            path : 'workouts',
            populate: {
              path: 'category'
            }
          }
        });
        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },


    addWorkout: async (parent, { userId, userworkout }, context) => {


        const temp = await UserWorkouts.insertMany((userworkout))
        const tempUser = await User.findById(userId).populate('userWorkouts')
        console.log(tempUser)
        temp.forEach(workout =>{tempUser.userWorkouts.push(workout._id)})
        await tempUser.save()
        return await User.findById(userId).populate({
          path : 'userWorkouts',
          populate : {
            path : 'workouts',
            populate: {
              path: 'category'
            }
          }
        })

          
      // }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      // throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
