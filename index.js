// step 5 of copy
const express = require('express');
const app = express();
const port = 8000;  // generally sites run on port 80.

// use express router
app.use('/', require('./routes/index'));  // just like import  

app.listen(port,function(err){
    if(err){
        console.log(`Error in running thr surver: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});

