const FrApi = require('./base/api/frApi');
const FrRepo = require('./base/repo/frRepo');
const FrService = require('./base/service/frService');

const Enum = require('./enums/index');

const FrError = require('./error/frError');
const FrErrorCodes = require('./error/errorCodes');

const Helpers = require('./helpers/index');

const Configs = require('./config/index');

module.exports = {
  FrApi,
  FrRepo,
  FrService,
  Enum,
  FrError,
  FrErrorCodes,
  Helpers,
  Configs,
};
