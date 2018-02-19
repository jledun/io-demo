'use strict';

module.exports = function(app, cb) {
  let datas = {
    production: {
      name: "Julien's Specials",
      lotnr: 'yogourt cake',
      status: {
        production: 'in operation',
        fabrication: 'in operation',
        mainFlow: {
          setpoint: {
            value: 1000,
            unit: 'lb/h',
          },
          real: {
            value: 1000,
            unit: 'lb/h',
          },
        },
      },
      components: [
        {
          name: 'Flour',
          partnber: '123456',
          proportion: {
            setpoint: {
              value: '25',
              unit: '%',
            },
            current: {
              value: '25',
              unit: '%',
            },
          },
          lots: [
            {
              lotnr: '456789',
              order: 1,
              erpStock: {
                value: 453.54,
                unit: 'lb',
              },
              realStock: {
                value: 452.54,
                unit: 'lb',
              },
            },
            {
              lotnr: '321654',
              order: 2,
              erpStock: {
                value: 43.52,
                unit: 'lb',
              },
              realStock: {
                value: 4.54,
                unit: 'lb',
              },
            },
          ],
          runtime: {
            flow: {
              value: '250',
              unit: 'lb/h',
              alarms: {
                setpoint: 5,
                low: false,
                high: false,
              },
              fault: {
                setpoint: 10,
                low: false,
                high: false,
              },
            },
            setpoint: {
              value: '250',
              unit: 'lb/h',
            },
            custom: [
              {
                name: 'screw speed',
                value: 1458,
                unit: 'rpm',
              },
              {
                name: 'weight',
                value: 165.42,
                unit: 'lb',
              },
            ],
          },
        },
        {
          name: 'Eggs',
          partnber: '6543121',
          proportion: {
            setpoint: {
              value: '25',
              unit: '%',
            },
            current: {
              value: '25',
              unit: '%',
            },
          },
          lots: [
            {
              lotnr: '9681',
              order: 1,
              erpStock: {
                value: 8475.21,
                unit: 'unit',
              },
              realStock: {
                value: 8472.96,
                unit: 'unit',
              },
            },
            {
              lotnr: '999925',
              order: 2,
              erpStock: {
                value: 43.52,
                unit: 'unit',
              },
              realStock: {
                value: 4.54,
                unit: 'unit',
              },
            },
          ],
          runtime: {
            flow: {
              value: '250',
              unit: 'unit/h',
              alarms: {
                setpoint: 5,
                low: false,
                high: false,
              },
              fault: {
                setpoint: 10,
                low: false,
                high: false,
              },
            },
            setpoint: {
              value: '250',
              unit: 'unit/h',
            },
            custom: [
              {
                name: 'available chicken',
                value: 5410,
                unit: 'unit',
              },
              {
                name: 'chicken performances',
                value: 65,
                unit: 'egg/h',
              },
            ],
          },
        },
        {
          name: 'Sugar cane',
          partnber: '98741',
          proportion: {
            setpoint: {
              value: '25',
              unit: '%',
            },
            current: {
              value: '25',
              unit: '%',
            },
          },
          lots: [
            {
              lotnr: '9684513',
              order: 1,
              erpStock: {
                value: 0.21,
                unit: 'lb',
              },
              realStock: {
                value: 125.3,
                unit: 'lb',
              },
            },
          ],
          runtime: {
            flow: {
              value: '250',
              unit: 'unit/h',
              alarms: {
                setpoint: 5,
                low: false,
                high: false,
              },
              fault: {
                setpoint: 10,
                low: false,
                high: false,
              },
            },
            setpoint: {
              value: '250',
              unit: 'unit/h',
            },
            custom: [
              {
                name: 'speed',
                value: 5,
                unit: 'rpm',
              },
            ],
          },
        },
        {
          name: 'Butter',
          partnber: '7412',
          proportion: {
            setpoint: {
              value: '25',
              unit: '%',
            },
            current: {
              value: '25',
              unit: '%',
            },
          },
          lots: [
            {
              lotnr: '7456',
              order: 1,
              erpStock: {
                value: 7.01,
                unit: 'lb',
              },
              realStock: {
                value: 6.98,
                unit: 'lb',
              },
            },
            {
              lotnr: '7457',
              order: 2,
              erpStock: {
                value: 10.21,
                unit: 'lb',
              },
              realStock: {
                value: 10.21,
                unit: 'lb',
              },
            },
            {
              lotnr: '7458',
              order: 3,
              erpStock: {
                value: 10.21,
                unit: 'lb',
              },
              realStock: {
                value: 10.21,
                unit: 'lb',
              },
            },
            {
              lotnr: '7459',
              order: 4,
              erpStock: {
                value: 10.21,
                unit: 'lb',
              },
              realStock: {
                value: 10.21,
                unit: 'lb',
              },
            },
          ],
          runtime: {
            flow: {
              value: '250',
              unit: 'unit/h',
              alarms: {
                setpoint: 5,
                low: false,
                high: false,
              },
              fault: {
                setpoint: 10,
                low: false,
                high: false,
              },
            },
            setpoint: {
              value: '250',
              unit: 'unit/h',
            },
            custom: [
              {
                name: 'spare',
                value: 84751,
                unit: 'stuff',
              },
              {
                name: 'yet another spare',
                value: 2,
                unit: 'stuff',
              },
            ],
          },
        },
      ],
    },
  };

  const ds = app.datasources.db;
  const runtimeData = ds.createModel('runtimeData', {});
  if (ds.connected) {
    app.model(runtimeData);
    app.models.runtimeData.create(datas, (err, result) => {
      runSimulator();
      return cb(err);
    });
  } else {
    ds.once('connected', function() {
      app.model(runtimeData);
      app.models.runtimeData.create(datas, (err, result) => {
        runSimulator();
        return cb(err);
      });
    });
  }

  const faults = () => {
    datas.production.components.forEach((comp) => {
      comp.runtime.flow.alarms.low = !comp.runtime.flow.alarms.low;
    });
    runtimeData.upsertWithWhere({id: 1}, datas, (err, d) => {
      if (err) console.log(err);
    });
  };

  const runSimulator = () => {
    setInterval(() => {
      faults.call(this);
    }, 2000);
  };
};
