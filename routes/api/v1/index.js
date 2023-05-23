// we created index for api and a index file for each version also 
const express = require('express');

const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

module.exports = router;