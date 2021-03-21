const Enum = require('../../base/enum/index');

const SystemSettings = new Enum({
  TCKNCheck: '1',
  KDVRate: '2',
  StepPrice: '4',
  AppVersion: '5',
  BridgePrice: '6',
  PlannedOrderVisibleTime: '8',

  KMPrice: '7',

  ToleranceDuration: '9',
  TolerancePrice: '10',
  PenaltyForCourierAssign: '11',
  PenaltyForCourierPicked: '12',
});

module.exports = SystemSettings;
