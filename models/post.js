const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content: {
        type : 'string',
        required: true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // include the array of ids of all comments in this post schema itself i need to find all the comment on a post 
    // we can just go to comment and featch all of it but to make t fast we have added id og each comment on the post to itself
    // instead of gooing to each comment and find the id of post in comment == to post id  i just featch all the id below
    // AS it oly have the id of those comment that are done on this post.

    // we can also done it with user and post as user contain posts array that the specific user has posted.
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;