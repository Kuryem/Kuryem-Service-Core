const settings = {
  createSchema: {
    type: 'object',
    additionalProperties: false,
    required: ['groupId', 'key', 'title', 'detail'],
    properties: {
      //* 1 = settingsGroups enum
      groupId: {
        type: 'number',
      },
      key: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      detail: {
        type: 'object',
      },
    },
  },
};

module.exports = settings;
