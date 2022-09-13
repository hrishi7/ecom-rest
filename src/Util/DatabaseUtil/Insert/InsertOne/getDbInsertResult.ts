import dbConnection from '../../getDbConnection';
import dbInsert from './getDbInsert';

export default (collection: string, insertObject: Object) => {
    return new Promise((resolve, reject) => {
        dbConnection()
            .then(database => {
                dbInsert(database, collection, insertObject)
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
