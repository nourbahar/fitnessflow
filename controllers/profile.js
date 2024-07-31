

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



router.get('/', (req, res) => {
    try {
        res.render('profile.ejs');
      } catch (error) {
        console.log(error)
        res.redirect('/')
      }
  });

module.exports = router;