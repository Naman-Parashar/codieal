// step 5 of copy
const express = require('express');
const app = express();
const port = 8000;  // generally sites run on port 80.
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts')

//we have to tell that allthe routes have some layout
app.use(expressLayout);

// using static files
app.use(express.static('./assets'));

// now if we want to set difftrent link or script tag for diff pages we can just write it in those pages but due to layout
// our link tag will in body and script before footer now we have to tell the page that whenever it encounter a
// link tag it has to put it in  a specific position

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.listen(port,function(err){
    if(err){
        console.log(`Error in running thr surver: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});

// use express router
app.use('/', require('./routes/index'));  // just like import  

// setting up view engines
app.set('view engine','ejs');
app.set('views','./views')  // we can use path module or we can also givi it an array.