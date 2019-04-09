'use strict';

const config = require('../config.json');

module.exports = function(options) {
  const opt = {
    httpPort: (options && options.httpPort) ? options.httpPort :
      (config.httpPort) ? config.httpPort :
      80,
    httpsPort: (options && options.httpsPort) ? options.httpsPort :
      (config.httpsPort) ? config.httpsPort :
      443,
  }
  return function httpsRedirection(req, res, next) {
    if (req.protocol === 'https') return next();
    const port = req.headers.host.split(':')[1];
    switch (Number(port)) {
      case opt.httpPort:
        res.redirect(`https://${req.hostname}:${opt.httpsPort}${req.originalUrl}`);
        break;

      case undefined:
      default:
        res.redirect(`https://${req.hostname}${req.originalUrl}`);
        break;
    }
  }
}
