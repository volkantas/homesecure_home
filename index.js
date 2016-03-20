//CONFIG
var Config = require('./lib/config.js');
//INCLUDE MODULES
var express = require('express');
var app = express();
var socket = require('socket.io-client')(Config.homeServerIP + ":" + Config.homeServerPort);
var SocketIO = require('./lib/socketio.js');
var IpCam = require('./lib/ipcam.js');
var Sound = require('./lib/sound.js');

//SOCKET INIT
new SocketIO({
  socket: socket,
  userKey: Config.userKey
});

//SOUND INIT
var sounds = [];
socket.on('sound', function(data){
  var snd = new Sound({
    socket: socket,
    path: data.message.path, //"Warning-alarm-sound-effect.mp3"
    id: data.message.id,
    userKey: Config.userKey
  });
  sounds.push({id: data.message.id, sound: snd});
});

socket.on('soundStop_'+Config.userKey, function(data){
  for(var i=0; i<=sounds.length-1; i++){
    if(sounds[i].id == data.message.id){
      sounds[i].sound.stop();
      sounds.splice(i, 1);
    }
  }
});

//STREAM AND MOTION SCREENSHOT
var ipcams= [];
function initCams(){
  Config.cameras.forEach(function(camera) {
    var ipcam = new IpCam({
      socket: socket,
      camera: camera,
      userKey: Config.userKey
    });
    ipcams.push(ipcam);
  })
}
initCams();

//Power OFF
socket.on('power', function(data){
  if(data.message==true){
    //init cam
    initCams();
  }else{
    //remove cams
    for(var i=0; i<=ipcams.length-1; i++){
      delete ipcams[i];
      ipcams[i] = undefined;
      ipcams=[];
    }
  }
});

//START SERVER
var server = app.listen(Config.serverPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
