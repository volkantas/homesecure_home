var config = {
  serverPort: 3000,
  homeServerIP: "http://46.101.125.172", //Socket server IP
  homeServerPort: 3000,
  ipCamIP: "", //Local IP for camera
  ipCamPort: 8090,
  ipCamUsername: "",
  ipCamPassword: ""
}
var express = require('express');
var app = express();
var request = require("request");
var MjpegConsumer = require("mjpeg-consumer");
var MotionStream = require('./lib/motionstream');
var FileOnWrite = require("file-on-write");
var socket = require('socket.io-client')(config.homeServerIP + ":" + config.homeServerPort);
var SocketIO = require('./lib/socketio.js');
var Sound = require('./lib/sound.js');

snd = new Sound({
  socket:socket,
  path: "Warning-alarm-sound-effect.mp3"
});

//snd.play();

new SocketIO({
  socket: socket
});

var writer = new FileOnWrite({
  path: './video',
  ext: '.jpg',
  filename: function(image) {
    return image.time;
  },
  transform: function(image) {
    return image.data;
  },
  sync: true
});

var streamOptions = {
  minimumMotion : 2,
  prebuffer: 0.5,
  postbuffer: 0.5,
  minChange: 20
}

var consumer = new MjpegConsumer();
var motion = new MotionStream(streamOptions);

var username = config.username;
var password = config.password;
var options = {
  url: config.ipCamIP + ":" + config.ipCamPort + "/videostream.cgi",
  headers: {
    'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
  }
};

request(options).pipe(consumer).pipe(motion).pipe(writer);

var server = app.listen(config.serverPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
