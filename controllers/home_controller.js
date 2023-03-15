// module.exports.actionName = function(req,res){
//     function body
// }

module.exports.home = function(req,res){
    return res.end('<h1>Express is up for codial');
}