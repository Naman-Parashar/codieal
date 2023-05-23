const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel' // dynamic refreference
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment'] // enum tells that ike belong to post or comment only notother than that
    }
}, {
    timestamps: true
});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;