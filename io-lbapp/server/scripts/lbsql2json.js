'use strict';

let app = require('../server');
let sql = app.datasources.PREMIX;
let storage = app.datasources.local;

const models = [
  { source: 'Alarmhistory', destination: 'AlarmhistoryStorage', sourceLength: 0, destinationLength: 0 },
  { source: 'Eventhistory', destination: 'EventhistoryStorage', sourceLength: 0, destinationLength: 0 },
  { source: 'LogRefroidisseur', destination: 'LogRefroidisseurStorage', sourceLength: 0, destinationLength: 0 },
];

const myPromisify = ( model, fct, params = {} ) => {
  return new Promise( ( resolve, reject ) => {
    model[fct]( params, ( err, data ) => {
      if ( err ) return reject( err );
      return resolve( data );
    });
  });
}

const doit = ( model ) => {
  let sourceModel = app.models[model.source];
  let destinationModel = app.models[model.destination];
  model.sourceLength = 0;
  myPromisify( sourceModel, 'count' ).then( ( data ) => {
    model.sourceLength = data;
    let filter = {};
    switch( model.source ) {
      case 'LogRefroidisseur':
      filter = {
        where: {timestamp: {'gt': new Date('2017-03-01')}}
      }
      break;
    }
    return myPromisify( sourceModel, 'find', filter );
  }).then( (data) => {
    return myPromisify( destinationModel, 'create', data );
  }).then( ( data ) => {
    return check(model);
  }).then( ( data ) => {
    console.log( data );
  }).catch( err => console.log( err ) );
};

const check = ( model ) => {
  return new Promise( (resolve, reject) => {
    let sourceModel = app.models[model.source];
    let destinationModel = app.models[model.destination];
    myPromisify( sourceModel, 'count' ).then( ( data ) => {
      model.sourceLength = data;
      return myPromisify( destinationModel, 'count' );
    }).then( ( data ) => {
      model.destinationLength = data;
      return resolve( model );
    }).catch( err => reject(err) );
  });
}

doit( models[0] );
