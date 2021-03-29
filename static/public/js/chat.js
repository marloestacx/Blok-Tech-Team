//Maak connectie met server-side socket.io
var socket = io.connect(process.env.PORT);

var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);
var el = document.getElementById('server-time');
ws.onmessage = function (event) {
  el.innerHTML = 'Server time: ' + event.data;
};

// Query DOM
var bericht = document.getElementById('bericht');
var knop = document.getElementById('submitText');
var output = document.getElementById('output');

//verstuur event naar serverside js
knop.addEventListener('click', function(){
    socket.emit('chat', {
        message: bericht.value
    })
});

//luister naar events van serverside js
socket.on('chat', function(data){
    //zet het bericht in een p en beeld deze af op de pagina
    output.innerHTML += '<section class="chat_msg nieuwBericht"><p>' + data.message + '</p></section>';
});