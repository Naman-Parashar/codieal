// step 5 of copy
const express = require('express');
const app = express();
const port = 8000;  // generally sites run on port 80.
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');

// use for session cookie (passport)
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passport_JWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');


// to store cookiee in DB
const MongoStore = require('connect-mongo')(session); // we pass sesssion an agrument as it storee the session cookie

// flash messages
const flash = require('connect-flash');
const  customMiddlewareFlash = require('./config/middleware_flash');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);  // app = express();
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer); // chatSockrts(charServer) is a function defined in chat_socket config file
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


// SASS 
const sassMiddleWare = require('node-sass-middleware');
app.use(sassMiddleWare({
    src: './assets/scss', // from where we have to pick up scss file to convert to css
    dest: './assets/css',
    debug: true ,    // did we want to display err on console
    outputStyle:'extended',  // i want it to bre single line(compressed) or multiple lines(extended)
    prefix: '/css'  //where the server should look for files for layouts 
}));


//we have to tell that allthe routes have some layout
app.use(expressLayout);

// using static files
app.use(express.static('./assets'));

// to read through post requests
app.use(express.urlencoded());

// for profile picture for /uplode path find the folder using ecpresss.static 
// it make the uplode path available for the browser
app.use('/uplode',express.static(__dirname+'/uplode'));

// use cookie parser
app.use(cookieParser());

// now if we want to set difftrent link or script tag for diff pages we can just write it in those pages but due to layout
// our link tag will in body and script before footer now we have to tell the page that whenever it encounter a
// link tag it has to put it in  a specific position

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setting up view engines
app.set('view engine','ejs');
app.set('views','./views')  // we can use path module or we can also givi it an array.

// mongo store is used to store the session cookies in the database
app.use(session({
    name: 'codeial',   // name of cookie
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',   // encoding key
    saveUninitialized: false, // WHEN USER is not log in do i want to save extra data no i don't so false
    resave: false,  //
    cookie: {
        maxAge: (1000 * 60 * 100)   // age for cookie just like payment page  (milisecond)
    } ,
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove :'disabled'
    }, function(err){
        console.log(err || "connection setup done"); // logical "OR" used
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser) // function in config it check weather the session cookie is present or not


// flash messages we put it after the session cookie because it uses session cookie
app.use(flash());
app.use(customMiddlewareFlash.setFlash);


// use express router
app.use('/', require('./routes/index'));  // just like import  
app.listen(port,function(err){
    if(err){
        console.log(`Error in running thr surver: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
