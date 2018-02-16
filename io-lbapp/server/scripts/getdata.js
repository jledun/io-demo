'use strict';

const app = require('../server');
const sql = app.datasources.PREMIX;
const fs = require('fs');

sql.connector.query("SELECT * FROM `LOG_REFROIDISSEUR` where TIMESTAMP >= '2017-06-01 00:00:00' AND TIMESTAMP <= '2017-06-20 00:00:00'", (err, data) => {
  if (err) throw err;
  fs.writeFileSync('/tmp/processdatas.json', JSON.stringify(data));
});
