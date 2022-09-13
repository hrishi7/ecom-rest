import dbConnection from '../../getDbConnection';
import dbUpdate from './getDbUpdate';

export default async (
    collection: string,
    query: Object,
    updateObject: Object
) => {
    return new Promise((resolve, reject) => {
        dbConnection()
            .then(database => {
                dbUpdate(database, collection, query, updateObject)
                    .then(result => {
                        resolve(result);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
