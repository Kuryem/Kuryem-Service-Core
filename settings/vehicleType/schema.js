const settingSchema = {
  settingSchema: {
    type: 'object',
    additionalProperties: false,
    required: ['value', 'multiplier'],
    properties: {
      value: {
        type: 'string',
      },
      multiplier: {
        type: 'number',
      },
      minValue: {
        type: 'number',
      },
      status: {
        type: 'string',
      },
    },
  },
};

module.exports = settingSchema;
