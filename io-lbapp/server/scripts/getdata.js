'use strict';

const app = require('../server');
const sql = app.datasources.PREMIX;
const fs = require('fs');

sql.connector.query("SELECT * FROM `EVENTHISTORY` where Ev_Time >= '2018-01-01 00:00:00';", (err, data) => {
  if (err) throw err;
  fs.writeFileSync('/tmp/eventhistory.json', JSON.stringify(data));
});
