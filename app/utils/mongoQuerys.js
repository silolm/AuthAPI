const mongoClient = require('mongodb').MongoClient,
    dbConfig = require('../../config/database.config');

function queryLogIn(DNI, password, callback) {
    mongoClient.connect(dbConfig.url, (err, db) => {
        db.db(dbConfig.database).collection('users', (err2, collection) => {
            collection.find({DNI: DNI, password: password}).toArray((err2, items) => {
                callback(items);
                db.close();
            });
        });
    });
}

function queryRegister(DNI, role, password) {
    mongoClient.connect(dbConfig.url, (err, db) => {
        db.db(dbConfig.database).collection('users', (err2, collection) => {
            collection.insert({DNI: DNI, role: role, password: password})
            db.close();
        });
    });
}

module.exports = {queryLogIn, queryRegister};