const ApiUrls = require('./apiUrls');
const DbConfigs = require('./dbConfigs');
const TableNames = require('./tableNames');
const AwsConfig = require('./awsConfig');
const moment = require('moment');

moment.tz.setDefault('Europa/Istanbul');

module.exports = {
  ApiUrls,
  DbConfigs,
  TableNames,
  AwsConfig,
};
