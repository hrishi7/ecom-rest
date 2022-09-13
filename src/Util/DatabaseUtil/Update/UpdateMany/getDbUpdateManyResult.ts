import updateMany from './getDbUpdateMany';
import dbConnection from '../../getDbConnection';
import { MongoError } from 'mongodb';

export default (
    collection: string,
    query: Object,
    updateObject: Array<Object>
) => {
    return new Promise((resolve, reject) => {
        dbConnection()
            .then(database => {
                updateMany(database, collection, query, updateObject)
                    .then(queryResult => {
                        resolve(queryResult);
                    })
                    .catch((err: MongoError) => reject(err));
            })
            .catch((err: MongoError) => {
                reject(err);
            });
    });
};
