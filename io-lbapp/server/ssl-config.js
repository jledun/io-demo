'use strict';

const path = require("path");
const fs = require('fs');
exports.privateKey = fs.readFileSync(path.join(__dirname, './private/iosystems.key')).toString();
exports.certificate = fs.readFileSync(path.join(__dirname, './private/iosystems.crt')).toString();
