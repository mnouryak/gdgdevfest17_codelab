(function($){
    var socket = io.connect('http://localhost:2000');
    $('#messages-container').hide(); 

    var msg = $('#msg').html();
<<<<<<< HEAD
    $('#msg').hide(); 
=======
   // $('#msg').remove(); 
>>>>>>> isaac_users

    $('#myForm').submit(function(event){
        event.preventDefault();
        socket.emit('login',{
            email:$('#email').val(),
            pwd:$('#pwd').val()
        })
    });

    socket.on('logged', function(){
        $('#login-container').css("display","none");
        $('#messages-container').show();
        $('#messages-container').focus();
        
    });


    /**
     * envoie de message
     */
    $('#msgForm').submit(function(event){
        event.preventDefault();
        socket.emit('newMsg',{message:$('#message').val()})
        $('#message').val('');
        $('#message').focus();
    })

    socket.on('newMsg',function(message){
        console.log(message.message);
        $('#msg').show(); 
        $('#msg').append('<div>'+message.message+'</div>');
    })


    /**
     * Mes utilisateurs
     */

    socket.on('newUser',function(user){
        $('.logo-margin-avatar').append('<img src="'+user.avatar+'" id="'+user.id +'"><strong>'+ user.email+'</strong><br><br>');
    })

    socket.on('disconnectUser',function(user){
      $('#'+user.id).remove();
    })


})(jQuery);