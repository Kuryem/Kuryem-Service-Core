const ErrorCodes = require('./errorCodes');

function FrError({
  message = '',
  code = ErrorCodes.BadRequest,
  status = 500,
  context = {},
} = {}) {
  this.name = 'FrError';
  this.message = message;
  this.code = code;
  this.status = status;
  this.context = context;
  const error = new Error(this.errMsg);
  error.name = this.name;
}
FrError.prototype = Object.create(Error.prototype);
module.exports = FrError;
