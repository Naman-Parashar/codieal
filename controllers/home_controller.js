// module.exports.actionName = function(req,res){
//     function body
// }

module.exports.home = function(req,res){
   console.log(req.cookies);  // print the cookie value as it first comr as a request 
   // to change the value of cookie when it is send as response
   // res.cookie('id',25); // ssetin a new value ti "Id" key.
 return res.render('home',{
    title:"HOME"
 });
}