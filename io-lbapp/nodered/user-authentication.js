'use strict';

// custom implementation of nodeRED authentication with loopback user management
module.exports = (lbApp) => {
  return {
    type: "credentials",
    users: (username) => {
      return new Promise(async resolve => {
        try{
          const ioUser = await lbApp.models.ioUser.findOne({where: {username: username}});
          if (!ioUser) return resolve(null);
          return resolve({username: ioUser.username, permissions: ioUser.nodeRedAdmin});
        }catch(e){
          console.log("nodeRED user auth: users error:", e);
          return resolve(null);
        }
      });
    },
    authenticate: (username, password) => {
      return new Promise(async resolve => {
        try{
          const ioUser = await lbApp.models.ioUser.findOne({where: {username: username}});
          if (!ioUser) return resolve(null);
          const token = await lbApp.models.ioUser.login({username, password});
          console.log('success', token.id);
          return resolve({username: ioUser.username, permissions: ioUser.nodeRedAdmin});
        }catch(e){
          console.log("nodeRED user auth: authenticate error:", e);
          return resolve(null);
        }
      });
    },
    default: () => {
      return new Promise(resolve => {
        return resolve({anonymous: true, permissions: "read"});
      });
    },
  }
}

