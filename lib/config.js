var config = {
  name: "Home Server",
  serverPort: 3000,
  homeServerIP: "http://46.101.125.172", //Socket server IP
  homeServerPort: 3000,
  cameras: [
    {
      name: "volkicam",
      ipCamIP: "http://78.182.133.102", //Local IP for camera
      ipCamPort: 8090,
      ipCamUsername: "user",
      ipCamPassword: "volkamin",
      savePath: "./volkicam",
      streamOptions: {
        minimumMotion : 2,
        prebuffer: 0.5,
        postbuffer: 0.5,
        minChange: 20
      }
    }
  ],
}

module.exports = config;