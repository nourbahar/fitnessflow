const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  
name:{
  type:String,
},
reps:{
  type:Number
},
sets:{
  type:Number
},

weight:{
  type:Number
}
 
 }, { timestamps: true });

const workoutSchema = new mongoose.Schema({
 name:{
  type: String
 },
  date: {
    type: Date,
    required: true,
  },

  duration:{
    type: Number
  },
  
  type: {
    type: String,
    enum: ['Stregth', 'Cardio', 'Flexbility','Yoga','HIIT'],
  },
 exercises:[exerciseSchema]
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  workouts:[workoutSchema]
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
