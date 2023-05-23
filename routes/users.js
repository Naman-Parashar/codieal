const express = require('express');
const router = express.Router();
// getting controller
const userController = require('../controllers/users_controller'); 
const passport = require('passport');
// using controller
router.get('/profile/:id',passport.checkAuthentication ,userController.profile);  // by usinf passport now we can only access profile page when we are signed in only
router.post('/update/:id', passport.checkAuthentication, userController.update);

router.get('/signup',userController.signup); 
router.get('/signin',userController.signin); 

router.post('/create',userController.create);  // for signup form so we use post method we are getting data

//use passport as the middleware
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
) ,userController.create_session);

// sign out
router.get('/sign-out', userController.destroySession);


// routes for google sign in
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']})); // when we send request to google 
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.create_session); // here we recives the data



module.exports = router; 