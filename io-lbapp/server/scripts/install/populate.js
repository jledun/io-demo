'use strict';

let modelsToPopulate = [
  {
    modelName: 'UomCateg',
    filename: 'uom-categ'
  },
  {
    modelName: 'EventType',
    filename: 'event-type'
  },
  {
    modelName: 'Uom',
    filename: 'uom'
  }
]

let populate = ( app, name, data ) => {
  // create base datas for units
  let model = app.models[ name ];
  model.create( data, ( err ) => {
    if ( err ) {
      console.log( `Something went wrong while working on ${name} datas` );
      console.log( err );
      process.exit(-1);
    }
  });
};

let app = require('../../server');
modelsToPopulate.forEach( ( toPopulate ) => {
  populate( app, toPopulate.modelName, require( `./${toPopulate.filename}.json` ));
});