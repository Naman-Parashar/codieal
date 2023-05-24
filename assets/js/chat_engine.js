// froent end socket communacating from the client side on the browser
// this class will send req for connection
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // io is given by cdn of socket.io
        // this connect fun fires connection in chat_socket file
        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){
        // we store this in ar because this val will change in on.connect method 
        // so to preserve the value 
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            // event 1 emit
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            // on event 2
            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })

        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial'
                });     
            }
        });

        // event 3
        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');
             // this messageType is the class in li to distinguess the direction
            let messageType = 'other-message';
            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }


            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        });
    }
}