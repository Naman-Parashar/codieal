const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
       async function (err, comment) {
          // handle error

          // adding comment to post  (here we are updating so we use save)
          post.comments.push(comment);
          post.save();
          comment = await comment.populate('user', 'name email');
          // to call without queue or delay job
          // commentsMailer.newComment(comment);

          //  with queue and delay job   (emails same  = name of queue )
          let job = queue.create('emails', comment).save(function(err){
            if (err){
                console.log('Error in sending to the queue', err);
                return;
            }
            console.log('job enqueued', job.id);

        });

          req.flash('success',"Comment Created Successfully");
          // console.log(comment);
          res.redirect("/");
        });
      }
    });
};



// module.exports.create =async function (req, res) {
//   console.log(req.body.post);
//   let post = await Post.findById(req.body.post);
//   console.log(post);
//     if (post) {
//       let comment = await Comment.create({
//         content: req.body.content,
//         post: req.body.post,
//         user: req.user._id,
//       });
//       // console.log('Inside the post');
//       post.comments.push(comment);
//       await post.save();
//           res.redirect("/");
//     }
//     else{
//       console.log("comment don't created");
//       res.redirect("/");
//     }
// };

// todo Using async function
// module.exports.create = async function(req, res){

//   try{
//       let post = await Post.findById(req.body.post);

//       if (post){
//           let comment = await Comment.create({
//               content: req.body.content,
//               post: req.body.post,
//               user: req.user._id
//           });

//           post.comments.push(comment);
//           post.save();

//           res.redirect('/');
//       }
//   }catch(err){
//       console.log('Error', err);
//       return;
//   }
  
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.destroy = function(req, res){
  Comment.findById(req.params.id, function(err, comment){
    if(comment.user == req.user.id){
      let postId = comment.post;

      comment.remove();

      // we also have to delete the comment id in post where we store the comment id in an array to featch comment easily
      // so we use postId var to go the the post of the comment fint the c_id in comment array and remove it

      Post.findByIdAndUpdate(postId , { $pull : {comment : req.params.id}}, function(err, post){
        req.flash('success',"Comment Deleted  Successfully");
        return res.redirect('back');
      });
    }else{
      req.flash('error',"Can't delete this comment");
      return res.redirect('back');
    }
  });
}

// using async function

// module.exports.destroy = async function(req, res){

//   try{
//       let comment = await Comment.findById(req.params.id);

//       if (comment.user == req.user.id){

//           let postId = comment.post;

//           comment.remove();

//           let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

//           // send the comment id which was deleted back to the views
//           if (req.xhr){
//               return res.status(200).json({
//                   data: {
//                       comment_id: req.params.id
//                   },
//                   message: "Post deleted"
//               });
//           }


//           req.flash('success', 'Comment deleted!');

//           return res.redirect('back');
//       }else{
//           req.flash('error', 'Unauthorized');
//           return res.redirect('back');
//       }
//   }catch(err){
//       req.flash('error', err);
//       return;
//   }
  
// }
