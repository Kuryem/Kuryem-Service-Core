const Enum = require('enum');

module.exports = new Enum({
  ForBalance: {
    Id: 1,
  },
  ForOrder: {
    Id: 2,
  },
  RefundOrder: {
    Id: 3,
  },
  IncreaseOrder: {
    Id: 4,
  },
  DecreasingOrder: {
    Id: 5,
  },
});
