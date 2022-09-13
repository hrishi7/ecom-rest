import { Db, InsertOneWriteOpResult } from 'mongodb';

//An abstracted database Insert function
export default (
    database: Db,
    collection: string,
    insertObject: Object
): Promise<InsertOneWriteOpResult<any>> => {
    return new Promise((resolve, reject) => {
        //Promise object of Insert operation
        database
            .collection(collection)
            .insertOne(insertObject)
            .then(result => {
                resolve(result);
            })
            .catch((err: Error) => {
                reject(err);
            });
    });
};
