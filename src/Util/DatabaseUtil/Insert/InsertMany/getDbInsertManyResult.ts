import dbConnection from '../../getDbConnection';
import getDbInsertMany from './getDbInsertMany';

export default async (collection: string, insertArray: Array<Object>) => {
    return new Promise((resolve, reject) => {
        dbConnection()
            .then(database => {
                getDbInsertMany(database, collection, insertArray)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            })
            .catch(err => {
                reject(err);
            });
    });
};
