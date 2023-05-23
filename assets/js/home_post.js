{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();  // prevent default action of form submit.

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(), // convetr the data into json form
                success: function(data){
                   let newPost = newPostDom(data.data.post);
                   $('post-list-container > ul').prepend(newPost);
                   deletePost($('.delete-post-button'),newPost);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            
            <small>
                <a class="delete-post-button" href="/posts/destroy/<%= post.id %>">Delete Post</a><br>
            </small>
    
            post: ${ post.content}
            <br>
            <small>
               user:: ${ post.user.name }
            </small>
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add Comment...." required>
                    <input type="hidden" name="post" value="${post._id }">
                    <input type="hidden" name="user" value="${post.user._id}">
                    <input type="submit" value="Add Comment">
                </form>

            <div class="post-comments-list">
                <ul id="post-comments-${post._id }">
                </ul>
            </div>
        </div>
        
    </li>`);
    }



    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),  // it get the value of href of that button
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    createPost();
}