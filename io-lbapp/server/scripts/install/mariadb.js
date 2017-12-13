'use strict';

let datasourcefile = 'datasources.json';
let modelconfigfile = 'model-config.json';

let ds = require( `../../${datasourcefile}` );
let fs = require('fs');

// check parameters
if ( process.argv.length < 8 ) {
  console.log('parameters error');
  process.exit(-1);
}

let params = {
  user: '',
  password: '',
  database: '',
  host: 'localhost',
  port: 3306,
  name: '',
  connector: 'mysql'
};

let i = 2;
while (i < process.argv.length ) {
  switch( process.argv[i] ) {
    case '-u':
    params.user = process.argv[++i];
    break;

    case '-P':
    params.password = process.argv[++i];
    break;

    case '-d':
    params.database = process.argv[++i];
    params.name = params.database;
    break;

    case '-h':
    params.host = process.argv[++i];
    break;

    case '-p':
    params.port = process.argv[++i];
    break;
  }
  i++;
}

if ( params.user === '' ) {
  console.log( 'you have to set a username (-u)');
  process.exit(-1);
}
if ( params.password === '' ) {
  console.log( 'you have to set a password (-P)');
  process.exit(-1);
}
if ( params.database === '' ) {
  console.log( 'you have to set a database name (-d)');
  process.exit(-1);
}

ds[ params.database ] = params;

let iowrite = ( file, data ) => {
  return new Promise( ( resolve, reject ) => {
    fs.writeFile( file, JSON.stringify( data, null, 2 ), ( err ) => {
      if ( err ) {
        console.log( `an error happened, please check ${file}`);
        return reject( err );
      }
      console.log(`${file} stored.`);
      return resolve();
    });
  });
};

let iomigrate = ( app, mc ) => {
  return new Promise( (resolve, reject) => {
    let iotest = app.datasources.iotest;
    
    for ( i = 0; i < Object.keys( mc ).length; i++ ) {
      if ( mc[ Object.keys(mc)[i] ].hasOwnProperty( 'dataSource' ) ) {
        iotest.automigrate( Object.keys(mc)[i], ( err ) => {
          if (err) {
            console.log(`Something went wrong while migrating ${Object.keys(mc)[i]}`);
            return reject();
          }
          console.log(`${Object.keys(mc)[i]} migrated successfully`);
        });
      }
    }
    setTimeout( resolve, 3000 );
  });
};

let mc = {};

iowrite( `server/${datasourcefile}`, ds )
.then( ( ) => {
  // migrate all authetication models to mysql
  mc = require( `../../${modelconfigfile}` );
  for ( i = 0; i < Object.keys(mc).length; i++ ) {
    if ( mc[ Object.keys(mc)[i] ].hasOwnProperty( 'dataSource' ) ) {
      mc[ Object.keys(mc)[i] ].dataSource = params.name;
    }
  }
  return iowrite( `server/${modelconfigfile}`, mc );
})
.then( () => {
  console.log(`switched User, Roles, RoleMapping, AccessToken, ACL to ${params.name}`);
  // migrate models to database
  let app = require( '../../server.js' );
  setTimeout( () => {
    iomigrate.call( this, app, mc )
  }, 7000);
})
.then( () => {
  console.log('success !');
})
.catch( (err) => {
  process.exit(-1);
});
