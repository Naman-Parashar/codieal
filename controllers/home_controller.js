// module.exports.actionName = function(req,res){
//     function body
// }

const Post = require('../models/post');
const User = require('../models/user'); 
// module.exports.home = function(req,res){
//    // console.log(req.cookies);  // print the cookie value as it first comr as a request 
//    // to change the value of cookie when it is send as response
//    // res.cookie('id',25); // ssetin a new value ti "Id" key.
//     //----------------------------------------------------------------------------------------------------------------
//    // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         posts:  posts
//     //     });
//     // });

//     // populate the user of each post  by using populate we are getting the whole user object not only the id.
//     // as it has the refrence to user the object id reffet ti user wiss post it so we need to get that user obj.
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate: {
//             path:'user'
//         }
//     })
//     .exec(function(err, posts){
//         // we find all the user and return it to home page.
//         User.find({}, function(err, users){
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts:  posts,
//                 all_users: users
//             });
//         });
//     })
// }

  // code using async function and await
  module.exports.home = async function(req,res){

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path:'user'
            }
        });

     let users = await User.find({});
     
     return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });
    }catch(err){
        console.log("Error :",err);
        return;
    }
 }