const express = require('express');
const router = express.Router();
console.log('Router loaded');

// getting controller
const homeController = require('../controllers/home_controller'); 



// using controller
router.get('/',homeController.home);
router.use('/users', require('./users'));

// for further routes we can do it
// routes.use('/_name', require('file_name'));

module.exports = router; // we export to make it avilable to all files