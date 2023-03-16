const express = require('express');
const router = express.Router();
// getting controller
const userController = require('../controllers/users_controller'); 

// using controller
router.get('/profile',userController.profile); 
router.get('/post',userController.post); 
router.get('/signup',userController.signup); 
router.get('/signin',userController.signin); 
module.exports = router; 