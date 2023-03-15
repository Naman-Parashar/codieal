// step 5 of copy
const express = require('express');
const app = express();
const port = 8000;  // generally sites run on port 80.


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