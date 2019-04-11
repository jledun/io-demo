'use strict';

const Stately = require('stately');

module.exports = function(app, cb) {
  let speedRate = 0;
  let machineStatus = {state: "beforeStart"};
  let productionEventTime = 4 * 60 * 1000;
  const alarmLevel = 4;
  const faultLevel = 4.5;
  const unitWeight = "kg";
  const unitFlow = "kg/h";
  let machineData = {
    production: {
      name: "Spécialité locale",
      lotnr: 'Gâteau au yahourt',
      status: {
        production: 'in operation',
        fabrication: 'in operation',
        mainFlow: {
          setpoint: {
            value: 1000,
            unit: unitFlow,
          },
          real: {
            value: 1000,
            unit: unitFlow,
          },
        },
      },
      components: [
        {
          name: 'Farine',
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
                unit: unitWeight,
              },
              realStock: {
                value: 452.54,
                unit: unitWeight,
              },
            },
            {
              lotnr: '321654',
              order: 2,
              erpStock: {
                value: 43.52,
                unit: unitWeight,
              },
              realStock: {
                value: 4.54,
                unit: unitWeight,
              },
            },
          ],
          runtime: {
            flow: {
              name: "Débit",
              value: 250,
              unit: unitFlow,
              maxValue: 400,
              alarms: {
                setpoint: alarmLevel,
                low: false,
                high: false,
              },
              fault: {
                setpoint: faultLevel,
                low: false,
                high: false,
              },
            },
            setpoint: {
              value: 250,
              unit: unitFlow,
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
                unit: unitWeight,
                maxValue: 165,
              },
            ],
          },
        },
        {
          name: 'Oeufs',
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
              unit: unitFlow,
              maxValue: 400,
              alarms: {
                setpoint: alarmLevel,
                low: false,
                high: false,
              },
              fault: {
                setpoint: faultLevel,
                low: false,
                high: false,
              },
            },
            setpoint: {
              value: 250,
              unit: unitFlow,
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
          name: 'Sucre',
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
                unit: unitWeight,
              },
              realStock: {
                value: 125.3,
                unit: unitWeight,
              },
            },
          ],
          runtime: {
            flow: {
              name: "Débit",
              value: 250,
              unit: unitFlow,
              maxValue: 640,
              alarms: {
                setpoint: alarmLevel,
                low: false,
                high: false,
              },
              fault: {
                setpoint: faultLevel,
                low: false,
                high: false,
              },
            },
            setpoint: {
              value: 250,
              unit: unitFlow,
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
          name: 'Beurre',
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
                unit: unitWeight,
              },
              realStock: {
                value: 6.98,
                unit: unitWeight,
              },
            },
            {
              lotnr: '7457',
              order: 2,
              erpStock: {
                value: 10.21,
                unit: unitWeight,
              },
              realStock: {
                value: 10.21,
                unit: unitWeight,
              },
            },
            {
              lotnr: '7458',
              order: 3,
              erpStock: {
                value: 10.21,
                unit: unitWeight,
              },
              realStock: {
                value: 10.21,
                unit: unitWeight,
              },
            },
            {
              lotnr: '7459',
              order: 4,
              erpStock: {
                value: 10.21,
                unit: unitWeight,
              },
              realStock: {
                value: 10.21,
                unit: unitWeight,
              },
            },
          ],
          runtime: {
            flow: {
              name: "Débit",
              value: 250,
              unit: unitFlow,
              maxValue: 340,
              alarms: {
                setpoint: alarmLevel,
                low: false,
                high: false,
              },
              fault: {
                setpoint: faultLevel,
                low: false,
                high: false,
              },
            },
            setpoint: {
              value: 250,
              unit: unitFlow,
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
  let oldMachineData = {production: JSON.parse(JSON.stringify(machineData.production))};

  const generateFlowAlarmMessage = () => {
    const messageTemplate = {
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
    let recordMessage = [];
    machineData.production.components.forEach(comp => {
      const old = oldMachineData.production.components.find(c => c.name === comp.name);
      if (comp.runtime.flow.fault.low && !old.runtime.flow.fault.low) {
        recordMessage.push(Object.assign({}, messageTemplate, {alMessage: `Défaut niveau bas débit ${comp.name}`}));
      }
      if (comp.runtime.flow.alarms.low && !old.runtime.flow.alarms.low) {
        recordMessage.push(Object.assign({}, messageTemplate, {alMessage: `Alarme niveau bas débit ${comp.name}`}));
      }
      if (comp.runtime.flow.fault.high && !old.runtime.flow.fault.high) {
        recordMessage.push(Object.assign({}, messageTemplate, {alMessage: `Défaut niveau haut débit ${comp.name}`}));
      }
      if (comp.runtime.flow.alarms.high && !old.runtime.flow.alarms.high) {
        recordMessage.push(Object.assign({}, messageTemplate, {alMessage: `Alarme niveau haut débit ${comp.name}`}));
      }
      if (!comp.runtime.flow.fault.low && old.runtime.flow.fault.low) {
        recordMessage.push(Object.assign({}, messageTemplate, {
          alMessage: `Défaut niveau bas débit ${comp.name}`,
          alNormTime: Date.now()
        }));
      }
      if (!comp.runtime.flow.alarms.low && old.runtime.flow.alarms.low) {
        recordMessage.push(Object.assign({}, messageTemplate, {
          alMessage: `Alarme niveau bas débit ${comp.name}`,
          alNormTime: Date.now()
        }));
      }
      if (!comp.runtime.flow.fault.high && old.runtime.flow.fault.high) {
        recordMessage.push(Object.assign({}, messageTemplate, {
          alMessage: `Défaut niveau haut débit ${comp.name}`,
          alNormTime: Date.now()
        }));
      }
      if (!comp.runtime.flow.alarms.high && old.runtime.flow.alarms.high) {
        recordMessage.push(Object.assign({}, messageTemplate, {
          alMessage: `Alarme niveau haut débit ${comp.name}`,
          alNormTime: Date.now()
        }));
      }
    });
    if (recordMessage.length > 0) {
      app.models.Alarmhistory.create(recordMessage)
    }
  }
  const updateDB = () => {
    return runtimeData.upsertWithWhere({id: 1}, machineData);
  }
  const resetFlows = () => {
    machineData.production.components.forEach(comp => {
      comp.value = 0;
      comp.runtime.flow.fault.low = false;
      comp.runtime.flow.alarms.low = false;
      comp.runtime.flow.fault.high = false;
      comp.runtime.flow.alarms.high = false;
      comp.runtime.custom.forEach(cust => {
        cust.value = 0;
      });
    });
    machineData.production.status.mainFlow.real.value = 0;
    updateDB();
  }
  const startFlows = () => {
    machineData.production.components.forEach(comp => {
      const rnd = Math.random();
      const sign = (Math.random() > 0.5) ? 1 : -1;
      comp.runtime.flow.value = Math.round(comp.runtime.setpoint.value * speedRate * 100) / 100;
      comp.runtime.custom.forEach(cust => {
        cust.value = Math.round((cust.maxValue / 2 + rnd * 5 * sign) * 100) / 100;
        if (cust.value < 0) cust.value = cust.value * -1;
      });
    });
    machineData.production.status.mainFlow.real.value = machineData.production.components.reduce((acc, value) => {
      return acc + value.runtime.flow.value;
    }, 0);
    updateDB();
  }
  const stopFlows = () => {
    machineData.production.components.forEach(comp => {
      comp.runtime.flow.value = comp.runtime.flow.value - comp.runtime.flow.value * speedRate;
      comp.runtime.custom.forEach(cust => {
        cust.value = 0;
      });
    });
    machineData.production.status.mainFlow.real.value = machineData.production.components.reduce((acc, value) => {
      return acc + value.runtime.flow.value;
    }, 0);
    updateDB();
  }
  const refreshSetpoints = () => {
    machineData.production.components.forEach(comp => {
      comp.runtime.setpoint.value = Math.round(machineData.production.status.mainFlow.setpoint.value * comp.proportion.setpoint.value) / 100;
    });
  }
  const refreshFlows = () => {
    refreshSetpoints();
    machineData.production.status.mainFlow.real.value = 0;
    machineData.production.components.forEach((comp) => {
      const rnd = Math.random();
      const sign = (Math.random() > 0.5) ? 1 : -1;
      // flow
      comp.runtime.flow.value = Math.round((comp.runtime.setpoint.value + rnd * 5 * sign) * 100) / 100;
      // main machine flow
      machineData.production.status.mainFlow.real.value = machineData.production.status.mainFlow.real.value + comp.runtime.flow.value;
      // faulst & alarms
      comp.runtime.flow.fault.low = comp.runtime.flow.value < (comp.runtime.setpoint.value - comp.runtime.flow.fault.setpoint);
      comp.runtime.flow.alarms.low = comp.runtime.flow.value < (comp.runtime.setpoint.value - comp.runtime.flow.alarms.setpoint) && !comp.runtime.flow.fault.low;
      comp.runtime.flow.fault.high = comp.runtime.flow.value > (comp.runtime.setpoint.value + comp.runtime.flow.fault.setpoint);
      comp.runtime.flow.alarms.high = comp.runtime.flow.value > (comp.runtime.setpoint.value + comp.runtime.flow.alarms.setpoint) && !comp.runtime.flow.fault.high;
      // custom fields
      comp.runtime.custom.forEach(cust => {
        cust.value = Math.round((cust.value + rnd * 5 * sign) * 100) / 100;
        if (cust.value < 0) cust.value = cust.value * -1;
        if (cust.value > cust.maxValue) cust.value = cust.maxValue;
      });
    });
    // update main machine flow
    machineData.production.status.mainFlow.real.value = Math.round(machineData.production.status.mainFlow.real.value * 100) / 100;
    // save in database
    return updateDB();
  };
  const recordProcessLog = async () => {
    try{
      const findBefore = 3600 * 24 * 30 * 1000;
      let toDelete = await app.models.logProcess.find({where: {timestamp: {lt: Date.now() - findBefore}}});
      if (toDelete.length > 0) console.log(`${toDelete.length} logProcess to delete`);
      let result = (toDelete.length > 0) ? await Promise.all(toDelete.map(d => app.models.logProcess.destroyById(d.id))) : null;
      toDelete = await app.models.Eventhistory.find({where: {evTime: {lt: Date.now() - findBefore}}});
      if (toDelete.length > 0) console.log(`${toDelete.length} Eventhistory to delete`);
      result = (toDelete.length > 0) ? await Promise.all(toDelete.map(d => app.models.Eventhistory.destroyById(d.id))) : null;
      toDelete = await app.models.Alarmhistory.find({where: {alStartTime: {lt: Date.now() - findBefore}}});
      if (toDelete.length > 0) console.log(`${toDelete.length} Alarmhistory to delete`);
      result = (toDelete.length > 0) ? await Promise.all(toDelete.map(d => app.models.Alarmhistory.destroyById(d.id))) : null;
    }catch(e){
      console.log(e);
    }
    app.models.logProcess.create({
      timestamp: Date.now(),
      flour: machineData.production.components[0].runtime.flow.value,
      eggs: machineData.production.components[1].runtime.flow.value,
      sugar: machineData.production.components[2].runtime.flow.value,
      butter: machineData.production.components[3].runtime.flow.value
    });
    setTimeout(() => {
      recordProcessLog();
    }, 5000);
  }
  const stateMachine = Stately.define({
    "stopped": st => {
      if (machineData.production.status.mainFlow.real.value > 0) resetFlows();
    },
    "beforeStart": st => {
      speedRate = 0;
      machineData.production.status.mainFlow.setpoint.value = 1000;
      updateDB();
      app.models.Eventhistory.create({
        evType: 5,
        evTime: Date.now(),
        evTimeMs: 0,
        evInfo: '',
        evUser: 'operateur',
        evUserFull: 'Opérateur',
        evMessage: `Démarrage recette ${machineData.production.name} - numéro de lot : ${machineData.production.lotnr}.`,
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
          evMessage: `Recette ${machineData.production.name} démarrée - consigne : ${machineData.production.status.mainFlow.setpoint.value} ${machineData.production.status.mainFlow.setpoint.unit} - numéro de lot : ${machineData.production.lotnr}.`,
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
      refreshFlows()
      .then(data => {
        generateFlowAlarmMessage();
        oldMachineData.production = JSON.parse(JSON.stringify(data.production));
      }).catch(err => console.log(err));
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
        evMessage: `Arrêt recette ${machineData.production.name} - numéro de lot : ${machineData.production.lotnr}.`,
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
        resetFlows();
        app.models.Eventhistory.create({
          evType: 5,
          evTime: Date.now(),
          evTimeMs: 0,
          evInfo: '',
          evUser: 'operateur',
          evUserFull: 'Opérateur',
          evMessage: `Recette ${machineData.production.name} arrêtée.`,
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
    machineData.production.status.mainFlow.setpoint.value = machineData.production.status.mainFlow.setpoint.value + 500 * rnd * sign;
    if (machineData.production.status.mainFlow.setpoint.value > 2000) machineData.production.status.mainFlow.setpoint.value = 1000;
    if (machineData.production.status.mainFlow.setpoint.value < 0) machineData.production.status.mainFlow.setpoint.value = 1000;
    app.models.Eventhistory.create({
      evType: 5,
      evTime: Date.now(),
      evTimeMs: 0,
      evInfo: '',
      evUser: 'operateur',
      evUserFull: 'Opérateur',
      evMessage: `Nouvelle consigne : ${Math.round(machineData.production.status.mainFlow.setpoint.value)} ${machineData.production.status.mainFlow.setpoint.unit}`,
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
      machineData.production.status.fabrication = machineStatus.state;
      stateMachine.handle(machineStatus);
    }, 1000);
    setTimeout(() => {
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
    app.models.runtimeData.create(machineData, (err, result) => {
      runSimulator();
      return cb(err);
    });
  } else {
    ds.once('connected', function() {
      app.model(runtimeData);
      app.models.runtimeData.create(machineData, (err, result) => {
        runSimulator();
        return cb(err);
      });
    });
  }

};
