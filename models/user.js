const mongoose = require('mongoose');
// using multer 
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uplode/users/avatar');

const userSchema = new mongoose.Schema({
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type : 'string',
        required: true
    },
    name:{
        type: 'string',
        required: true
    },
    avatar:{
        type: 'string'
    }
},{
    timestamps: true // KEEP TRACK of created at and updated at timestamp for us.
});

// this is the config to store file that is uploded to the destination (AVATAR_PATH)
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATAR_PATH));  // path.join(__dirname) give me the path of current directory 
      // this will result in "models + .. (to move two folder above)+ AVATAR_PATH"
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' +  Date.now()); // avatar-date the file will be store by this name
    }
  });


 // Static function (there are severl way to do so but we use this) 
//.single('avatar'); tell us that the field avtar in userSchema will only store a single file at a time not multiple files
userSchema.statics.uplodedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH; // it make it publicly available as we need it in controllers to access the path we can simply
// use it.

const User = mongoose.model('User', userSchema);

module.exports = User;