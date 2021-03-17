const ShortId = require('id-shorter');
const { ObjectId } = require('mongodb');

const frError = require('../error/frError');
const ErrorCodes = require('../error/errorCodes');

const utilities = {
  capitalizeString: (string) => {
    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return string.split(' ').map(capitalize).join(' ');
  },

  makeObjectId: (_id) => {
    if (_id instanceof ObjectId) {
      return _id;
    } else if (ObjectId.isValid(_id)) {
      return ObjectId(_id);
    } else {
      return _id;
    }
  },

  // * Hides system params in db document
  hideSystemProps: (document) => {
    delete document['_is_active'];
    delete document['is_active'];

    return document;
  },

  getRandomInt: (min, max) => {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);
    return Math.floor(Math.random() * (_max - _min) + _min); //The maximum is exclusive and the minimum is inclusive
  },

  normalizeArrayIds: (where) => {
    return where.map((item) => {
      return utilities.normalizeIds(item);
    });
  },

  generateUniqueNumber: () => {
    var mongoDBShortId = ShortId();
    var shortId = mongoDBShortId.encode(ObjectId());

    return shortId;
  },

  normalizeIds: (where) => {
    if (!where) {
      return where;
    }

    if (Array.isArray(where)) {
      //* or kullanimlari icin
      return utilities.normalizeArrayIds(where);
    }

    if (where['_id']) {
      if (where['_id'] instanceof Object && '$in' in where['_id']) {
        let _ids = [];

        where['_id']['$in'].forEach((id) => {
          _ids.push(utilities.makeObjectId(id));
        });

        where['_id']['$in'] = _ids;
      } else if (typeof where['_id'] === 'string') {
        where['_id'] = utilities.makeObjectId(where['_id']);
      }
    }

    if (where['user_id']) {
      where['user_id'] = utilities.makeObjectId(where['user_id']);
    }

    if (where['user_parent_id']) {
      where['user_parent_id'] = utilities.makeObjectId(where['user_parent_id']);
    }

    if (where['user_owner_id']) {
      where['user_owner_id'] = utilities.makeObjectId(where['user_owner_id']);
    }

    if (where['courier_id']) {
      where['courier_id'] = utilities.makeObjectId(where['courier_id']);
    }

    // if (where['parent.parentId']) {
    //   where['parent.parentId'] = utilities.makeObjectId(
    //     where['parent.parentId']
    //   );
    // }

    if (where['courier_parent_id']) {
      where['courier_parent_id'] = utilities.makeObjectId(
        where['courier_parent_id']
      );
    }

    if (where['courier_owner_id']) {
      where['courier_owner_id'] = utilities.makeObjectId(
        where['courier_owner_id']
      );
    }

    if (where['pre_order_id']) {
      where['pre_order_id'] = utilities.makeObjectId(where['pre_order_id']);
    }

    if (where['order_id']) {
      where['order_id'] = utilities.makeObjectId(where['order_id']);
    }

    if (where['_meta.user_id']) {
      where['_meta.user_id'] = utilities.makeObjectId(where['_meta.user_id']);
    }

    if (where['_meta.created_by']) {
      where['_meta.created_by'] = utilities.makeObjectId(
        where['_meta.created_by']
      );
    }

    if (where['_meta.modified_by']) {
      where['_meta.modified_by'] = utilities.makeObjectId(
        where['_meta.modified_by']
      );
    }

    if (where['_meta.deleted_by']) {
      where['_meta.deleted_by'] = utilities.makeObjectId(
        where['_meta.deleted_by']
      );
    }

    return where;
  },
  preProcessWhere: (where) => {
    const objectWithoutOr = Object.keys(where).filter(
      (item) => !item.includes('$or')
    );

    const keysWithoutOr = objectWithoutOr.map((item) => {
      return {
        [item]: where[item],
      };
    });

    if (where['$or']) {
      keysWithoutOr.push({
        $or: utilities.normalizeIds(where['$or']),
      });
    }

    let normalizedWhere = utilities.normalizeIds(keysWithoutOr);

    let whereClause = { $and: [...normalizedWhere] };

    return whereClause;
  },
  runFunctionPool: async (functions, params) => {
    let resource = params.resource;
    if (!resource) {
      throw new frError({
        message: 'Resource must be in parameters',
        code: 'errors.internalError',
        status: 500,
      });
    }

    for (let func of functions) {
      if (func.constructor.name == 'AsyncFunction') {
        params.resource = await func(params);
      } else {
        params.resource = func(params);
      }
    }

    return params.resource;
  },
  runReadFormatter: async ({ functions, resource, user, token }) => {
    for (let func of functions) {
      resource = func({ functions, resource, user, token });
    }
    return resource;
  },

  cleanObject: (obj) => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  },
};

module.exports = utilities;
