const settingSchema = {
  settingSchema: {
    type: 'object',
    additionalProperties: false,
    required: ['citySide'],
    properties: {
      citySide: {
        type: 'number',
      },
      multiplier: {
        type: 'number',
      },
    },
  },
};

module.exports = settingSchema;
