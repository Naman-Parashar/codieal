const Post = require('../models/post')
const Comment = require('../models/comment');
const postMailer = require('../mailers/posts_mailer');
const queue = require('../config/kue');
const postEmailWorker = require('../workers/post_mailer');

// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){console.log('error in creating a post'); return;}

//         return res.redirect('back');
//     });
// }


// using async function 
module.exports.create = async function (req, res) {
  try {
   let post =  await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    // if it's a Ajax POST request 
    if (req.xhr){
      return res.status(200).json({
          data: {
              post: post
          },
          message: "Post created!"
      });
  }
  post = await post.populate('user', 'name email');

  // postMailer.newPost(post);

   //  with queue and delay job   (emails same  = name of queue )
   let job = queue.create('posts', post).save(function(err){
    if (err){
        console.log('Error in sending to the queue', err);
        return;
    }
    console.log('job enqueued', job.id);

});

  req.flash('success',"Post created successfully!");
  return res.redirect("back");
  } catch (err) {
    // console.log("error in creating a post");
    req.flash('error',err);
    return res.redirect("back");
  }
};

/////////////////////////////////////////////////////////

// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
//         // post can only be deleated by who post it

//         if(post.user == req.user.id){ // .id means converting the object id to a string
//             post.remove();

//             Comment.deleteMany({post : req.params.id}, function(err){
//                return res.redirect('back');
//             });
//         }else{
//             // user is not same 
//             // todo give error but done it in error handling part
//             return res.redirect('back');
//         }
//     });
// }

// using async function

module.exports.destroy = async function(req, res){

  try{
      let post = await Post.findById(req.params.id);

      if (post.user == req.user.id){
          post.remove();

          await Comment.deleteMany({post: req.params.id});

          if (req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted"
            });
        }

          req.flash('success', 'Post and associated comments deleted!');

          return res.redirect('back');
      }else{
          req.flash('error', 'You cannot delete this post!');
          return res.redirect('back');
      }

  }catch(err){
      req.flash('error', err);
      return res.redirect('back');
  }
  
}