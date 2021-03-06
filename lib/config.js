var config = {
  userKey: "secureuser1",
  name: "Home Server",
  serverPort: 3000,
  homeServerIP: "http://128.199.52.208", //Socket server IP
  homeServerPort: 3000,
  cameras: [
    {
      name: "volkicam",
      ipCamIP: "http://78.182.137.181", //Local IP for camera
      ipCamPort: 8090,
      ipCamUsername: "user",
      ipCamPassword: "",
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
