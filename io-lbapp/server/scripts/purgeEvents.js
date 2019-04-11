'use strict';

const app = require('../server.js');
// app.models.Eventhistory.find({where: {evUser: {neq: "operateur"}}}).then(
//   data => Promise.all(data.map(d => app.models.Eventhistory.destroyById(d.id)))
// ).then(
//   data => console.log('ok', data)
// ).catch(e => console.error(e));

app.models.Alarmhistory.find({where: {alUser: {neq: "operateur"}}}).then(
  data => Promise.all(data.map(d => app.models.Alarmhistory.destroyById(d.id)))
).then(
  data => console.log('ok', data)
).catch(e => console.error(e));