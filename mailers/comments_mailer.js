const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method we can also use modules.export...
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');  // '/comments/new_comment.ejs' = relative Path 
    nodeMailer.transporter.sendMail({
       from: 'codialservice@gmail.com',
       to: comment.user.email,   // send the mail to the user when a comment is (comment.post.user.email to send for every post)
       subject: "New Comment Published!",
    //    html: '<h1>Yup, your comment is now published!</h1>' 
       html: htmlString 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}