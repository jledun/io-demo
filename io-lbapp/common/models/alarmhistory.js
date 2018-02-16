'use strict';

module.exports = function(Alarmhistory) {

  // Distinct stations
  Alarmhistory.stationlist = (cb) => {
    return cb(null, ['PCSTOCKAGE', 'ELEC09']);
  };

  Alarmhistory.remoteMethod('stationlist', {
    accepts: [],
    returns: {
      arg: 'StationList',
      type: 'array',
    },
  });
};
