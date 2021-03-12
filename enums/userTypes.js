const Enum = require('enum');

module.exports = new Enum({
  User: {
    Id: 1,
    TokenExpireDayCount: '30d',
  },
  Courier: {
    Id: 2,
    TokenExpireDayCount: '30d',
  },
  Admin: {
    Id: 3,
    TokenExpireDayCount: '5d',
  },
  Internal: {
    Id: 4,
    TokenExpireDayCount: '1d',
  },
});
