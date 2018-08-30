const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Set connection to mongo
const url = 'mongodb://localhost:27017/',
    dbName = 'crunchbase';

MongoClient.connect(url, (error, client) => {
    assert.equal(error, null);
    console.log("Successfully connected to MongoDB.");

    const db = client.db(dbName);
    let query = {"category_code" : "biotech"};

    // first we get the cursors with .find(query)
    // .toArray(...) consumes the cursor
    // if success, docs will be an array of documents 
    db.collection('companies').find(query).toArray( (error, docs) => {
        assert.equal(error, null);
        assert.notEqual(docs.length, 0);

        docs.forEach( (doc) => {
            console.log( doc.name + " is a " + doc.category_code + " company." );
        });

        client.close();
    });
});