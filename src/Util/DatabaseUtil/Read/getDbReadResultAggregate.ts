import { Db, MongoError } from 'mongodb';
import dbConnection from '../getDbConnection';
import getDbRead from './getDbRead';

export default async (
    collection: string,
    pipeline: object[]
): Promise<Array<any>> => {
    return new Promise((resolve, reject) => {
        dbConnection()
            .then((database: Db) => {
                database.collection(collection)
                    .aggregate(pipeline)
                    .toArray((err: MongoError, response: Object[]) => {
                        resolve(response)
                    })
            })
            .catch((err: Error) => {
                reject(err);
            });
    });
};
