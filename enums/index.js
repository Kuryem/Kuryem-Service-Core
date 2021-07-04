const Groups = require('./settingGroups');

const PricingTypes = require('./pricingTypes');
const AddressTypes = require('./addressTypes');
const UserTypes = require('./userTypes');
const NotificationTypes = require('./notifications/notificationTypes');
const NotificationForTypes = require('./notifications/notificationForTypes');

const System = require('./settings/systemSettings');
const PackageTypes = require('./settings/packageTypes');
const VehicleTypes = require('./settings/vehicleTypes');
const DurationPrices = require('./settings/durationPrices');
const DistancePrices = require('./settings/distancePrices');
const SidePrices = require('./settings/sidePrices');
const Zones = require('./settings/zones');
const ZoneDurations = require('./settings/zoneDurations');
const KmPrices = require('./settings/kmPrices');

const OrderTypes = require('./order/orderTypes');
const OrderInputTypes = require('./order/orderInputTypes');
const OrderStatusTypes = require('./order/orderStatusTypes');
const LogStatusTypes = require('./order/logStatusTypes');
const PreOrderStatusTypes = require('./order/preOrderStatusTypes');

const PromotionTypes = require('./payments/promotionTypes');
const PaymentTypes = require('./payments/paymentTypes');
const PaymentStatues = require('./payments/paymentStatues');
// const BalanceProcessTypes = require('./payments/balanceProcessTypes');
const PaymentProcessTypes = require('./payments/paymentProcessTypes');
const PaymentForTypes = require('./payments/paymentForTypes');
const TransactionStatues = require('./payments/transactionStatues');

module.exports = {
  Groups,
  System,
  PreOrderStatusTypes,
  NotificationTypes,
  PackageTypes,
  NotificationForTypes,
  TransactionStatues,
  VehicleTypes,
  PricingTypes,
  LogStatusTypes,
  OrderStatusTypes,
  OrderTypes,
  AddressTypes,
  Zones,
  KmPrices,
  ZoneDurations,
  DurationPrices,
  PaymentForTypes,
  DistancePrices,
  SidePrices,
  UserTypes,
  OrderInputTypes,
  PromotionTypes,
  PaymentTypes,
  PaymentStatues,
  // BalanceProcessTypes,
  PaymentProcessTypes,
};
