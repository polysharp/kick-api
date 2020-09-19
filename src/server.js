const http = require('http');

const CONFIG = require('./config');
const app = require('./app');
const { db } = require('./middlewares');

db.connect();

http
  .createServer(app)
  .on('error', err => {
    console.error({ err }, 'The HTTP server threw an error. Exiting.');
    process.exit(1);
  })
  .listen(CONFIG.PORT, CONFIG.HOST, () =>
    console.log(`Server running at http://${CONFIG.HOST}:${CONFIG.PORT}`)
  );
