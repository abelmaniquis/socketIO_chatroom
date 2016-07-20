var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var usercount = 0;

io.on('connection', function (socket) {
    usercount += 1;
    var username = "Person" + usercount.toString();
    console.log(usercount);
    console.log(username);
    console.log('Client connected');

    socket.on('message', function(message) {
        console.log(username + ': ', message);
        socket.broadcast.emit('message',username + ":" + message);
    });
});

server.listen(8080);