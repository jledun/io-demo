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
                setpoint: 2,
                low: false,
                high: false,
              },
              fault: {
                setpoint: 4,
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
                scale: 1500,
              },
              {
                name: 'weight',
                value: 165.42,
                unit: 'lb',
                scale: 165,
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
                setpoint: 2,
                low: false,
                high: false,
              },
              fault: {
                setpoint: 4,
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
                scale: 4022,
              },
              {
                name: 'chicken performances',
                value: 65,
                unit: 'egg/h',
                scale: 65,
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
                setpoint: 2,
                low: false,
                high: false,
              },
              fault: {
                setpoint: 4,
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
                scale: 5,
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
                setpoint: 2,
                low: false,
                high: false,
              },
              fault: {
                setpoint: 4,
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
                scale: 76435,
              },
              {
                name: 'yet another spare',
                value: 2,
                unit: 'stuff',
                scale: 2,
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
      const rnd = Math.random();
      // comp.runtime.flow.alarms.low = rnd > 0.2 && rnd <= 0.4;
      // comp.runtime.flow.alarms.high = rnd > 0.4 && rnd <= 0.6;
      // comp.runtime.flow.fault.low = rnd > 0.6 && rnd <= 0.8;
      // comp.runtime.flow.fault.high = rnd > 0.8 && rnd <= 1;
      if (datas.production.status.fabrication === 'in operation') {
        const sign = (Math.random > 0.5) ? 1 : -1;
        comp.runtime.flow.value = Math.round((250 + rnd * 5 * sign) * 100) / 100;
        comp.runtime.flow.fault.low = comp.runtime.flow.value < 246;
        comp.runtime.flow.alarms.low = comp.runtime.flow.value < 248 && !comp.runtime.flow.fault.low;
        comp.runtime.flow.fault.high = comp.runtime.flow.value > 254;
        comp.runtime.flow.alarms.high = comp.runtime.flow.value > 252 && !comp.runtime.flow.fault.high;
        comp.runtime.custom.forEach((cust) => {
          cust.value = Math.round((cust.scale + rnd * 5 * sign) * 100) / 100;
        });
      } else {
        comp.runtime.flow.value = 0;
      }
    });
    datas.production.status.mainFlow.real.value = datas.production.components.reduce((acc, value) => {
      return acc + value.runtime.flow.value;
    }, 0);
    runtimeData.upsertWithWhere({id: 1}, datas, (err, d) => {
      if (err) console.log(err);
    });
  };

  const runSimulator = () => {
    setInterval(() => {
      faults.call(this);
    }, 200);
  };
};
