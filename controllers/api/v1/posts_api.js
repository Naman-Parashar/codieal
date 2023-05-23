// a api structute 
// module.exports.index = function(req, res){
//     return res.json(200, {
//         message: "List of posts",
//         posts: []
//     })
// }

const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){
    try { 
        // we ar getting all posts from db
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    // we are returnig those posts
return res.json(200, {
    message: "List of posts",
    posts: posts
});
    } catch (error) {
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}


module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


    
            return res.json(200, {
                message: "Post and associated comments deleted successfully!"
            });
        }else{
            return res.json(401, {
                message: "You cannot delete this post!"
            });
        }

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
    
}