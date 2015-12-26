var request = require("request");
var MjpegConsumer = require("mjpeg-consumer");
var MotionStream = require('../lib/motionstream');
var FileOnWrite = require("file-on-write");

function IpCam(options) {
  options = options || {};
  var camera = options.camera;

  var writer = new FileOnWrite({
    path: camera.savePath,
    ext: '.jpg',
    filename: function(image) {
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
