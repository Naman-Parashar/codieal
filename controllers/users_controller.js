module.exports.profile = function(req,res){
    return res.end('<h1> User Profile </h1>');
}

module.exports.post = function(req,res){
    return res.end('<h1> User post here </h1>');
}