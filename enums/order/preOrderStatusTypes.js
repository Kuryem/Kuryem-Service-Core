const Enum = require('enum');

module.exports = new Enum({
  Open: {
    Id: 1,
  },
  Completed: {
    Id: 2,
  },
  Canceled: {
    Id: 3,
  },
  ForUpdate: {
    Id: 4,
  },
});
