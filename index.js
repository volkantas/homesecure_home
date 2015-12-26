//CONFIG
var Config = require('./lib/config.js');
//INCLUDE MODULES
var express = require('express');
var app = express();
var socket = require('socket.io-client')(Config.homeServerIP + ":" + Config.homeServerPort);
var SocketIO = require('./lib/socketio.js');
var IpCam = require('./lib/ipcam.js');
var Sound = require('./lib/sound.js');

//SOUND INIT
var snd = new Sound({
  socket:socket,
  path: "Warning-alarm-sound-effect.mp3"
});

//SOCKET INIT
new SocketIO({
  socket: socket
});

//STREAM AND MOTION SCREENSHOT
Config.cameras.forEach(function(camera) {
  var ipcam = new IpCam({
    camera: camera,
  })
})

//START SERVER
var server = app.listen(Config.serverPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
