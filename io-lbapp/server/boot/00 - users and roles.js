'use strict';

module.exports = function createDefaultUserAndRoles(app, next) {
  let tmpUsers = [];
  app.models.ioUser.create([
    {realm: "Administrateur", username: "admin", email: "admin@iosystems.fr", password: "vivelecanardgras"}
  ]).then(users => {
    tmpUsers = [].concat(users);
    return app.models.Role.create([
      {name: "admin"},
      {name: "production"},
      {name: "qualite"},
      {name: "operateur"}
    ]);
  }).then(roles => {
    return roles[0].principals.create({
      principalType: app.models.RoleMapping.USER,
      principalId: tmpUsers[0].id
    });
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
