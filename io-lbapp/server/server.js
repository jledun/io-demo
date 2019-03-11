'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const http = require('http');
const https = require('https');
const sslConfig = require('./ssl-config');

const app = module.exports = loopback();

app.all('*', (req, res, next) => {
  if (req.protocol === 'https') return next();
  const port = req.headers.host.split(':')[1];
  switch (port) {
    case app.get('httpPort'):
      res.redirect(`https://${req.hostname}:${app.get('httpsPort')}${req.url}`);
      break;

    case undefined:
    default:
      res.redirect(`https://${req.hostname}:${app.get('httpsPort')}${req.url}`);
      break;
  }
});
app.use(loopback.token());

app.start = function() {
  const options = {
    key: sslConfig.privateKey,
    cert: sslConfig.certificate
  };
  const httpsServer = https.createServer(options, app);
  const httpServer = http.createServer(app).listen(app.get('httpPort'));

  // start the web server
  httpsServer.listen(app.get('httpsPort'), function() {
    const baseUrl = 'https://' + app.get('host') + ':' + app.get('httpsPort');
    app.emit('started', baseUrl);
    console.log('Web server listening at: %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return httpsServer;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
