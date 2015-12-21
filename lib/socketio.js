function SocketIO(options) {
  var self = this;
  options = options || {};
  this.socket = options.socket;

  this.socket.on('connect', function(){
    self.connected();
  });

  this.socket.on('disconnect', function(){
    console.log("disconnect")
  });
};

SocketIO.prototype.connected = function() {
  this.socket.emit('add user', 'Home geldi');
};

module.exports = SocketIO;
