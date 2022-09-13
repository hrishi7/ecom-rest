import { Db } from 'mongodb';
import dbConnection from '../getDbConnection';
import getDbRead from './getDbRead';

export default async (
    collection: string,
    query: Object,
    projection?: Object,
    limit: number = 0,
    sort: Object = {}
): Promise<Array<any>> => {
    return new Promise((resolve, reject) => {
        dbConnection()
            .then((database: Db) => {
                getDbRead(database, collection, query, projection, limit, sort)
                    .then(res => {
                        resolve(res);
                    })
                    .catch((err: Error) => {
                        reject(err);
                    });
            })
            .catch((err: Error) => {
                reject(err);
            });
    });
};
