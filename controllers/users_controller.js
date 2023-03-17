// render the user_profile page.
module.exports.profile = function(req,res){
    console.log(req.cookie);
    return res.render('user_profile',{
        title:'User Profile'
    })

    // now we only have to show this page only when the user is logged in
    // if(req.cookie.user_id){  // if the user_id is present
    //     console.log('profile if block');
    //     user.findById(req.cookie.user_id)
    //     .then(function(user){
    //         if(user){
    //            return res.render('user_profile',{
    //             title:"User profile",
    //             user: user
    //            });
    //         }
    //         return res.redirect('/user/signin');
    //     })
    //     .catch(function(err){
    //         console.log("error in fiding user id", err);
    //     });
    // }
    // else{
    //     return res.redirect('/user/signin');
    // }
}

module.exports.post = function(req,res){
    return res.end('<h1> User post here </h1>');
}

// render the sign in page
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title:'Codial | Sign In'
    })
}

// render the sign up page
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title:'Codial | Sign up'
    })
}


const user = require('../models/user');

// getting sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(function(user){
        console.log(user);
        return res.redirect('/users/signin');
    }).catch(function(err){
        console.log(err);
    });
    // user.findOne({email: req.body.email})
    // .then(function(user){
    //     if(!user){
    //     console.log('IN THEN BLOCK');
    //     console.log(req.body.email);
    //     user.create(req.body)
    //     // .then(function(user){
    //         return res.redirect('/users/signin');
    // )}
    //     // })
    //     .catch(function(err){
    //         console.log('erron in sign up 2');
    //         return;
    //     });
    // }
    // else{
    //     console.log('in else block')
    //     return res.redirect('back');
    // }
    // })
    // .catch(function(err){
    //     console.log('in catch BLOCK');
    //     return res.redirect('back');
    // });
}


// sign in
module.exports.create_session = function(req,res){
    // steps to authenyication
    //find the usser 
    // handle user found 
       // if found then handle password 
       // create session
    // handle user not found

    user.findOne({email:req.body.email})
    .then(function(user){
        if(user){
            console.log("if block");
            if(user.password != req.body.password){
                return res.redirect("back");
            }

            res.cookie("user_id",user.id);
            return res.redirect("/users/profile");
        }
        else{
            console.log("else block");
            return res.redirect('back');
        }
    })
    .catch(function(err){
        console.log("Error:: user not found "+ err);
    });
    
 }