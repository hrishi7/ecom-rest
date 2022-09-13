import { Db, MongoError } from 'mongodb';

//An abstracted database read function with optional parameters of projection, limit, sort
export default (
    database: Db,
    collection: string,
    query: Object,
    projection: any = undefined,
    limit: number = 0,
    sort: any = {}
): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        //Promise object of read operation
        database
            .collection(collection)
            .find(query)
            .project(projection)
            .sort(sort)
            .limit(limit)
            .toArray((err: MongoError, response: Object[]) => {
                if (err) reject(err);
                else resolve(response);
            });
    });
};
