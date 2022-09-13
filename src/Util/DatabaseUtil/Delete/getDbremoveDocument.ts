import { Db } from 'mongodb';

//An abstracted database remove function with optional parameters of projection, limit, sort
export default async (database: Db, collection: string, query: Object) => {
    return new Promise((resolve, reject) => {
        //Promise object of remove operation
        database
            .collection(collection)
            .findOneAndDelete(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};
