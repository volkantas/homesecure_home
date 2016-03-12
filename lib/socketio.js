function SocketIO(options) {
  var self = this;
  options = options || {};
  this.socket = options.socket;

  this.socket.on('connect', function(){
    self.connected();
  });

  this.socket.on('disconnect', function(){
    self.disconnected();
  });
};

SocketIO.prototype.connected = function() {
  this.socket.emit('add user', 'Home');
};

SocketIO.prototype.disconnected = function() {
  this.socket.emit('disconnect', 'Home');
};

module.exports = SocketIO;
