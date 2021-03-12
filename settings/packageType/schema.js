const settingSchema = {
  settingSchema: {
    type: 'object',
    additionalProperties: false,
    required: ['value', 'multiplier'],
    properties: {
      value: {
        type: 'string',
      },
      minValue: {
        type: 'number',
      },
      maxValue: {
        type: 'number',
      },
      multiplier: {
        type: 'number',
      },
    },
  },
};

module.exports = settingSchema;
