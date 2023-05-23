const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

// crypto is used to generate random passwords as our passwords field is required so we need something
// as we are signing in with google. so we put a random password in here.
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '106415620928-fa08ta3gftedm6c8601ipfsa2oibulje.apps.googleusercontent.com', 
        clientSecret: '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', 
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    // callback function.
    function(accessToken, refreshToken, profile, done){
        // find a user
        //  profile.emails[0] ==> as we can get multiple emails from google we select first email
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile); // print the data given below
            
            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;

/* 
            {
  id: '111271690933847899541',
  displayName: 'Naman Parashar',
  name: { familyName: 'Parashar', givenName: 'Naman' },
  emails: [ { value: 'namanparashar484@gmail.com', verified: true } ],
  photos: [
    {
      value: 'https://lh3.googleusercontent.com/a/AGNmyxa3i-Mgn-W-Psz1TChvMpEOpOrt30SpbWgBhJUM=s96-c'
    }
  ],
  provider: 'google',
  _raw: '{\n' +
    '  "sub": "111271690933847899541",\n' +
    '  "name": "Naman Parashar",\n' +
    '  "given_name": "Naman",\n' +
    '  "family_name": "Parashar",\n' +
    '  "picture": "https://lh3.googleusercontent.com/a/AGNmyxa3i-Mgn-W-Psz1TChvMpEOpOrt30SpbWgBhJUM\\u003ds96-c",\n' +
    '  "email": "namanparashar484@gmail.com",\n' +
    '  "email_verified": true,\n' +
    '  "locale": "en"\n' +
    '}',
  _json: {
    sub: '111271690933847899541',
    name: 'Naman Parashar',
    given_name: 'Naman',
    family_name: 'Parashar',
    picture: 'https://lh3.googleusercontent.com/a/AGNmyxa3i-Mgn-W-Psz1TChvMpEOpOrt30SpbWgBhJUM=s96-c',
    email: 'namanparashar484@gmail.com',
    email_verified: true,
    locale: 'en'
  }
}
            */