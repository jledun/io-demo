'use strict';

module.exports = function createDefaultUserAndRoles(app, next) {
  let tmpUsers = []; let tmpRoles = []
  app.models.ioUser.create([
    {realName: "Administrateur", username: "admin", email: "admin@iosystems.fr", password: "test"},
    {realName: "Arthur H", username: "arthurH", email: "arthurH@iosystems.fr", password: "test"},
    {realName: "JosephB", username: "JosephB", email: "JosephB@iosystems.fr", password: "test"}
  ]).then(users => {
    tmpUsers = [].concat(users);
    return app.models.Role.create([
      {name: "admin", description:"Administrateur de l'application"},
      {name: "userManager", description: "Gestion des utilisateurs"}
    ]);
  }).then(roles => {
    tmpRoles = [].concat(roles);
    return Promise.all([
      roles[0].principals.create({
        principalType: "USER",
        principalId: tmpUsers[0].id
      }),
      roles[1].principals.create({
        principalType: "USER",
        principalId: tmpUsers[1].id
      })
    ]);
  }).then(data => {
    console.log('chargement des utilisateurs par défaut terminé.');
    return next();
  }).catch(
    err => {
      console.log('error', err);
      return next();
    }
  )
};
