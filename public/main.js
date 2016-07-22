$(document).ready(function() {
    var FADE_TIME = 150; //ms
    var TYPING_TIMER_LENGTH = 400;
    var COLORS = [
        '#e21400','#91580f','#f8a700',
    ];
    
    //Initialize variables:
    var $window = $(window);
    var $usernameInput = $('.usernameInput'); //input for username
    
    
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    
    //Prompts for setting a username
    var username;
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var $currentInput = $usernameInput.focus();
    
    var addMessage = function(message) {
        messages.append('<div>' + username + ": " + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message',message);
        input.val('');
    });

socket.on('message', addMessage);
});