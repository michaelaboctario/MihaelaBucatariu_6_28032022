const http = require('http');
const dotenv = require('dotenv').config();
const app = require('./app');

// return a valid port from number or string
const normalizePort = (val) => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

// error handling
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }
  
    const address = server.address();
    const bind = typeof address === "string" ? "pipe" + address : "port" + port;
  
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges.");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use.");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
const port = normalizePort(process.env.Port || "3000");
app.set('port', port);

// createServer create node server app
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port" + port;
  console.log("listening on " + bind);
});

// listening for events on that port 
server.listen(port);