'use strict';

console.log(__dirname);
const app = require('../server.js');
const redisDB = app.datasources.redisDB;
const fillModel = require('./fillModels.js');
const dontMigrate = ['IoUser', 'ioUser', 'User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];

redisDB.automigrate('logProcess', (err, result) => {
  if (err) console.error(err);
  console.log('ok', result);
  process.exit();
});
// const modelsToMigrate = Object.keys(app.models)
// .filter(key => app.models[key].hasOwnProperty('getSourceId'))
// .filter(key => !dontMigrate.includes(key));
// 
// redisDB.automigrate(modelsToMigrate, (err, result) => {
  // if (err) console.error(err);
  // console.log('ok: remplissage des modèles redis');
  // fillModel(app, (err, result) => {
    // if (err) console.error(err);
    // console.log('ok:', result);
    // process.exit();
  // });
// });
