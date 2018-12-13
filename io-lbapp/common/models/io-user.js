'use strict';


const config = require('../../server/config.json');
const path = require('path');
const senderAddress = "support@iosystems.fr";

module.exports = function(ioUser) {

  ioUser.observe('before save', (ctx, next) => {
    if (!ctx.isNewInstance) {
      if (ctx.hasOwnProperty('currentInstance') && ctx.currentInstance.username === 'admin') {
        if (ctx.hasOwnProperty('data') && ctx.data.hasOwnProperty('active')) {
          if (!ctx.data.active) return next({
            name: "Désactivation administrateur",
            status: 403,
            message: `Il n'est pas possible de désactiver l'utilisateur "Administrateur".`,
            code: "ACTIVITY",
            details: `L'utilisateur "Administrateur" ne peut pas être désactivé.`
          });
        }
      }
      return next();
    }
    // create uuid
    const hash = require('crypto').createHash('sha1');
    hash.write(ctx.instance.email + Date.now().toString() + ctx.instance.username);
    hash.end();
    ctx.instance.uuid = hash.read().toString('hex');
    next();
  });

  ioUser.beforeRemote('login', (ctx, instance, next) => {
    const cred = {
      ...ctx.req.body
    }
    const where = (cred.username) ? {username: cred.username} : 
      (cred.email) ? {email: cred.email} : 
      {};
    if (where === {}) return next();
    ioUser.findOne(
      {where: where}
    ).then(userDetails => {
      if (!userDetails || userDetails.active) return next();
      next({
        name: "Utilisateur désactivé",
        status: 403,
        message: `L'utilisateur ${userDetails.realName || userDetails.username} <${userDetails.email}> a été désactivé.`,
        code: "ACTIVITY",
        details: "L'utilisateur doit être déclaré actif pour pouvoir se connecter." 
      });
    }).catch(err => {
      next(err);
    });
  });

  ioUser.afterRemote('login', (ctx, instance, next) => {
    ioUser.upsert({
      id: instance.userId,
      lastConnection: Date.now()
    }).then(data => {
      next();
    }).catch(err => {
      next(err);
    });
  });

  ioUser.userExists = (username = null, email = null) => {
    return new Promise((resolve, reject) => {
      if (!username && !email) return reject({
        name: "Erreur de paramétrage",
        status: 400,
        message: "Vous devez renseigner un nom d'utilisateur ou une adresse email."
      });
      let where = {};
      if (username && !email) where = {username: username};
      if (!username && email) where = {email: email};
      if (username && email) where = {or: [{username: username}, {email: email}]};
      ioUser.find({where: where})
        .then(data => resolve(data.length > 0))
        .catch(err => reject(err));
    });
  }

  ioUser.remoteMethod('userExists', {
    accepts: [
      {arg: "username", required: false, type: "string"},
      {arg: "email", required: false, type: "string"}
    ], 
    returns: {arg: 'userExists', type: "boolean"}
  });

  ioUser.afterRemoteError('findById', (ctx, next) => {
    ctx.res.json(ctx.error);
  });

};
