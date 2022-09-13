//An abstracted database read function with optional parameters of projection, limit, sort
const dbConnection = require('./getDbConnection');

module.exports = (collection, query, projection, limit=0, sort={}) => {

  return new Promise(async ( resolve, reject ) => {
         const connResult = await dbConnection();
         if (connResult.err) {
             reject("Error connecting to db")
         } else {
            const database = connResult.res;
            getDocuments(database,collection,query,projection,limit, sort)
            .then( documents => {
                resolve(documents);
            }).catch( err => reject(err))

         }
    });
}

const getDocuments = async(database,collection, query, projection = null, limit=0, sort={}) => {

    return  new Promise((resolve, reject) => {   //Promise object of read operation
            database.collection(collection)
            .find(query, projection)
            .sort(sort)
            .limit(limit)
            .toArray((err, result) => {
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }
    )
}
