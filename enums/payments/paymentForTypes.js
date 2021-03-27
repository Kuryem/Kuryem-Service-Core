const Enum = require('enum');

module.exports = new Enum({
  ForBalance: {
    Id: 1,
  },
  ForOrder: {
    Id: 2,
  },
  CancelOrder: {
    Id: 3,
  },
  UpdateOrder: {
    Id: 4,
  },
});
