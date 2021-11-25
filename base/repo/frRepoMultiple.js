const utilities = require('../../helpers/utilities');
const frError = require('../../error/frError');
const ErrorCodes = require('../../error/errorCodes');
const { ObjectId } = require('mongodb');

const FrRepoMultiple = {
 
  //* Executes scan method.
  aggrationManyToOne: async (
    match = {},
    localField = null,
    limit = 50,
    offset = 0,
    sort = {'_meta.created_at':-1},
    db = null,
    collection = null,
    fromCollection = null,
    fromObject = null,
    token = ''
  ) => {
    const query = [
        {

            $lookup: {
                from: fromCollection,
                localField: localField,
                foreignField: '_id',
                as: fromObject
            }
        },
        {
            $match:match
        },
        {
            $unwind: `$${fromObject}`
        },
        {
            $limit: Number(limit)
        },
        {
            $skip: Number(offset)
        },
        {
            $sort: sort
        }

    ];

    db.collection(collection).aggregate(query, (err, results) => {
        return err ? reject(err) : resolve(results)
    });

    const agg = db.collection(collection).aggregate(query);
  
    const data = await agg.exec()
     
    if (!data) {
        throw new frError({
          message: `Resource not found in db by given clause`,
          code: ErrorCodes.ResourceNotFound,
          status: 404,
        });
      }
      
    return {
      items: data,
      count: data.lenght,
    };
  },
};

module.exports = FrRepoMultiple;
