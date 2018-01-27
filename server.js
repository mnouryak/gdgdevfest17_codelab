var http = require('http'),
    MD5 = require('MD5');

httpServer = http.createServer(function (res, req) {
    console.log('un utilisateur vient de se connecter');
});

var io = require('socket.io').listen(httpServer);
 var users = {};
var messages = [];
var history = 3;

httpServer.listen(2000, function () {
    console.log('I am running on 2000');
});



io.sockets.on('connection', function (socket) {
    var me = false;
    console.log('bienvenue!');

    for (var u in users) {
        socket.emit('newUser', users[u]);
    }

    /**
     * on recoit un message
     */
    socket.on('newMsg', function (message) {
        message.user = me;
        date = new Date();
        message.h = date.getHours();
        message.m = date.getMinutes();
        messages.push(message);
        if(messages.length>history){
            messages.shift();
        }
        io.sockets.emit('newMsg', message);
    })

    for(var m in messages){
        socket.emit('newMsg', messages[m]);
    }

    /**
     * un utilisateur se connecte
     */
    socket.on('login', function (user) {
        me = user;
        me.id = user.email.replace('@', '-').replace('.', '-');
        me.avatar = 'https://gravatar.com/avatar/' + MD5(user.email) + '?s=50';
        socket.emit('logged');
        users[me.id] = me;
        io.sockets.emit('newUser', me);
    })

    /**
     * un utilisateur se deconnecte
     */

    socket.on('disconnect', function () {
        if (!me) {
            return false;

        }
        delete users[me.id];
        io.sockets.emit('disconnectUser', me);
    })
});
