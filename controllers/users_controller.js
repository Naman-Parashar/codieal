const User = require('../models/user');
const fs = require('fs');
const path = require('path');


// render the user_profile page.
module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}

// update profile

// module.exports.update = function(req, res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){ // or insted of req.body wecan also write{name: req.body.name , email: req.body.email}
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('Unauthorized');
//     }
// }

// using async function

module.exports.update =async function(req, res){
    if(req.user.id == req.params.id){
        try {
            let user = await  User.findByIdAndUpdate(req.params.id);            
            // as we have multipart form our req.parems can't get data so we use multer as multer function also has
            // req in it's function
            User.uplodedAvatar(req,res,function(err){
                if(err){
                    console.log("*** Multer Error ****"+err);
                }
                console.log(req.file); 
                /*PRINT THIS:
                mimetype: 'image/jpeg',
                destination: 'D:\\Front-End\\codial\\models',
                filename: 'avatar-1680528749688',
                path: 'D:\\Front-End\\codial\\models\\avatar-1680528749688',
                size: 65308           */
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){ // we check bcz not every time user will uploda a file 
                    // this is saving the path of the uploded file into the avtar field in the user
                    // if we already hava a avatar uploded then we just delete the old file and replace it with the new
                    // for deleating we need the file module and path module
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            }); 

        } catch (err) {
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error',"Unauthorized")
        return res.status(401).send('Unauthorized');
    }
}




// render the sign in page
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){ // if user is alseady sign in then it can't access the sign in page
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codial | Sign In'
    })
}

// render the sign up page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){ // if user is alseady sign in ..... same
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codial | Sign up'
    })
}



// getting sign up data
module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                req.flash('success',"Sign-up successfully");
                return res.redirect('/users/signin');
            })
        }else{
            // console.log('user  already signed up');
            req.flash('error',"User  Already Signed-up");
            return res.redirect('back');
        }

    });
}


// sign in
module.exports.create_session = function(req,res){
    req.flash('success',"Login successful");
    // asumming uere is sign in 
    return res.redirect('/');   
 }

 // sign out 
 module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if (err){
            console.log("err in lod out");
            return next(err);
        }
        req.flash('error',"Log-out successful"); // this will pass this to html or ejs template
        // console.log("Log-out successful");
        return res.redirect('/');
    });
 
    // instead of creatin  a middleware we can also done this but doing it every time is not good and what will be the use of
    // req.flash(""); then
    // return res.redirect('/' , flash({sucess: "message"}));
}


