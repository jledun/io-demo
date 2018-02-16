'use strict';

module.exports = function(app) {
  app.use('/eventhistory', function(req, res) {
    res.sendFile('index.html', { root: `${__dirname}/../../client/` });
  });
  app.use('/alarmhistory', function(req, res) {
    res.sendFile('index.html', { root: `${__dirname}/../../client/` });
  });
  app.use('/processhistory', function(req, res) {
    res.sendFile('index.html', { root: `${__dirname}/../../client/` });
  });
};
