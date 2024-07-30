const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



router.get('/new', async (req, res) => {
    res.render('workouts/new.ejs');
  });


router.get('/', async (req, res) => {
  try {
  
    const currentUser = await User.findById(req.session.user._id);
    
    res.render('workouts/index.ejs', {
      workouts: currentUser.workouts,
    });
  } catch (error) {
  
    console.log(error)
    res.redirect('/')
  }
});



router.post('/new', async (req, res) => {
  try {
    //console.log("posting")
 
    const currentUser = await User.findById(req.session.user._id);

  
    req.body.date = new Date(req.body.date)

    const newWorkout = req.body
    //console.log(newWorkout)
    currentUser.workouts.push(newWorkout);
    //console.log(currentUser)
 
    await currentUser.save();
    
    res.redirect(`/users/${currentUser._id}/workouts`);
  } catch (error) {
   
    console.log(error);
    res.redirect('/')
  }
});




router.delete('/:workoutId', async (req, res) => {
  try {
   
    const currentUser = await User.findById(req.session.user._id);
   
    currentUser.workouts.id(req.params.workoutId).deleteOne();
  
    await currentUser.save();
    
    res.redirect(`/users/${currentUser._id}/workouts`);
  } catch (error) {
  
    console.log(error);
    res.redirect('/')
  }
});


router.get('/:workoutId', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);
  
    const workout = currentUser.workouts.id(req.params.workoutId);
  console.log(workout);
    res.render('workouts/show.ejs', {
      workout: workout,
    });
  } catch (error) {
   
    console.log(error);
    res.redirect('/')
  }
});


router.put('/:workoutId', async (req, res) => {
  try {
   
    const currentUser = await User.findById(req.session.user._id);
   
    const workout = currentUser.workouts.id(req.params.workoutId);
    
    workout.set(req.body);

    await currentUser.save();
   
    res.redirect(
      `/users/${currentUser._id}/workouts/${req.params.workoutId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.get('/:workoutId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const workout = currentUser.workouts.id(req.params.workoutId);
    res.render('workouts/edit.ejs', {
      workout: workout,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});
module.exports = router;