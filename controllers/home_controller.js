// module.exports.actionName = function(req,res){
//     function body
// }

module.exports.home = function(req,res){
 return res.render('home',{
    title:"HOME"
 });
}