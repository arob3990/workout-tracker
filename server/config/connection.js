const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

console.log(process.env.MONGODB_URI),

module.exports = mongoose.connection;
