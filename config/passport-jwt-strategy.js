const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWTHeader = require('passport-jwt').ExtractJwt; // it help us to extract tocken header

const User = require('../models/user');
// jwt has [header payload signature]
// use for encription 
let opts = {
    jwtFromRequest: ExtractJWTHeader.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
            return done(null, user); // null for error
        }else{
            return done(null, false); // false means user not found
        }
    })

}));

module.exports = passport;
