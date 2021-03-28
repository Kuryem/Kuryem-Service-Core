const utilities = require('../../helpers/utilities');
const frError = require('../../error/frError');
const ErrorCodes = require('../../error/errorCodes');
const { ObjectId } = require('mongodb');

const FrRepo = {
  //* Creates given document
  create: async (db, collection, document, user) => {
    if (!document._id) {
      document['_id'] = ObjectId();
    }

    try {
      await db.collection(collection).insertOne(document);
    } catch (err) {
      if (process.env.KEEPLOGS == 1) {
        console.error('DB INSERT ERROR :', err);
        console.error('document: ', document);
      }
      throw new Error('DB Insert ERROR : ' + err);
    }

    return document;
  },

  //* Updates given document
  update: async (db, collection, document) => {
    if (typeof document._id !== 'object' && document._id !== null) {
      document._id = ObjectId(document._id);
    }
    const _where = { _id: document._id };

    delete document._id;

    let updateResult = await db.collection(collection).update(_where, document);
    if (updateResult.result.nModified === 0) {
      throw new Error('Resource not found.');
    }

    document._id = where._id;

    return document;
  },

  //* Deletes given document
  delete: async (db, collection, document) => {
    const _where = { _id: document._id };

    let updateResult = await db.collection(collection).update(_where, document);
    if (updateResult.result.nModified === 0) {
      throw new Error('Resource not found.');
    }

    return document;
  },

  //* executes query method.
  findOneBy: async (
    db,
    where = {},
    select = {},
    collection = '',
    raiseExec = true
  ) => {
    let _where = utilities.preProcessWhere(where);

    let founded = await db.collection(collection).findOne(_where, select);
    if (raiseExec && founded == null) {
      throw new frError({
        message: 'Resource not found in db by given clause: ' + { ...where },
        code: ErrorCodes.ResourceNotFound,
        status: 404,
      });
    }

    if (raiseExec && founded._meta.is_deleted == true) {
      throw new frError({
        message: `This data is deleted.` + { ...where },
        code: ErrorCodes.ResourceAlreadyDeleted,
        status: 404,
      });
    }

    return founded;
  },

  //* Executes scan method.
  query: async (
    where = null,
    select = null,
    limit = null,
    page = null,
    sort = null,
    db = null,
    collection = null,
    token = ''
  ) => {
    let _where = utilities.preProcessWhere({
      '_meta.is_deleted': false,
      ...where,
    });

    let cursor = await db
      .collection(collection)
      .find(_where, { projection: { ...select } });

    let totalCount = await cursor.count();

    if (page > 1) {
      const skipCount = (page - 1) * limit;
      cursor.skip(skipCount);
    }

    if (limit > 0) {
      cursor.limit(limit);
    }

    if (sort) {
      cursor.sort(sort);
    }

    let items = await cursor.toArray();

    return {
      items: items,
      count: totalCount,
    };
  },
};

module.exports = FrRepo;
