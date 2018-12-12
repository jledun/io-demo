'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const http = require('http');
const https = require('https');
const sslConfig = require('./ssl-config');

const app = module.exports = loopback();

app.use(ensureSecure);
app.use(loopback.token());

function ensureSecure(req, res, next) {
  if (req.secure) return next();
  res.redirect(`https://${req.hostname}:${app.get('httpsPort')}${req.url}`);
}
app.start = function() {
  const options = {
    key: sslConfig.privateKey,
    cert: sslConfig.certificate
  };
  const server = https.createServer(options, app);
  const httpServer = http.createServer(app).listen(app.get('port'));;

  // start the web server
  server.listen(app.get('httpsPort'), function() {
    const baseUrl = 'https://' + app.get('host') + ':' + app.get('httpsPort');
    app.emit('started', baseUrl);
    console.log('Web server listening at: %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
