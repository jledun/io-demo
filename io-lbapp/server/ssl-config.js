'use strict';

const path = require("path");
const fs = require('fs');
// exports.privateKey = fs.readFileSync(path.join(__dirname, './private/0000_key-certbot.pem')).toString();
// exports.certificate = fs.readFileSync(path.join(__dirname, './private/0000_csr-certbot.pem')).toString();
exports.privateKey = fs.readFileSync(path.join(__dirname, './private/iosystems.key')).toString();
exports.certificate = fs.readFileSync(path.join(__dirname, './private/iosystems.crt')).toString();
