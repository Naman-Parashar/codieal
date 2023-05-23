const queue = require('../config/kue');

const postsMailer = require('../mailers/posts_mailer');

queue.process('posts', function(job, done){   // emails = name of queue
    console.log('posts worker is processing a job ', job.data);

    postsMailer.newPost(job.data);

    done();
});