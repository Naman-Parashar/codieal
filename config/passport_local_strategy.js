const passport = require('passport');
const LocalStat = require('passport-local').Strategy;

passport.use(new LocalStat({
    usernameField: 'email',  // FROM OUR SCHEMA
    },
    function(email, password , done){  // callbacks function done is inbuild
        

    }
));