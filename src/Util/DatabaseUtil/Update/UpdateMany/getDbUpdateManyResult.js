const dbConnection = require('../../getDbConnection');
const updateMany = require('./getDbUpdateMany');

module.exports = (collection, query, updateObject) => {
    return new Promise((resolve, reject) => {
        dbConnection()
            .then(database => {
                updateMany(database, collection, query, updateObject)
                    .then(queryResult => {
                        resolve(queryResult);
                    })
                    .catch(err => reject(err));
            })
            .catch(err => {
                reject(err);
            });
    });
};
