'use strict';

const files = [
  {
    input: '/tmp/alarmhistory_sql.json',
    output: './common/files/alarmhistory.json',
    model: 'alarmhistory.json'
  },
  {
    input: '/tmp/eventhistory_sql.json',
    output: './common/files/eventhistory.json',
    model: 'eventhistory.json'
  },
  {
    input: '/tmp/processdatas_sql.json',
    output: './common/files/processdatas.json',
    model: 'log-refroidisseur.json'
  },
]

const doit = ( files ) => {
  console.log(`processing ${files.input}`);
  const jsonfile = require(files.input);
  const model = require(`../../common/models/${files.model}`).properties;
  const substitutes = Object.keys( model ).reduce( ( prop, value ) => {
    prop.push( { sqlName: model[value].mysql.columnName, jsonname: value } );
    return prop;
  }, []);
  const result = jsonfile[2].data.map( ( data ) => {
    let tmp = {};
    Object.keys( data ).forEach( ( key ) => {
      tmp[ substitutes.find( k => k.sqlName === key ).jsonname ] = data[ key ];
    });
    return tmp;
  });
  const fs = require('fs');
  fs.writeFileSync(files.output, JSON.stringify( result ) );
  console.log(`writen ${files.output}`);
}

// files.forEach( file => doit(file) );
doit( files[2] );