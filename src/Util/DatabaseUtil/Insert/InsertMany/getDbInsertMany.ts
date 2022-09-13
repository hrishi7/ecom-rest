import { Db, InsertWriteOpResult } from 'mongodb';

const getdbInsertMany = async (
    database: Db,
    collection: string,
    insertArray: Array<Object>
): Promise<InsertWriteOpResult<any>> => {
    return new Promise((resolve, reject) => {
        database.collection(collection).insertMany(insertArray, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};

export default getdbInsertMany;
