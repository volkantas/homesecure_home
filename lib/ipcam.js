var request = require("request");
var MjpegConsumer = require("mjpeg-consumer");
var MotionStream = require('../lib/motionstream');
var FileOnWrite = require("file-on-write");

function IpCam(options) {
  options = options || {};
  var socket = options.socket
  var camera = options.camera;
  var motionTimer = setTimeout(motionFinished, 0);
  var pushControlTimer = null
  var pushDelayTime = 120000 //2 min //2 dk boyunca hareket olmadıysa hiç devreye tekrar girebilir.
  var pushPossible = true;

  function pushDelayFinished(){
    pushPossible = true;
    console.log("Push aktif")
  }

  function motionFinished(){
    console.log("Hareket durdu");
    socket.emit('motion', false);
    //wait time
    if(pushControlTimer != null && pushPossible){
        clearTimeout(pushControlTimer);
        socket.emit('motionPush', "Home");
        pushPossible = false;
        console.log("Push pasif")
      }
    }

    pushControlTimer = setTimeout(pushDelayFinished, pushDelayTime);
  }

  var writer = new FileOnWrite({
    path: camera.savePath,
    ext: '.jpg',
    filename: function(image) {
      socket.emit('motion', true);
      clearTimeout(motionTimer);
      motionTimer = setTimeout(motionFinished, 1500);

      return image.time;
    },
    transform: function(image) {
      return image.data;
    },
    sync: true
  });

  var consumer = new MjpegConsumer();
  var motion = new MotionStream(camera.streamOptions);

  var username = camera.ipCamUsername;
  var password = camera.ipCamPassword;
  var camOptions = {
    url: camera.ipCamIP + ":" + camera.ipCamPort + "/videostream.cgi",
    headers: {
      'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
    }
  };

  request(camOptions).pipe(consumer).pipe(motion).pipe(writer);
};

module.exports = IpCam;
