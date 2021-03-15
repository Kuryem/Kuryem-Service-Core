const moment = require('moment');
const { ObjectId } = require('mongodb');

const FrRepo = require('../repo/frRepo');
const Validator = require('../../helpers/validationHelper');
const Utilities = require('../../helpers/utilities');
const frError = require('../../error/frError');
const ErrorCodes = require('../../error/errorCodes');
const Enums = require('../../enums/index');

const FrService = {
  read: async ({
    db,
    id = null,
    tableName = null,
    user = null,
    settings = {},
  } = {}) => {
    let where = { _id: id };

    const resource = await FrRepo.findOneBy(
      db,
      where,
      undefined,
      tableName,
      true
    );

    if (settings.OnlyShowDataToCurrentCourier) {
      //* Bu datayi sadece sahip olduğu user görür.
      if (
        resource.courier_id !== user._id ||
        resource.courier_id !== user.parent.parentId
      ) {
        throw new frError({
          message: 'Unauthorized entity.',
          code: ErrorCodes.Unauthorized,
          status: 403,
        });
      }
    }

    return resource;
  },
  create: async ({
    db,
    body = {},
    schema = {},
    beforeCreate = [],
    afterCreate = [],
    tableName = null,
    user = null,
    settings = {},
    token = '',
    _agent = '',
  } = {}) => {
    if (schema !== {}) {
      let { valid, ajv } = Validator.validateBodyBySchema(body, schema);
      if (!valid) {
        throw new frError({
          message: 'Provided body is invalid',
          code: ErrorCodes.BadRequest,
          status: 400,
          context: {
            providedBody: body,
            message: ajv.errorsText(ajv.errors, {
              dataVar: 'body',
            }),
            errors: ajv.errors,
          },
        });
      }
    }

    if (settings.ReadOnlyColumns) {
      let whereClause = [];
      for (let i = 0; i < settings.ReadOnlyColumns.length; i++) {
        let columnKey = settings.ReadOnlyColumns[i];
        if (body[columnKey]) {
          let keyObject = {};
          keyObject[columnKey] = body[columnKey];
          whereClause.push(keyObject);
        }
      }

      if (whereClause.length > 0) {
        const where = {
          $or: [...whereClause],
        };

        let result = await FrService.filter({
          db: db,
          where: where,
          tableName: tableName,
          user: user,
          token: token,
          settings: settings,
        });

        if (result.items.length > 0) {
          throw new frError({
            message: 'Read only columns cant be duplicated.',
            code: ErrorCodes.ReadOnlyColumns,
            status: 409,
            context: {
              provided: settings.ReadOnlyColumns,
            },
          });
        }
      }
    }

    let resource = body;
    const useOwner = settings.UseOwner;

    if (settings.IsUser && user.userType == Enums.UserTypes.User.value.Id) {
      if (!body.user_id) {
        resource.user_id = ObjectId(user._id.toString());
        if (!body.user_parent_id && !!user.parent.parentId) {
          resource.user_parent_id = ObjectId(user.parent.parentId.toString());
        }
      } else if (body.user_id) {
        resource.user_id = ObjectId(body.user_id.toString());
        if (body.user_parent_id) {
          resource.user_parent_id = ObjectId(body.user_parent_id.toString());
        }
      }

      if (useOwner) {
        resource.user_owner_id = resource.user_parent_id
          ? resource.user_parent_id
          : resource.user_id;
      }
    }

    if (
      settings.IsCourier &&
      user.userType == Enums.UserTypes.Courier.value.Id
    ) {
      if (!body.courier_id) {
        resource.courier_id = ObjectId(user._id.toString());
        if (!body.courier_parent_id && !!user.parent.parentId) {
          resource.courier_parent_id = ObjectId(
            user.parent.parentId.toString()
          );
        }
      } else if (body.courier_id) {
        resource.courier_id = ObjectId(body.courier_id.toString());
        if (body.courier_parent_id) {
          resource.courier_parent_id = ObjectId(
            body.courier_parent_id.toString()
          );
        }
      }

      if (useOwner) {
        resource.courier_owner_id = resource.courier_parent_id
          ? resource.courier_parent_id
          : resource.courier_id;
      }
    }

    const time = new Date().getTime();
    const metaObject = {
      created_at: time,
      created_at_string: new Date(time),
      created_by_id: user._id,
      created_by: !!user.name ? user.name + ' ' + user.lastName : 'ApiAdmin',
      is_deleted: false,
    };

    resource['_meta'] = metaObject;

    if (_agent) {
      //* Agent geliyor ise semaya ekle.
      resource['_agent'] = JSON.parse(_agent);
    }

    const pipelineParams = {
      db: db,
      Repo: FrRepo,
      resource: body,
      user: user,
      tableName: tableName,
      body: body,
      _resource: body,
      token: token,
    };

    if (beforeCreate !== []) {
      resource = await Utilities.runFunctionPool(beforeCreate, pipelineParams);
    }

    resource = await FrRepo.create(db, tableName, resource);

    if (afterCreate !== []) {
      resource = await Utilities.runFunctionPool(afterCreate, pipelineParams);
    }

    return resource;
  },
  update: async ({
    db,
    _id = null,
    body = {},
    schema = {},
    beforeUpdate = [],
    afterUpdate = [],
    tableName = null,
    user = null,
    settings = {},
    token = '',
  } = {}) => {
    if (schema !== {}) {
      let { valid, ajv } = Validator.validateBodyBySchema(body, schema);
      if (!valid) {
        throw new frError({
          message: 'Provided body is invalid',
          code: ErrorCodes.BodyNotValid,
          status: 400,
          context: {
            providedBody: body,
            essage: ajv.errorsText(ajv.errors, {
              dataVar: 'body',
            }),
            errors: ajv.errors,
          },
        });
      }
    }

    let where = { _id: _id };
    let resource = await FrRepo.findOneBy(
      db,
      where,
      undefined,
      tableName,
      true
    );

    let _resource = resource;

    let updatedResource = {
      ...resource,
      ...body,
    };

    if (JSON.stringify(updatedResource) === JSON.stringify(_resource)) {
      throw new frError({
        message: 'Identical document error',
        code: ErrorCodes.IdenticalDocument,
        status: 409,
        context: {
          provided: body,
          updated: updatedResource,
        },
      });
    }

    if (settings.ReadOnlyColumns) {
      const bodyKeys = [...Object.keys(body), '_id', '_meta'];
      let whereClause = [];
      for (let i = 0; i < settings.ReadOnlyColumns.length; i++) {
        let columnKey = settings.ReadOnlyColumns[i];
        if (
          bodyKeys.indexOf(columnKey) > -1 &&
          resource[columnKey] != updatedResource[columnKey]
        ) {
          let keyObject = {};
          keyObject[columnKey] = body[columnKey];
          whereClause.push(keyObject);
        }
      }

      if (whereClause.length > 0) {
        const where = {
          $or: [...whereClause],
        };

        let result = await FrRepo.query(
          where,
          {},
          null,
          null,
          null,
          db,
          tableName,
          token
        );

        if (result.items.length > 0) {
          throw new frError({
            message: 'Read only columns cant be duplicated.',
            code: ErrorCodes.ReadOnlyColumns,
            status: 409,
            context: {
              provided: settings.ReadOnlyColumns,
            },
          });
        }
      }
    }

    if (
      settings.IsCourier &&
      !settings.SkipCourierUpdate &&
      user.userType == Enums.UserTypes.Courier.value.Id
    ) {
      if (!body.courier_id) {
        updatedResource.courier_id = ObjectId(user._id.toString());
        if (!body.courier_parent_id && !!user.parent.parentId) {
          updatedResource.courier_parent_id = ObjectId(
            user.parent.parentId.toString()
          );
        }
      } else if (body.courier_id) {
        updatedResource.courier_id = ObjectId(body.courier_id.toString());
        if (body.courier_parent_id) {
          updatedResource.courier_parent_id = ObjectId(
            body.courier_parent_id.toString()
          );
        }
      }

      if (settings.UseOwner) {
        updatedResource.courier_owner_id = resource.courier_parent_id
          ? resource.courier_parent_id
          : resource.courier_id;
      }
    }

    const time = new Date().getTime();
    const metaObject = {
      modified_at: time,
      modified_at_string: new Date(time),
      modified_by_id: user._id,
      modified_by: !!user.name ? user.name + ' ' + user.lastName : 'ApiAdmin',
    };

    updatedResource['_meta'] = { ...resource['_meta'], ...metaObject };

    const pipelineParams = {
      db: db,
      Repo: FrRepo,
      resource: updatedResource,
      user: user,
      tableName: tableName,
      body: body,
      _resource: _resource,
      token: token,
    };

    if (beforeUpdate !== [] && beforeUpdate.length > 0) {
      resource = await Utilities.runFunctionPool(beforeUpdate, pipelineParams);
    }

    resource = await FrRepo.update(db, tableName, updatedResource);

    if (afterUpdate !== [] && afterUpdate.length > 0) {
      resource = await Utilities.runFunctionPool(afterUpdate, pipelineParams);
    }

    return resource;
  },
  delete: async ({
    db,
    _id = null,
    beforeDelete = [],
    afterDelete = [],
    tableName = null,
    user = null,
    token = '',
  } = {}) => {
    let where = { _id: _id };

    let resource = await FrRepo.findOneBy(
      db,
      where,
      undefined,
      tableName,
      true
    );

    const pipelineParams = {
      db: db,
      Repo: FrRepo,
      resource: resource,
      user: user,
      tableName: tableName,
      _resource: resource,
      token: token,
    };

    const time = new Date().getTime();
    const metaObject = {
      deleted_at: time,
      deleted_at_string: new Date(time),
      is_deleted: true,
      deleted_by: !!user.name ? user.name + ' ' + user.lastName : 'ApiAdmin',
      deleted_by_id: user._id,
    };

    resource['_meta'] = { ...resource['_meta'], ...metaObject };

    if (beforeDelete !== []) {
      resource = await Utilities.runFunctionPool(beforeDelete, pipelineParams);
    }

    await FrRepo.delete(db, tableName, resource, user._id);

    if (afterDelete !== []) {
      resource = await Utilities.runFunctionPool(afterDelete, pipelineParams);
    }

    return resource;
  },
  filter: async ({
    db,
    where = {},
    select = {},
    limit = 0,
    page = 0,
    sort = null,
    tableName = null,
    user = null,
    settings = {},
    token = '',
  } = {}) => {
    let _where = {
      ...where,
      status: true,
    };

    let _select = {};

    // if (!Validator.valideEmptyObject(select)) {
    //   _select = {
    //     _meta: 0,
    //     ...select,
    //   };
    // }

    if (settings.SkipStatus) {
      _where = {
        ...where,
      };
    }

    let result = await FrRepo.query(
      _where,
      select,
      limit,
      page,
      sort,
      db,
      tableName,
      token
    );
    return result;
  },

  partial: async ({
    db,
    where = {},
    select = {},
    limit = 0,
    page = 0,
    sort = null,
    tableName = null,
    user = null,
    settings = {},
    token = '',
  } = {}) => {
    let _where = {
      ...where,
      status: true,
    };

    // const _select = {
    //   _meta: 0,
    //   ...select,
    // };

    if (settings.UseOwner) {
      if (user.userType == Enums.UserTypes.User.value.Id) {
        _where['user_owner_id'] = user._id;
      } else if (user.userType == Enums.UserTypes.Courier.value.Id) {
        _where['courier_owner_id'] = user._id;
      }
    } else {
      if (user.userType == Enums.UserTypes.User.value.Id) {
        _where['$or'] = [{ user_parent_id: user._id }, { user_id: user._id }];
      } else if (user.userType == Enums.UserTypes.Courier.value.Id) {
        _where['$or'] = [
          { courier_parent_id: user._id },
          { courier_id: user._id },
        ];
      }
    }

    let result = await FrRepo.query(
      _where,
      select,
      limit,
      page,
      sort,
      db,
      tableName,
      token
    );
    return result;
  },
};

module.exports = FrService;
