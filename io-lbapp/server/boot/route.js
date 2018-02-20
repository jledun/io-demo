'use strict';

module.exports = function(app) {
  const routes = [
    '/eventhistory',
    '/alarmhistory',
    '/processhistory',
    '/dashboard',
    '/fullscreendashboard',
  ];
  app.use(routes, function(req, res) {
    res.sendFile('index.html', {root: `${__dirname}/../../client/`});
  });
};