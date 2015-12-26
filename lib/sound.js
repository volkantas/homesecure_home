//var Howler = require('howler');
var Player = require('player');

function Sound(options) {
  options = options || {};
  path = options.path;
  socket = options.socket

  // create player instance
  var player = new Player(['./sounds/'+options.path]);
  // play now and callback when playend
  player.play(function(err, player){
    console.log('playend!');
  });

  player.on('playing',function(item){
    console.log('im playing... src:' + item);
  });

  // play now and callback when playend
  player.on('playend',function(item){
    // return a playend item
    console.log('src:' + item + ' play done, switching to next one ...');
  });

  player.on('error', function(err){
    // when error occurs
    console.log(err);
  });

  /*this.sound = new Howler.Howl({
    src: ['./sounds/bell_ring.mp3'],
    autoplay: true,
    onend: function() {
      socket.emit('soundEnd', {
        'id': data.message.id,
        'path': data.message.path
      });
    }
  }); */
};

Sound.prototype.play = function(frames, done) {
  this.sound.play();
};

Sound.prototype.stop = function(frames, done) {
  this.sound.stop();
};

module.exports = Sound;
