const agentSchema = {
  agentSchema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      brand: {
        type: 'string',
      },
      modelName: {
        type: 'string',
      },
      osName: {
        type: 'string',
      },
      osVersion: {
        type: 'string',
      },
    },
  },
};

module.exports = agentSchema;
