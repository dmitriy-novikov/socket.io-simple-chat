var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/style.css');
});

io.on('connection', function(socket){
  io.emit('system message', ' *** Кто-то добавился');
  socket.on('disconnect', function(){
    io.emit('system message', ' *** Кто-то('+socket.id+') вышел из чата');
  });
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});