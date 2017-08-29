## Server side
  $ npm i -S socket.io

  ```
  var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

  server.listen(80);


  io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
    console.log(data);
    });
  });
```
## Server side API
  - socket.emit() ：向建立该连接的客户端广播
  - socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
  - io.sockets.emit() ：向所有客户端广播，等同于上面两个的和

## Client side
  - socket.io will create socket.io.js for client 
    <script src="/socket.io/socket.io.js"></script>

  - Send message
       socket.emit("send message", $message.val());
             
  - Get message
     socket.on('get users', (data)=>{});


## Reference
  https://github.com/socketio/socket.io/tree/master/examples/chat