'use strict';

const fs = require('fs');

module.exports = function(app, cb) {
  const files = [
    {
      input: './common/files/alarmhistory.json',
      model: 'Alarmhistory',
      id: 'alStartTime',
    },
    {
      input: './common/files/eventhistory.json',
      model: 'Eventhistory',
      id: 'bias',
    },
    {
      input: './common/files/processdatas.json',
      model: 'LogRefroidisseur',
      id: '',
    },
  ];

  const fromFile = (file) => {
    return new Promise((resolve, reject) => {
      console.log(`modèle: ${file.model} en cours...`);
      fs.readFile(file.input, {encoding: 'utf-8'}, (err, data) => {
        if (err) return reject(err);
        app.models[file.model].create(JSON.parse(data), (err, data) => {
          if (err) return reject(err);
          if (file.id) app.models[file.model].definition.rawProperties[file.id].id = true;
          console.log(`modèle: ${file.model} terminé.`);
          return resolve();
        });
      });
    });
  };

  Promise.all(files.map(file => fromFile(file)))
  .then((data) => {
    console.log('Chargement des modèles terminé.');
    process.nextTick(cb);
  })
  .catch(err => console.log(err));
};
