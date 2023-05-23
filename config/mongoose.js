const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/codial_devlopment');

// verify if it is connected or not.
const db = mongoose.connection;

db.on('error',console.error.bind(console,'error'));

db.once('open',function(){
    console.log('Conected to data base data base :: MongoDB');
});


module.exports = db;