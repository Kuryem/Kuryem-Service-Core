const Ajv = require('ajv');
const frError = require('../error/frError');

const ajv = new Ajv();

const validator = {
  validateBodyBySchema: (body, schema) => {
    let valid = ajv.validate(schema, body);
    return {
      valid: valid,
      ajv: ajv,
    };
  },
  validateObjectId: (id) => {
    try {
      return true;
    } catch (err) {
      return false;
    }
  },

  validateEnumValue: (keys, value) => {
    if (keys.indexOf(value) < 0) {
      throw new frError({
        message: `Enum value is not correct : '${value}'`,
        status: 502,
      });
    }
  },

  valideEmptyObject: (obj) => {
    if (!obj) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
};

module.exports = validator;
