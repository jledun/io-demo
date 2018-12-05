'use strict';

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
    hash.write(ctx.instance.realm + ctx.instance.email + Date.now().toString() + ctx.instance.username);
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
      if (userDetails.active) return next();
      next({
        name: "Utilisateur désactivé",
        status: 403,
        message: `L'utilisateur ${userDetails.realm || userDetails.username} <${userDetails.email}> a été désactivé.`,
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
      lastConnection: instance.created
    }).then(data => {
      next();
    }).catch(err => {
      next(err);
    });
  });

};
