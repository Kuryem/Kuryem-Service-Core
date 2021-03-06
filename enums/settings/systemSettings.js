const Enum = require('../../base/enum/index');

const SystemSettings = new Enum({
  TCKNCheck: '1',
  KDVRate: '2',
  AppVersion: '5',
  BridgePrice: '6',
  PlannedOrderVisibleTime: '8',

  ToleranceDuration: '9',
  TolerancePrice: '10',
  PenaltyForCourierAssign: '11',
  PenaltyForCourierPicked: '12',
  PenaltyForLateSuccess: '13',

  PenaltyForUserAssign: '14',
  PenaltyForUserPicked: '15',
});

module.exports = SystemSettings;
