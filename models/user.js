const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },

  duration: {
    type: Number,
  },

  type: {
    type: String,
    enum: ["Stregth", "Cardio", "Flexbility", "Yoga", "HIIT"],
  },
  exercises1:{
    type: String
  },

  exercises2:{
    type: String
  },

  exercises3:{
    type: String
  },
  exercises4:{
    type: String
  },

  exercises5:{
    type: String
  },
  
}, { timestamps: true })

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  workouts:[workoutSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
