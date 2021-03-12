function Enum() {
  this.self = arguments[0];
}
Enum.prototype = {
  keys: function () {
    return Object.keys(this.self);
  },
  values: function () {
    var me = this;
    return this.keys(this.self).map(function (key) {
      return me.self[key];
    });
  },
  getValueByName: function (key) {
    return this.self[
      this.keys(this.self)
        .filter(function (k) {
          return key === k;
        })
        .pop() || ''
    ];
  },
  getNameByValue: function (value) {
    var me = this;
    return (
      this.keys(this.self)
        .filter(function (k) {
          return me.self[k] === value;
        })
        .pop() || null
    );
  },
};

module.exports = Enum;
