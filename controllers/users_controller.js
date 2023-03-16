// render the user_profile page.
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    })
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