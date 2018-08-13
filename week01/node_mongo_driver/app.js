const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const url = 'mongodb://localhost:27017/',
    dbName = 'video';

MongoClient.connect(url, function(error, client) {
    assert.equal(null, error);
    console.log("Successfully connected to server");

    let db = client.db(dbName);

    db.collection('movies').find({}).toArray( function(error, docs) {
        docs.forEach( (doc) => {
            console.log(doc);
        });
        client.close();
    });

    console.log("Called find()");
});