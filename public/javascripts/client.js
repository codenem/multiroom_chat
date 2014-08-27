var socket = io.connect(location.origin);
var switchRoom = function (room) {
    socket.emit('switchRoom', room);
};

$(function () {

    // on connection to server, ask for user's name with an anonymous callback
    socket.on('connect', function(){
        // call the server-side function 'adduser' and send one parameter (value of prompt)
        socket.emit('adduser', prompt("What's your name?"));
    });

    // listener, whenever the server emits 'updatechat', this updates the chat body
    socket.on('updatechat', function (username, data) {
        $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
    });

    // listener, whenever the server emits 'updaterooms', this updates the room the client is in
    socket.on('updaterooms', function (rooms, current_room) {
        $('#rooms').empty();
        $.each(rooms, function(key, value) {
            if(value == current_room){
                $('#rooms').append('<div>' + value + '</div>');
            }
            else {
                $('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
            }
        });
    });

    // ADDINGS_BEGIN
    // listener, whenever the server emits 'updateusers', this updates the room the client is in
    socket.on('updateusers', function (users) {
        $('#users').empty();
        $.each(users, function(key, value) {
            $('#users').append('<div>' + key + '</div>');
        });
    });
    // ADDINGS_END

    // ADDINGS_BEGIN
    socket.on('checkroom', function (room, username) {
        $('#rooms').append('<div><a href="#" onclick="switchRoom(\''+room+'\')">' + room + '</a></div>');
    });
    // ADDINGS_END

    // ADDINGS_BEGIN
    // listener, whenever the server emits 'fullnewroom', this update the chat body
    socket.on('fullnewroom', function (username, data) {
        $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
    });
    // ADDINGS_END

    // ADDINGS_BEGIN
    // listener, whenever the server emits 'searchresult', this update the find user body
    socket.on('searchresult', function (data) {
        $('#searchresult').html(data);
    });
    // ADDINGS_END

    // ADDINGS_BEGIN
    // listener, whenever the server emits 'bannresult', this update the find user body
    socket.on('bannresult', function (data) {
        $('#bannresult').html(data);
    });
    // ADDINGS_END

    // ADDINGS_BEGIN
    // listener, whenever the server emits 'banninguser', this bann the user
    socket.on('banninguser', function (userbanned) {
        socket.emit('bannme', userbanned);
    });
    // ADDINGS_END

    // CONVERSATION
    // when the client clicks SEND
    $('#datasend').click( function () {
        var message = $('#data').val();
        $('#data').val('');
        // tell server to execute 'sendchat' and send along one parameter
        socket.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('#data').keypress(function (e) {
        if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
        }
    });

    // ADDINGS_BEGIN
    // FIND USER
    // when the client clicks SEARCH
    $('#usersearch').click( function () {
        var usersearched = $('#usersearched').val();
        socket.emit('searchuser', usersearched);
    });

    // when the client hits ENTER on their keyboard
    $('#usersearched').keypress(function (e) {
        if(e.which == 13) {
            $(this).blur();
            $('#usersearch').focus().click();
        }
    });

    // BANN USER
    // when the client clicks SEARCH
    $('#userbann').click(function () {
        var userbanned = $('#userbanned').val();
        socket.emit('bannuser', userbanned);
    });

    // when the client hits ENTER on their keyboard
    $('#userbanned').keypress(function (e) {
        if(e.which == 13) {
            $(this).blur();
            $('#userbann').focus().click();
        }
    });
    // ADDINGS_END
});