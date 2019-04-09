'use strict';
const path = require('path');
const RED = require('node-red');
const embeddedStart = require('node-red-embedded-start');

module.exports = {
  init: (settings, httpsServer, lbApp) => {
    settings = {...settings};
    settings.userDir = path.join(__dirname, settings.userDir);
    settings.nodesDir = path.join(__dirname, settings.nodesDir);
    settings.functionGlobalContext = {
      loopbackApp: lbApp
    };
    settings.adminAuth = (settings.adminAuthPath) ?
      require(path.join(__dirname, settings.adminAuthPath))(lbApp) :
      (settings.adminAuth) ? settings.adminAuth :
      {};

    // node red app
    RED.init(httpsServer, settings);
    lbApp.use(settings.httpAdminRoot, RED.httpAdmin);
    lbApp.use(settings.httpNodeRoot, RED.httpNode);
  },
  startEmbedded: () => {
    RED.start().then(
      embeddedStart(RED)
    ).then(
      res => {
        RED.nodes.disableNode('node-red/rpi-gpio');
      }
    );
  },
  start: () => RED.start()
}
