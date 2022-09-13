import { Db } from 'mongodb';

//An abstracted database Update function with optional parameters of projection, limit, sort
export default (
    database: Db,
    collection: string,
    query: Object,
    updateValue: Object
) => {
    return new Promise((resolve, reject) => {
        //Promise object of update operation
        let updateObject = { $set: updateValue };
        database
            .collection(collection)
            .findOneAndUpdate(query, updateObject, { returnOriginal: false })
            .then(result => {
                let updatedRes = result.value;
                updatedRes.ok = 1;
                updatedRes.nModified = 1;
                resolve(updatedRes);
            })
            .catch(err => {
                reject(err);
            });
    });
};
