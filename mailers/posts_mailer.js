const nodeMailer = require('../config/nodemailer');

exports.newPost = (post) => {
    console.log('inside newComment mailer', post);
    let htmlString = nodeMailer.renderTemplate({postData: post}, '/posts/new_posts.ejs');  // '/comments/new_comment.ejs' = relative Path 
    nodeMailer.transporter.sendMail({
       from: 'codialservice@gmail.com',
       to: post.user.email,   // send the mail to the user when a comment is (comment.post.user.email to send for every post)
       subject: "New Comment Published!",
    //    html: '<h1>Yup, your post is now published!</h1>' 
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