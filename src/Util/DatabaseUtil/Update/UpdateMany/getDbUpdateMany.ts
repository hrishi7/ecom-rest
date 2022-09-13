import { Db } from 'mongodb';

export default (
    database: Db,
    collection: string,
    query: Object,
    updateValue: Array<Object>
) => {
    return new Promise((resolve, reject) => {
        let updateObject = { $set: updateValue };
        database
            .collection(collection)
            .updateMany(query, updateObject, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};
