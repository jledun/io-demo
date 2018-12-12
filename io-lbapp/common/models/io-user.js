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

  // ioUser.afterRemote('create', (ctx, user, next) => {
  //   // envoi email de vérification de l'identité
  //   const options = {
  //     type: 'email',
  //     to: user.email,
  //     from: senderAddress,
  //     subject: 'Merci pour votre enregistrement.',
  //     template: path.resolve(__dirname, '../../server/views/verify.ejs'),
  //     redirect: '/verified',
  //     user: user,
  //     //verifyHref: `http://${ioUser.app.get('host')}:${ioUser.app.get('port')}/${config.ui.checkIdentityPath || 'checkIdentity'}?uid=${user.id}`
  //     verifyHref: `http://192.168.1.109:4200/${config.ui.checkIdentityPath || 'checkIdentity'}?uid=${user.id}`
  //   };
  //   user.verify(options, function(err, response) {
  //     if (err) {
  //       ioUser.deleteById(user.id);
  //       return next(err);
  //     }
  //     console.log(JSON.stringify(response, null, 2));
  //     ctx.res.json({status: 200, message: `Nouvel utilisateur ${user.username} enregistré, veuillez vérifier vos emails pour confirmer votre identité.`});
  //   });
  // });

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

  // // Method to render
  // ioUser.afterRemote('prototype.verify', function(context, user, next) {
  //   context.res.json({status: 200, message: `Nouvel utilisateur ${user.username} enregistré, veuillez vérifier vos emails pour confirmer votre identité.`});
  // });

  // //send password reset link when requested
  // ioUser.on('resetPasswordRequest', function(info) {
  //   var url = 'http://' + config.host + ':' + config.port + '/reset-password';
  //   var html = 'Click <a href="' + url + '?access_token=' +
  //     info.accessToken.id + '">here</a> to reset your password';

  //   ioUser.app.models.Email.send({
  //     to: info.email,
  //     from: senderAddress,
  //     subject: 'Password reset',
  //     html: html
  //   }, function(err) {
  //     if (err) return console.log('> error sending password reset email');
  //     console.log('> sending password reset email to:', info.email);
  //   });
  // });

  // //render UI page after password change
  // ioUser.afterRemote('changePassword', function(context, user, next) {
  //   context.res.render('response', {
  //     title: 'Password changed successfully',
  //     content: 'Please login again with new password',
  //     redirectTo: '/',
  //     redirectToLinkText: 'Log in'
  //   });
  // });

  // //render UI page after password reset
  // ioUser.afterRemote('setPassword', function(context, user, next) {
  //   context.res.render('response', {
  //     title: 'Password reset success',
  //     content: 'Your password has been reset successfully',
  //     redirectTo: '/',
  //     redirectToLinkText: 'Log in'
  //   });
  // });

};
