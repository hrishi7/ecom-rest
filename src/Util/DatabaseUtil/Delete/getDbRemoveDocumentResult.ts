import dbConnection from '../getDbConnection';
import dbRemove from './getDbremoveDocument';
import { MongoError } from 'mongodb';
export default async (collection: string, query: Object) => {
    return new Promise((resolve, reject) => {
        dbConnection()
            .then(database => {
                dbRemove(database, collection, query)
                    .then(result => {
                        resolve(result);
                    })
                    .catch((error: MongoError) => {
                        reject(error);
                    });
            })
            .catch((error: MongoError) => {
                reject(error);
            });
    });
};
