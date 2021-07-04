const settingSchema = {
  settingSchema: {
    type: 'object',
    additionalProperties: false,
    required: ['value'],
    properties: {
      value: {
        type: 'string',
      },
    },
  },
};

module.exports = settingSchema;
