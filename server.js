var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

//Routing
app.use(express.static('public'));

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

//Chatroom
var numUsers = 0;

io.on('connection', function (socket) {
    numUsers += 1;
    console.log('Client connected');
    
    var addedUser = false;
    
    //When the client emits 'new message', this listens and executes
    socket.on('new message',function(data){
        //Tell the client to execute 'New Message'
        socket.broadcast.emit('new message',{
            username: socket.username,
            message: data
        });
    });
    
    socket.on('add user',function(username){
        if (addedUser) return;
        
        //we store the username in the socket session for this client
        socket.username = username;
        ++ numUsers;
        addedUser = true;
        socket.emit('login',{
            numUsers:numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
        });
    })
    
    
    
    socket.broadcast.emit('new message', {
      username: socket.username,
    });
    socket.on('typing', function (){
        socket.broadcast.emit('typing');
    });
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
    
    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socket.broadcast.emit('typing',{
            username: socket.username
        });
  });
});

io.on('connection', function (socket) {
    socket.on('disconnect', function() {
        console.log('A user has disconnected');
    });
});

//server.listen(8080);