(function($){
    var socket = io.connect('http://localhost:2000');
    $('#messages-container').hide(); 

    var msg = $('#msg').html();
    $('#msg').hide(); 

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
        $('#msg').append('<div class="row pannel"><div class="col-md-6 col-md-offset-4"><img src="'
        +message.user.avatar+'"><strong>'+message.user.email+'</strong></div><div class="col-md-4 col-md-offset-4" style=" max-width: 100%;"><span>'
        +message.message+'</span></div></div><br><hr>');
    })


    /**
     * Mes utilisateurs
     */

    socket.on('newUser',function(user){
        $('.logo-margin-avatar').append('<div  id="'+user.id +'" class="row"><img src="'+user.avatar+'"><strong>'+ user.email+'</strong></div><br><br>');
    })

    socket.on('disconnectUser',function(user){
      $('#'+user.id).remove();
    })


})(jQuery);