import mongodb from 'mongodb';
import config from 'config';

const { MongoClient } = mongodb;

interface Result {
    err: Error | null;
    res: mongodb.Db | null;
}

let result: Result = {
    err: null,
    res: null
};

export default async (): Promise<mongodb.Db> => {
    console.log(config.get("dbUri"))
    if (result.err === null && result.res === null) {
        await MongoClient.connect(config.get("dbUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(db => {
                result.res = db.db(config.get("dbName"));
            })
            .catch((err: Error) => {
                console.error('database connection failed');
                result.err = err;
            });
    }
    return new Promise((resolve, reject) => {
        if (result.res) {
            resolve(result.res);
        } else if (result.err) {
            reject(result.err);
        }
    });
};
