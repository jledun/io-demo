'use strict';

const Stately = require('stately');

module.exports = function(app, cb) {
  let speedRate = 0;
  let machineStatus = {state: "beforeStart"};
  let productionEventTime = 4 * 60 * 1000;
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
              value: 25,
              unit: '%',
            },
            current: {
              value: 25,
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
              name: "Débit",
              value: 250,
              unit: 'lb/h',
              maxValue: 400,
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
              value: 250,
              unit: 'lb/h',
            },
            custom: [
              {
                name: 'screw speed',
                value: 1458,
                unit: 'rpm',
                maxValue: 2400,
              },
              {
                name: 'weight',
                value: 165.42,
                maxValue: 245,
                unit: 'lb',
                maxValue: 165,
              },
            ],
          },
        },
        {
          name: 'Eggs',
          partnber: '6543121',
          proportion: {
            setpoint: {
              value: 25,
              unit: '%',
            },
            current: {
              value: 25,
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
              name: "Débit",
              value: 250,
              unit: 'unit/h',
              maxValue: 400,
              alarms: {
                setpoint: 4,
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
              value: 250,
              unit: 'unit/h',
            },
            custom: [
              {
                name: 'available chicken',
                value: 5410,
                maxValue: 6000,
                unit: 'unit'
              },
              {
                name: 'chicken performances',
                value: 65,
                maxValue: 120,
                unit: 'egg/h'
              },
            ],
          },
        },
        {
          name: 'Sugar cane',
          partnber: '98741',
          proportion: {
            setpoint: {
              value: 25,
              unit: '%',
            },
            current: {
              value: 25,
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
              name: "Débit",
              value: 250,
              unit: 'unit/h',
              maxValue: 640,
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
              value: 250,
              unit: 'unit/h',
            },
            custom: [
              {
                name: 'speed',
                value: 5,
                maxValue: 12,
                unit: 'rpm'
              },
            ],
          },
        },
        {
          name: 'Butter',
          partnber: '7412',
          proportion: {
            setpoint: {
              value: 25,
              unit: '%',
            },
            current: {
              value: 25,
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
              name: "Débit",
              value: 250,
              unit: 'unit/h',
              maxValue: 340,
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
              value: 250,
              unit: 'unit/h',
            },
            custom: [
              {
                name: 'spare',
                value: 84751,
                maxValue: 120000,
                unit: 'stuff'
              },
              {
                name: 'yet another spare',
                value: 2,
                maxValue: 10,
                unit: 'stuff'
              },
            ],
          },
        },
      ],
    },
  };

  const generateFlowAlarmMessage = (old, comp) => {
    let message = {
      alStartTime: Date.now(),
      alStartTimeMs: 0,
      alTag: "",
      alMessage: "",
      alAck: 0,
      alActive: 0,
      alTagValue: 1,
      alPrevTagValue: 0,
      alGroup: 1,
      alPriority: 0,
      alSelection: "",
      alType: 2,
      alAckReq: 0,
      alNormTime: null,
      alNormTimeMs: null,
      alAckTime: null,
      alAckTimeMs: null,
      alUser: "operateur",
      alUserComment: "",
      alUserFull: "Opérateur",
      alStation: "Cake Machine",
      alDeleted: 0,
      alEventTime: Date.now(),
      alEventTimeMs: 0,
      lastUpdate: Date.now(),
      lastUpdateMs: null
    }
    let recordMessage = false;
    console.log(comp.fault.low, old.fault.low, comp.fault.low && !old.fault.low);
    console.log(comp.fault.high, old.fault.high, comp.fault.high && !old.fault.high);
    console.log(comp.alarms.low, old.alarms.low, comp.alarms.low && !old.alarms.low);
    console.log(comp.alarms.high, old.alarms.high, comp.alarms.high && !old.alarms.high);
    if (comp.fault.low && !old.fault.low) {
      message.alMessage = `Défaut niveau bas débit ${comp.name}`;
      recordMessage = true;
    }
    if (comp.alarms.low && !old.alarms.low) {
      message.alMessage = `Alarme niveau bas débit ${comp.name}`;
      recordMessage = true;
    }
    if (comp.fault.high && !old.fault.high) {
      message.alMessage = `Défaut niveau haut débit ${comp.name}`;
      recordMessage = true;
    }
    if (comp.alarms.high && !old.alarms.high) {
      message.alMessage = `Alarme niveau bas débit ${comp.name}`;
      recordMessage = true;
    }
    if (!comp.fault.low && old.fault.low) {
      message.alMessage = `Défaut niveau bas débit ${comp.name}`;
      message.alNormTime = Date.now();
      recordMessage = true;
    }
    if (!comp.alarms.low && old.alarms.low) {
      message.alMessage = `Alarme niveau bas débit ${comp.name}`;
      message.alNormTime = Date.now();
      recordMessage = true;
    }
    if (!comp.fault.high && old.fault.high) {
      message.alMessage = `Défaut niveau haut débit ${comp.name}`;
      message.alNormTime = Date.now();
      recordMessage = true;
    }
    if (!comp.alarms.high && old.alarms.high) {
      message.alMessage = `Alarme niveau bas débit ${comp.name}`;
      message.alNormTime = Date.now();
      recordMessage = true;
    }
    if (recordMessage) {
      console.log(message.alMessage);
      app.models.Alarmhistory.create(message)
    }
  }
  const updateDB = () => {
    runtimeData.upsertWithWhere({id: 1}, datas, (err, d) => {
      if (err) console.log(err);
    });
  }
  const resetFlows = () => {
    datas.production.components.forEach(comp => {
      comp.value = 0;
      comp.runtime.flow.fault.low = false;
      comp.runtime.flow.alarms.low = false;
      comp.runtime.flow.fault.high = false;
      comp.runtime.flow.alarms.high = false;
      comp.runtime.custom.forEach(cust => {
        cust.value = 0;
      });
    });
    datas.production.status.mainFlow.real.value = 0;
    updateDB();
  }
  const startFlows = () => {
    datas.production.components.forEach(comp => {
      const rnd = Math.random();
      const sign = (Math.random() > 0.5) ? 1 : -1;
      comp.runtime.flow.value = comp.runtime.setpoint.value * speedRate;
      comp.runtime.custom.forEach(cust => {
        cust.value = Math.round((cust.maxValue / 2 + rnd * 5 * sign) * 100) / 100;
        if (cust.value < 0) cust.value = cust.value * -1;
      });
    });
    datas.production.status.mainFlow.real.value = datas.production.components.reduce((acc, value) => {
      return acc + value.runtime.flow.value;
    }, 0);
    updateDB();
  }
  const stopFlows = () => {
    datas.production.components.forEach(comp => {
      comp.runtime.flow.value = comp.runtime.flow.value - comp.runtime.flow.value * speedRate;
      comp.runtime.custom.forEach(cust => {
        cust.value = 0;
      });
    });
    datas.production.status.mainFlow.real.value = datas.production.components.reduce((acc, value) => {
      return acc + value.runtime.flow.value;
    }, 0);
    updateDB();
  }
  const refreshSetpoints = () => {
    datas.production.components.forEach(comp => {
      comp.runtime.setpoint.value = datas.production.status.mainFlow.setpoint.value * comp.proportion.setpoint.value / 100;
    });
    updateDB();
  }
  const refreshFlows = () => {
    refreshSetpoints();
    datas.production.components.forEach((comp) => {
      const rnd = Math.random();
      const sign = (Math.random() > 0.5) ? 1 : -1;
      comp.runtime.flow.value = Math.round((comp.runtime.setpoint.value + rnd * 5 * sign) * 100) / 100;
      const old = Object.assign({}, comp.runtime.flow);
      comp.runtime.flow.fault.low = comp.runtime.flow.value < (comp.runtime.setpoint.value - comp.runtime.flow.fault.setpoint);
      comp.runtime.flow.alarms.low = comp.runtime.flow.value < (comp.runtime.setpoint.value - comp.runtime.flow.alarms.setpoint) && !comp.runtime.flow.fault.low;
      comp.runtime.flow.fault.high = comp.runtime.flow.value > (comp.runtime.setpoint.value + comp.runtime.flow.fault.setpoint);
      comp.runtime.flow.alarms.high = comp.runtime.flow.value > (comp.runtime.setpoint.value + comp.runtime.flow.alarms.setpoint) && !comp.runtime.flow.fault.high;
      generateFlowAlarmMessage(old, Object.assign({}, comp.runtime.flow));
      comp.runtime.custom.forEach(cust => {
        cust.value = Math.round((cust.value + rnd * 5 * sign) * 100) / 100;
        if (cust.value < 0) cust.value = cust.value * -1;
      });
    });
    datas.production.status.mainFlow.real.value = datas.production.components.reduce((acc, value) => {
      return acc + value.runtime.flow.value;
    }, 0);
    updateDB();
  };
  const recordProcessLog = () => {
    app.models.logProcess.find({where: {timestamp: {lt: Date.now() - 3600 * 24 * 30}}}).then(
      data => {
        if (data.length > 0) data.forEach(toDelete => app.models.logProcess.destroyById(toDelete.id));
      }
    );
    app.models.logProcess.create({
      timestamp: Date.now(),
      flour: datas.production.components[0].runtime.flow.value,
      eggs: datas.production.components[1].runtime.flow.value,
      sugar: datas.production.components[2].runtime.flow.value,
      butter: datas.production.components[3].runtime.flow.value
    });
  }
  const stateMachine = Stately.define({
    "stopped": st => {
      if (datas.production.status.mainFlow.real.value > 0) resetFlows();
    },
    "beforeStart": st => {
      speedRate = 0;
      datas.production.status.mainFlow.setpoint.value = 1000;
      updateDB();
      app.models.Eventhistory.create({
        evType: 5,
        evTime: Date.now(),
        evTimeMs: 0,
        evInfo: '',
        evUser: 'operateur',
        evUserFull: 'Opérateur',
        evMessage: `Démarrage recette ${datas.production.name} - numéro de lot : ${datas.production.lotnr}.`,
        evValue: '',
        evPrevValue: '',
        evStation: 'Cake Machine',
        evSource: '',
        evDeleted: 0,
        lastUpdate: Date.now(),
        lastUpdateMs: 0,
        bias: 0,
        evComment: ''
      });
      st.state = "starting";
    },
    "starting": st => {
      if (speedRate < 1) {
        startFlows();
        speedRate = speedRate + 0.1;
      }else{
        app.models.Eventhistory.create({
          evType: 5,
          evTime: Date.now(),
          evTimeMs: 0,
          evInfo: '',
          evUser: 'operateur',
          evUserFull: 'Opérateur',
          evMessage: `Recette ${datas.production.name} démarrée - consigne : ${datas.production.status.mainFlow.setpoint.value} ${datas.production.status.mainFlow.setpoint.unit} - numéro de lot : ${datas.production.lotnr}.`,
          evValue: '',
          evPrevValue: '',
          evStation: 'Cake Machine',
          evSource: '',
          evDeleted: 0,
          lastUpdate: Date.now(),
          lastUpdateMs: 0,
          bias: 0,
          evComment: ''
        });
        st.state = "running";
      }
    },
    "running": st => {
      refreshFlows();
    },
    "beforeStop": st => {
      speedRate = 0;
      app.models.Eventhistory.create({
        evType: 5,
        evTime: Date.now(),
        evTimeMs: 0,
        evInfo: '',
        evUser: 'operateur',
        evUserFull: 'Opérateur',
        evMessage: `Arrêt recette ${datas.production.name} - numéro de lot : ${datas.production.lotnr}.`,
        evValue: '',
        evPrevValue: '',
        evStation: 'Cake Machine',
        evSource: '',
        evDeleted: 0,
        lastUpdate: Date.now(),
        lastUpdateMs: 0,
        bias: 0,
        evComment: ''
      });
      st.state = "stopping";
    },
    "stopping": st => {
      if (speedRate < 1) {
        stopFlows();
        speedRate = speedRate + 0.1;
      }else{
        st.state = "stopped";
        app.models.Eventhistory.create({
          evType: 5,
          evTime: Date.now(),
          evTimeMs: 0,
          evInfo: '',
          evUser: 'operateur',
          evUserFull: 'Opérateur',
          evMessage: `Recette ${datas.production.name} arrêtée.`,
          evValue: '',
          evPrevValue: '',
          evStation: 'Cake Machine',
          evSource: '',
          evDeleted: 0,
          lastUpdate: Date.now(),
          lastUpdateMs: 0,
          bias: 0,
          evComment: ''
        });
      }
    }
  });
  const getProductionEventTime = () => {
    return Math.round((1 + Math.random()) * 60 * 1000);
  }
  const productionEvents = () => {
    switch(machineStatus.state) {
      case "running":
      if (Math.random() > 0.9) {
        machineStatus.state = "beforeStop";
        productionEventTime = getProductionEventTime();
      }else{
        setpointChange();
        productionEventTime = getProductionEventTime();
      }
      break;
      case "stopped":
      machineStatus.state = "beforeStart";
      productionEventTime = getProductionEventTime();
      break;
    };
    setTimeout(() => {
      // production events
      productionEvents();
    }, productionEventTime);
  }
  const setpointChange = () => {
    const rnd = Math.random();
    const sign = (Math.random() > 0.5) ? 1 : -1;
    datas.production.status.mainFlow.setpoint.value = datas.production.status.mainFlow.setpoint.value + 500 * rnd * sign;
    if (datas.production.status.mainFlow.setpoint.value > 2000) datas.production.status.mainFlow.setpoint.value = 1000;
    if (datas.production.status.mainFlow.setpoint.value < 0) datas.production.status.mainFlow.setpoint.value = 1000;
    app.models.Eventhistory.create({
      evType: 5,
      evTime: Date.now(),
      evTimeMs: 0,
      evInfo: '',
      evUser: 'operateur',
      evUserFull: 'Opérateur',
      evMessage: `Nouvelle consigne : ${Math.round(datas.production.status.mainFlow.setpoint.value)} ${datas.production.status.mainFlow.setpoint.unit}`,
      evValue: '',
      evPrevValue: '',
      evStation: 'Cake Machine',
      evSource: '',
      evDeleted: 0,
      lastUpdate: Date.now(),
      lastUpdateMs: 0,
      bias: 0,
      evComment: ''
    });
  }

  productionEventTime = getProductionEventTime();
  const runSimulator = () => {
    setInterval(() => {
      // manage state machine
      stateMachine.handle(machineStatus);
    }, 1000);
    setInterval(() => {
      // record flows in DB
      recordProcessLog();
    }, 5000)
    setTimeout(() => {
      // production events
      productionEvents();
    }, productionEventTime);
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

};
