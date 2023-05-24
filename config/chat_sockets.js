// oberver
// recive req for connection
module.exports.chatSockets = function(chatServer){
    let io = require('socket.io')(chatServer,{
        cors:{
            origin:'*'
        }
    });

    // 
    io.sockets.on('connection', function(socket){    // pre definr =>  'connection'
        console.log('new connection received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });


        // event 1 on (received)
        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            //if chatroom exist it join and if not it create it
            socket.join(data.chatroom);

            // emit in a specific chatRoom emit 2
            io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message',function(data){
            // event 3
            io.in(data.chatroom).emit('receive_message',data);
        });

    });
}