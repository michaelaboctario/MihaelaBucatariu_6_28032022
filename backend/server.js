const http = require('http');
const dotenv = require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 3000;
app.set('port', port);
const server = http.createServer(app);

server.listen(port);