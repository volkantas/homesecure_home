function SocketIO(options) {
  var self = this;
  options = options || {};
  userKey = options.userKey;
  this.socket = options.socket;

  this.socket.on('connect', function(){
    self.connected();
  });

  this.socket.on('disconnect', function(){
    self.disconnected();
  });
};

SocketIO.prototype.connected = function() {
  this.socket.emit('add user_'+userKey, 'Home');
};

SocketIO.prototype.disconnected = function() {
  this.socket.emit('disconnect', 'Home');
};

module.exports = SocketIO;
