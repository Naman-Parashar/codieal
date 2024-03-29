const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true // using this we can now send req in function.
    },
    function(req,email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                req.flash('error', err);
                // console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password){
                req.flash('error',"Invalid Username/Password");
                // console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

// send data to view page 

//step 1 - authenticate user
passport.checkAuthentication = function(req, res, next){
    // if user is signed in, then pass the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just this to the ;ocals for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;