const settingsSchema = require('../settings/schema/schema');

const settingsHelper = {
  getGroupSchema: (groupId) => {
    switch (groupId) {
      case 1:
        return require('../settings/system/schema').settingSchema;
      case 2:
        return require('../settings/packageType/schema').settingSchema;
      case 3:
        return require('../settings/vehicleType/schema').settingSchema;
      case 4:
        return require('../settings/zonePrices/schema').settingSchema;
      case 5:
        return require('../settings/durationPrices/schema').settingSchema;
      case 6:
        return require('../settings/sidePrices/schema').settingSchema;
      case 7:
        return require('../settings/zoneDurations/schema').settingSchema;
      case 8:
        return require('../settings/kmPrices/schema').settingSchema;
      default:
        return null;
    }
  },

  getSettingsSchema: (groupId) => {
    const groupSchema = settingsHelper.getGroupSchema(groupId);
    settingsSchema.createSchema.properties.detail = { ...groupSchema };
    return settingsSchema.createSchema;
  },
};

module.exports = settingsHelper;
